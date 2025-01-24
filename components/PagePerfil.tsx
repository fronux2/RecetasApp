import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { supabase } from '../supabase/supabaseCliente';
import { Recipe } from '../types/models';
import LoginForm from '../components/auth/LoginForm';
import { Link } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { logout } from '../services/authService';
const PagePerfil = () => {
  const [user, setUser] = useState<any>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Actualizar usuario al iniciar o cerrar sesión
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };

    // Listener de cambios en la sesión
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    fetchUser();

    // Limpia la suscripción cuando el componente se desmonta
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Obtener recetas del usuario cada vez que veamos perfil
  useFocusEffect(
    useCallback(() => {
      const fetchRecipes = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .eq('user_id', user.id);

        if (!error) {
          setRecipes(data || []);
        }
        setLoading(false);
      };

      if (user) {
        fetchRecipes();
      }

      // No es necesaria una limpieza en este caso, pero puedes agregarla si es necesario
      return () => {
        console.log('Pantalla perdió el foco o se desmontó');
      };
    }, [user]) // Dependencia de "user"
  );

  const handleLogout = async () => {
    await logout();
    setRecipes([]);
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Perfil</Text>

      {user ? (
        <>
          <Text className="text-lg text-gray-700 mb-2">
            Correo: <Text className="font-semibold">{user.email}</Text>
          </Text>

          <Text className="text-lg text-gray-700 mb-2 font-bold">
            Mis recetas:
          </Text>

          {loading ? (
            <Text className="text-gray-500">Cargando recetas...</Text>
          ) : recipes.length > 0 ? (
            <FlatList
              data={recipes}
              keyExtractor={(item: Recipe) => item.id.toString()}
              renderItem={({ item }) => (
                <View className="p-4 bg-white mb-2 rounded-lg shadow">
                  <Text className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {item.description}
                  </Text>
                </View>
              )}
            />
          ) : (
            <Text className="text-gray-500">
              No has creado recetas todavía.
            </Text>
          )}
          <View className="mt-6 w-full">
            <Link href="/addRecipe" asChild>
              <Button title="Agregar receta" />
            </Link>
          </View>

          <Button
            title="Cerrar sesión"
            onPress={handleLogout}
            color="#f44336"
          />
        </>
      ) : (
        <LoginForm />
      )}
    </View>
  );
};

export default PagePerfil;
