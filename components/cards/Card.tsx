import { View, Text, Image } from 'react-native';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <View
      testID="card-container"
      className="w-52 h-72 flex border-2 bg-[#fffaf0] rounded-lg shadow-md overflow-hidden m-1"
    >
      <Image
        testID="card-image"
        source={{ uri: imageUrl }}
        className="w-full h-40 object-center object-cover "
      />
      <Text testID="card-title" className="text-xl font-bold pt-2 pl-2">
        {title}
      </Text>
      <Text testID="card-description" className="text-gray-500 pt-2 pl-2">
        {description}
      </Text>
    </View>
  );
};

export default Card;
