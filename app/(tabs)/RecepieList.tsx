import ListCards2 from '../../components/cards/ListCards2';
import { View } from 'react-native';
export default function RecepieList() {
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <ListCards2 title="Recetas" />
    </View>
  );
}
