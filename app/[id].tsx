import { useLocalSearchParams } from 'expo-router';
import { Text, View, Image, ActivityIndicator, Pressable } from 'react-native';
import { supabase } from '../supabase/supabaseCliente';
import { Recipe } from '../types/models';
import { useEffect, useState } from 'react';
import { recipes } from '../data/recipe';
import { FavoriteIcon } from '../utils/iconsUtils';
import { router } from 'expo-router';
export default function Recetas() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const filter = recipes.filter((recipe) => recipe.id === id);
  const recipeFiltered = filter[0];
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        // Obtener receta con su categoría
        const { data: dataRecipe, error: recipeError } = await supabase
          .from('recipes')
          .select(`*, categories(name)`)
          .eq('id', id)
          .single();

        if (recipeError || !dataRecipe) {
          setRecipe(recipeFiltered ?? null); // Asegurar que recipeFiltered está definido
        } else {
          setRecipe(dataRecipe);
        }
        // Obtener usuario autenticado
        const { data: dataUser, error: userError } =
          await supabase.auth.getUser();
        if (userError || !dataUser.user) return;

        setUserId(dataUser.user.id);
        // Verificar si la receta está en favoritos
        const { data: dataFavorites, error: favoriteError } = await supabase
          .from('favorites')
          .select('*')
          .eq('user_id', dataUser.user.id)
          .eq('recipe_id', dataRecipe?.id);

        if (favoriteError) {
          setError(favoriteError.message);
        } else if (dataFavorites?.length > 0) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.error('Error en fetchUser:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, recipeFiltered]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator size="large" color="#00bcd4" />
        <Text className="text-gray-700 mt-4">Cargando receta...</Text>
      </View>
    );
  }

  const handleFavorite = async () => {
    setIsFavorite(!isFavorite);
    if (!userId) {
      router.replace('/Perfil'); // Redirigir al login si no hay usuario
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!userId) return;
      if (!recipe) return;
      if (isFavorite) {
        // Eliminar de favoritos
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', userId)
          .eq('recipe_id', recipe.id);
      } else {
        // Agregar a favoritos
        await supabase
          .from('favorites')
          .insert([{ user_id: userId, recipe_id: recipe.id }]);
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (recipe === null) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100 p-4">
        <Text className="text-red-600 text-lg font-semibold">{error}</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Pressable
        className="flex flex-row-reverse w-full h-16  mr-auto"
        onPress={handleFavorite}
      >
        <View className="flex items-center justify-center">
          <Text className="text-2xl font-bold text-gray-800 mr-auto">
            {isFavorite ? 'Favorito' : 'No Favorito'}
          </Text>
          <FavoriteIcon color={isFavorite ? '#FF3B3F' : '#666'} />
        </View>
      </Pressable>

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
        <Text className="text-2xl ">{recipe.title}</Text>
        <Text className="text-lg text-gray-700">{recipe?.description}</Text>
        <Text className="text-base text-gray-600">
          <Text className="font-bold">Ingredientes:</Text> {recipe?.ingredients}
        </Text>
        <Text className="text-base text-gray-600">
          <Text className="font-bold">Instrucciones:</Text>{' '}
          {recipe?.instructions}
        </Text>
        <Text className="text-base text-gray-600">
          <Text className="font-bold">Categoría:</Text>{' '}
          {recipe?.categories?.name || 'Sin categoría'}
        </Text>
      </View>
    </View>
  );
}
