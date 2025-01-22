import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../services/supabaseService';
import { Recipe } from '../types/models';
import Card from './Card';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';

interface ListCardProps {
  title: string;
}

const ListCards2: React.FC<ListCardProps> = ({ title }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (err) {
        setError('Error al cargar las recetas.');
      } finally {
        setLoading(false);
      }
    };
    getRecipes();
  }, []);

  const renderCard = ({ item }: { item: Recipe }) => (
    <Link key={item.id} href={`/${item.id}`} className="mx-2">
      <Card
        title={item.title}
        description={item.description}
        imageUrl={item.image_url}
      />
    </Link>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#fffaf0]">
        <ActivityIndicator size="large" color="#FFA500" />
        <Text className="mt-4 text-lg text-gray-600">Cargando recetas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-[#fffaf0]">
        <Text className="text-red-500 text-lg">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 pb-16 bg-[#fffaf0]">
      <Text className="text-2xl font-bold mt-4 mb-4 ml-4">{title}</Text>
      <FlatList
        data={recipes}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      />
    </View>
  );
};

export default ListCards2;
