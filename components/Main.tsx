import { View } from 'react-native';
import Hero from './Hero';
import ListCards2 from './ListCards2';
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
        <ListCards2 title="Almuerzo" />
        <ListCards2 title="Postre" />
        <ListCards2 title="Bebidas" />
      </ScrollView>
    </View>
  );
}
