import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Hero from './Hero';
import ListCards from './ListCards';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { Link } from 'expo-router';

export default function Main() {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="bg-[#fffaf0]"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <ScrollView>
        <Hero />
        <ListCards title="Almuerzo" />
        <ListCards title="Postre" />
        <ListCards title="Bebidas" />
      </ScrollView>
    </View>
  );
}
