import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function RecipeForm() {
  // Definimos un estado para cada uno de los inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [cookTime, setCookTime] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    // Validación básica
    if (
      !title ||
      !description ||
      !ingredients ||
      !instructions ||
      !categoryId
    ) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    // Aquí puedes hacer la lógica para enviar los datos, como por ejemplo
    // llamar a una API o guardar en una base de datos.
    console.log({
      title,
      description,
      ingredients,
      instructions,
      categoryId,
      imageUrl,
      cookTime,
    });

    Alert.alert('Éxito', 'Receta creada con éxito');
  };

  return (
    <View className="flex-1 justify-center items-center p-4 bg-gray-100">
      <Text className="text-2xl font-bold text-gray-800 mb-6">
        Crear Receta
      </Text>

      {/* Input para el título */}
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Título"
        className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-700"
      />

      {/* Input para la descripción */}
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Descripción"
        className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-700"
      />

      {/* Input para los ingredientes */}
      <TextInput
        value={ingredients}
        onChangeText={setIngredients}
        placeholder="Ingredientes"
        className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-700"
      />

      {/* Input para las instrucciones */}
      <TextInput
        value={instructions}
        onChangeText={setInstructions}
        placeholder="Instrucciones"
        className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-700"
      />

      {/* Input para el ID de la categoría */}
      <TextInput
        value={categoryId}
        onChangeText={setCategoryId}
        placeholder="ID de Categoría"
        keyboardType="numeric"
        className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-700"
      />

      {/* Input para la URL de la imagen */}
      <TextInput
        value={imageUrl}
        onChangeText={setImageUrl}
        placeholder="URL de la imagen"
        className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-700"
      />

      {/* Input para el tiempo de cocción */}
      <TextInput
        value={cookTime}
        onChangeText={setCookTime}
        placeholder="Tiempo de cocción (minutos)"
        keyboardType="numeric"
        className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-700"
      />

      {/* Botón para enviar el formulario */}
      <Button title="Crear Receta" onPress={handleSubmit} color="#00bcd4" />
    </View>
  );
}
