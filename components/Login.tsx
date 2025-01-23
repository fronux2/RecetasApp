import { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseCliente';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { login } from '../services/authService'; // Importamos la función de login
import { useNavigation } from '@react-navigation/native'; // Para redirigir al usuario después de login
import { logout } from '../services/authService';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigation = useNavigation();
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingrese un correo y una contraseña.');
      return;
    }

    setLoading(true);

    try {
      await login(email, password); // Llamamos a la función login
      navigation.navigate('index'); // Redirigimos a la pantalla principal después de login exitoso
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudo iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return !user ? (
    <View className="flex-1 justify-center items-center p-4 bg-gray-100">
      <Text className="text-2xl font-bold text-gray-800 mb-4">
        Iniciar sesión
      </Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-700"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Contraseña"
        secureTextEntry
        className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-700"
      />

      <Button
        title={loading ? 'Cargando...' : 'Iniciar sesión'}
        onPress={handleLogin}
        color="#00bcd4"
        disabled={loading}
      />

      <View className="mt-4">
        <Text className="text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Text
            className="text-blue-500"
            onPress={() => navigation.navigate('SignUp')} // Navegar a la pantalla de registro
          >
            Regístrate
          </Text>
        </Text>
      </View>
    </View>
  ) : (
    <TouchableOpacity onPress={logout}>
      <Text className="text-gray-600 text-sm">Cerrar sesión</Text>
    </TouchableOpacity>
  );
}
