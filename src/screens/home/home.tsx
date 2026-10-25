import axios from 'axios';
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type RecipeProps = { idMeal: string, strMeal: string, strMealThumb: string  };

const Item = ({ idMeal, strMeal, strMealThumb }: RecipeProps) => (
    <TouchableOpacity style={styles.item} 
        onPress={() =>
          router.navigate({
            pathname: '/details',
            params: { id: idMeal }
          })
        }>
        <Image
            source={{uri: strMealThumb}}
            style={styles.thumb}
        />
        <Text style={styles.title}>{strMeal}</Text>
    </TouchableOpacity>
);

export const Home = () => {
    const [recipes, setRecipes] = useState<RecipeProps[]>([]);

    const getRecipes = async () => {
        setRecipes([]);
        for (let index = 0; index < 5; index++) {
            await axios.get("https://www.themealdb.com/api/json/v1/1/random.php").then((resp) => {
                setRecipes(oldRecipes => [...oldRecipes, resp.data.meals[0]])
            });
        }
    };

    useEffect(() => {
        getRecipes()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.loading}>{recipes.length < 5 ? 'Carregando...' : ''}</Text>
            <FlatList
                data={recipes}
                renderItem={({ item }) => <Item idMeal={item.idMeal} strMeal={item.strMeal} strMealThumb={item.strMealThumb} />}
                keyExtractor={item => item.idMeal}
                style={styles.list}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 50
    },
    list: {
        width: '100%',
    },
    item: {
        backgroundColor: '#eeeeee',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#000",
        // https://ethercreative.github.io/react-native-shadow-generator/
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        marginStart: 25,
    },
    thumb: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    loading: {
        fontSize: 32,
        color: '#4b4b4b',
    }
});