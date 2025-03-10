import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList, Pressable, Alert } from 'react-native';
import { supabase } from '../supabase/supabaseCliente';
import { Recipe } from '../types/models';
import LoginForm from '../components/auth/LoginForm';
import { Link } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { logout } from '../services/authService';
import { deleteRecipe, fetchUserRecipes } from '../services/recipeService';
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
        try {
          const data = await fetchUserRecipes(user.id);
          setRecipes(data || []);
          setLoading(false);
        } catch (error) {
          console.error('Error al cargar las recetas:', error);
        }
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

  const handleDelete = async (id: string) => {
    try {
      Alert.alert('¿Estás seguro?', 'Esta acción no se puede deshacer.', [
        { text: 'No', style: 'cancel' },
        { text: 'Sí', onPress: () => handleDelete2(id) },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete2 = async (id: string) => {
    await deleteRecipe(id);
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== id)
    );
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
              keyExtractor={(item: Recipe) => item.id!.toString()}
              renderItem={({ item }) => (
                <View className="p-4 bg-gray-100 mb-2 rounded-lg shadow flex-row justify-between">
                  <Link
                    href={`/${item.id}`}
                    className="w-max h-max m-1"
                    asChild
                  >
                    <Pressable className="bg-gray-400 px-2 py-1 transition-opacity active:opacity-50 hover:bg-gray-300 text-center items-center justify-center">
                      <View className="flex-col">
                        <Text className="text-lg font-semibold text-gray-800">
                          {item.title}
                        </Text>
                        <Text className="text-sm text-gray-600 max-w-64">
                          {item.description}
                        </Text>
                      </View>
                    </Pressable>
                  </Link>
                  <View className="flex-row">
                    <Link
                      href={{
                        pathname: '/form',
                        params: { id: item.id },
                      }}
                      asChild
                    >
                      <Pressable className="bg-blue-500 px-2 py-1 rounded">
                        <Text className="text-white font-semibold">Editar</Text>
                      </Pressable>
                    </Link>
                    <Pressable
                      onPress={() => handleDelete(item.id!)}
                      className="bg-red-500 px-2 py-1 rounded"
                    >
                      <Text className="text-white font-semibold">Borrar</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            />
          ) : (
            <Text className="text-gray-500">
              No has creado recetas todavía.
            </Text>
          )}

          <View className="mt-6 w-full">
            <Link href="/form" asChild>
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
