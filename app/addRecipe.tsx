import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { pickImage, takePhoto } from '../utils/imageUtils'; // Importación correcta de las funciones
const { supabase } = require('../supabase/supabaseCliente');

export default function RecipeForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserAndCategories = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      const { data, error } = await supabase
        .from('categories')
        .select('id, name');
      if (error) {
        console.error('Error al obtener categorías:', error.message);
      } else {
        setCategories(data);
      }
    };

    fetchUserAndCategories();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async () => {
    if (
      !title ||
      !description ||
      !ingredients ||
      !instructions ||
      !categoryId ||
      !imageUrl
    ) {
      Alert.alert(
        'Error',
        'Por favor, complete todos los campos y suba una imagen.'
      );
      return;
    }

    try {
      const recipe = {
        title,
        description,
        ingredients,
        instructions,
        categoryId,
        imageUrl,
        cookTime: cookTime ? parseInt(cookTime, 10) : null,
      };

      console.log(recipe);
      Alert.alert('Éxito', 'Receta creada con éxito');
      setTitle('');
      setDescription('');
      setIngredients('');
      setInstructions('');
      setCategoryId('');
      setImageUrl('');
      setImage(null);
      setCookTime('');
    } catch (error) {
      console.error('Error al crear la receta:', error);
      Alert.alert('Error', 'No se pudo crear la receta.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4 bg-gray-100">
      <ScrollView>
        <Text className="text-2xl font-bold text-gray-800 mb-6">
          Crear Receta
        </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Título"
          className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-700"
        />
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Descripción"
          className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-700"
        />
        <TextInput
          value={ingredients}
          onChangeText={setIngredients}
          placeholder="Ingredientes"
          className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-700"
        />
        <TextInput
          value={instructions}
          onChangeText={setInstructions}
          placeholder="Instrucciones"
          className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-700"
        />
        <Text className="mb-2 text-gray-700">Selecciona una categoría:</Text>
        {categories.length === 0 ? (
          <Text className="text-gray-500">Cargando categorías...</Text>
        ) : (
          <Picker
            selectedValue={categoryId}
            onValueChange={setCategoryId}
            style={{ width: 200 }}
          >
            {categories.map((category) => (
              <Picker.Item
                key={category.id}
                label={category.name}
                value={category.id}
              />
            ))}
          </Picker>
        )}

        <TextInput
          value={cookTime}
          onChangeText={setCookTime}
          placeholder="Tiempo de cocción (minutos)"
          keyboardType="numeric"
          className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-700"
        />
        <Button title="Seleccionar Imagen de la Galería" />
        <Button title="Tomar Foto con la Cámara" />
        <Button title="Crear Receta" onPress={handleSubmit} color="#00bcd4" />
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, paddingTop: 10 }}
          />
        )}
      </ScrollView>
    </View>
  );
}
