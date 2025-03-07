import { useEffect, useState } from 'react';
import Card from './Card';
import { fetchRecipes } from '../../services/recipeService';
import { Recipe } from '../../types/models';
import { FlatList, TextInput, View } from 'react-native';
import { Link } from 'expo-router';
const ListCard3 = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [buscador, setBuscador] = useState<string>('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (value: string) => {
    setBuscador(value);
    const filterRecipes = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRecipes(filterRecipes);
  };

  return (
    <View className="flex-1 ">
      <TextInput
        value={buscador}
        onChangeText={handleSearch}
        placeholder="Buscar"
        className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-700"
      />
      <FlatList
        data={filteredRecipes}
        renderItem={({ item }) => (
          <Link key={item.id} href={`/${item.id}`}>
            <Card
              title={item.title}
              description={item.description}
              imageUrl={item.image_url}
            />
          </Link>
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

export default ListCard3;
