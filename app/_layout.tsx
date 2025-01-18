import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import '../global.css';

export default function Layout() {
  return (
    <View className="flex-1 bg-[#fffaf0] ">
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          gestureEnabled: true,
          headerTitle: '',
          headerStyle: { backgroundColor: '#fffaf0' },
          headerBackVisible: true,
          headerLeft: () => (
            <Text className="text-2xl font-bold">Mi Recetario</Text>
          ),
        }}
      />
    </View>
  );
}
