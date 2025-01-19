import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabase/supabaseCliente';
export default function TabsLayout() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);
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
          title: 'Home',
          headerTitle: '',
        }}
      />
      <Tabs.Screen
        name="Perfil"
        options={{
          title: 'Perfil',
          headerTitle: '',
        }}
      />
      <Tabs.Screen
        name="RecepieList"
        options={{
          title: 'Recetas',
          headerTitle: '',
        }}
      />
    </Tabs>
  );
}
