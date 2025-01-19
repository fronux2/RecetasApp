import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchRecipes } from '../../services/supabaseService';
import { Recipe } from '../../types/models';
import ListCards from '../../components/ListCards';
export default function RecepieList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
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
    <View className="flex-1 bg-gray-100 p-4">
      <ListCards title="Recetas" />
    </View>
  );
}
