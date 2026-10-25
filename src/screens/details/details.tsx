import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type RecipeProps = { idMeal: string, strMeal: string, strMealThumb: string, strInstructions: string, strCountry: string };

export const Details = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    
    const [recipe, setRecipe] = useState<RecipeProps>();
    const getRecipe = async () => {
        await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((resp) => {
            setRecipe(resp.data.meals[0])
        });
    };

    useEffect(() => {
        getRecipe();
    }, []);
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.card}>
                    {!recipe ? 
                    <Text>Carregando...</Text> 
                    :
                    <>
                    <View style={styles.recipe}>
                        <Image source={{ uri: recipe?.strMealThumb}} style={styles.thumb}></Image>
                        <View style={styles.summary}>
                            <Text style={styles.title}>{recipe?.strMeal}</Text>
                            <Text style={styles.country}>{recipe?.strCountry}</Text>
                        </View>
                    </View>
                    <View style={styles.instructionsBox}>
                        <Text style={styles.instructions}>{recipe?.strInstructions}</Text>
                    </View>
                    </>
                    }
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 50,
    },
    recipe: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#eeeeee',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        borderRadius: 10,
        padding: 25,
    },
    summary: {
        flex: 2,
        flexDirection: 'column',
        padding: 25,
        flexWrap: 'wrap',
    },
    list: {
        width: '100%',
    },
    title: {
        fontSize: 26,
    },
    thumb: {
        width: 250,
        height: 250,
        borderRadius: 10,
    },
    country: {
        fontSize: 24,
        color: '#ff6944',
        fontWeight: 'bold',
    },
    instructionsBox: {
        marginTop: 25,
    },
    instructions: {
        fontSize: 16,
    }
});