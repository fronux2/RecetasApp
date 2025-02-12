import { useEffect, useState } from 'react';
import Card from './Card';
import { fetchRecipes } from '../../services/recipeService';
import { Recipe } from '../../types/models';
import { FlatList, View } from 'react-native';
import { Link } from 'expo-router';
const ListCard3 = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRecipes();
        setRecipes(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <View className="flex-1 ">
      <FlatList
        data={recipes}
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
