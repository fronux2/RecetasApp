import React from 'react';
import Card from './Card';
import { ScrollView, View, Text } from 'react-native';
import { Link } from 'expo-router';

interface ListCardProps {
  title: string;
}
const ListCards: React.FC<ListCardProps> = ({ title }) => {
  return (
    <View className="pb-16 bg-[#fffaf0] ">
      <Text className="text-2xl font-bold mt-8 mb-2 ml-2">{title}</Text>
      <ScrollView horizontal className="ml-2">
        <Link href="/RecepieList">
          <Card
            title="Receta 1"
            description="Description"
            imageUrl="https://picsum.photos/id/10/200/300"
          />
        </Link>
        <Link href={'/papitas'}>
          <Card
            title="Receta 2"
            description="Description"
            imageUrl="https://picsum.photos/id/10/200/300"
          />
        </Link>
        <Card
          title="Receta 3"
          description="Description"
          imageUrl="https://picsum.photos/id/10/200/300"
        />
        <Card
          title="Receta 4"
          description="Description"
          imageUrl="https://picsum.photos/id/10/200/300"
        />
        <Card
          title="Receta 5"
          description="Description"
          imageUrl="https://picsum.photos/id/10/200/300"
        />
      </ScrollView>
    </View>
  );
};

export default ListCards;
