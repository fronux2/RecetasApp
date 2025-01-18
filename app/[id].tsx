import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
export default function Recetas() {
  const { id } = useLocalSearchParams();
  return <Text>Recetas: {id}</Text>;
}

export const screenOptions = {
  title: 'Detalle del Post', // Cambia esto por el texto que desees
};
