import { useLocalSearchParams } from 'expo-router';
import { Text, View, Image, ActivityIndicator } from 'react-native';
import { supabase } from '../supabase/supabaseCliente';
import { Recipe } from '../types/models';
import { useEffect, useState } from 'react';
import { recipes } from '../data/recipe';
export default function Recetas() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const filter = recipes.filter((recipe) => recipe.id === id);
  const recipeFiltered = filter[0];
  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('recipes')
        .select(`*, categories(name)`)
        .eq('id', id)
        .single();
      if (error) {
        setRecipe(recipeFiltered);
      } else {
        setRecipe(data);
      }
      setLoading(false);
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="#00bcd4" />
        <Text className="text-gray-700 mt-4">Cargando receta...</Text>
      </View>
    );
  }
  if (recipe === null) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100 p-4">
        <Text className="text-red-600 text-lg font-semibold">{error}</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="items-center mb-6">
        <Image
          source={{ uri: recipe?.image_url }}
          className="w-48 h-48 rounded-lg"
        />
        <Text className="text-2xl font-bold text-gray-800 mt-4">
          {recipe?.title}
        </Text>
      </View>

      <View className="space-y-4">
        <Text className="text-lg text-gray-700">{recipe?.description}</Text>

        <Text className="text-base text-gray-600">
          <Text className="font-bold">Ingredientes:</Text> {recipe?.ingredients}
        </Text>

        <Text className="text-base text-gray-600">
          <Text className="font-bold">Categoría:</Text>{' '}
          {recipe?.categories?.name || 'Sin categoría'}
        </Text>
      </View>
    </View>
  );
}
