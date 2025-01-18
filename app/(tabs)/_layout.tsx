import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#fffaf0' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home1',
          headerTitle: '',
        }}
      />
    </Tabs>
  );
}
