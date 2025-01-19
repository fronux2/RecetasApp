import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../services/supabaseService';
import { Recipe } from '../types/models';
import Card from './Card';
import { ScrollView, View, Text } from 'react-native';
import { Link } from 'expo-router';
interface ListCardProps {
  title: string;
}
const ListCards: React.FC<ListCardProps> = ({ title }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]); // Estado para las recetas filtradas
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      try {
        const data = await fetchRecipes();
        setRecipes(data);
        setFilteredRecipes(data); // Inicialmente, todas las recetas se muestran
      } catch (err) {
        setError('Error al cargar las recetas.');
      } finally {
        setLoading(false);
      }
    };
    getRecipes();
  }, []);
  return (
    <View className="pb-16 bg-[#fffaf0] ">
      <Text className="text-2xl font-bold mt-8 mb-2 ml-2">{title}</Text>
      <ScrollView horizontal className="ml-2">
        {recipes.map((recipe: Recipe) => (
          <Link
            key={recipe.id}
            href={`/${recipe.id}`}
            className="flex-1 p-2 m-2"
          >
            <Card
              title={recipe.title}
              description={recipe.description}
              imageUrl={recipe.image_url}
            />
          </Link>
        ))}
      </ScrollView>
    </View>
  );
};

export default ListCards;
