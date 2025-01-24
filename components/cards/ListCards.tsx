import { Recipe } from '../../types/models';
import Card from '../cards/Card';
import { ScrollView, View, Text } from 'react-native';
import { Link } from 'expo-router';
import { recipes } from '../../data/recipe';
interface ListCardProps {
  title: string;
  id: string;
}
const ListCards: React.FC<ListCardProps> = ({ title, id }) => {
  const filter = recipes.filter((recipe) => recipe.category_id === id);
  return (
    <View className="pb-16 bg-[#fffaf0] ">
      <Text className="text-2xl font-bold mt-8 mb-2 ml-2">{title}</Text>
      <ScrollView horizontal className="ml-2">
        {filter.map((recipe: Recipe) => (
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
