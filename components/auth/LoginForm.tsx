import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Button } from 'react-native';
import { login } from '../../services/authService';
export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    try {
      const logged = await login(email, password);
      if (logged) {
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'No se pudo iniciar sesión.');
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4 bg-gray-100">
      <Text className="text-gray-600 mb-4">No estás autenticado.</Text>
      <TextInput
        className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-700"
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-700"
        placeholder="Contraseña"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} color="#00bcd4" />
    </View>
  );
}
