import { View } from 'react-native';
import Hero from './Hero';
import ListCards from './ListCards';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

export default function Main() {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="bg-[#fffaf0]"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <ScrollView>
        <Hero />
        <ListCards title="Almuerzo" id="1" />
        <ListCards title="Postre" id="2" />
        <ListCards title="Bebidas" id="3" />
      </ScrollView>
    </View>
  );
}
