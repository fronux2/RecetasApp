import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  ScrollView,
  Pressable,
} from 'react-native';
import { type Recipe } from '../types/models';
import { Picker } from '@react-native-picker/picker';
import { pickImage, takePhoto } from '../utils/imageUtils';
import { uploadRecipeImage } from '../services/uploadImage'; // Importación correcta de las funciones
import { addRecipe } from '../services/recipeService';
import Spinner from 'react-native-loading-spinner-overlay';
const { supabase } = require('../supabase/supabaseCliente');

export default function RecipeForm() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUpload, setImageUpload] = useState<{
    base64: string;
    imageName: string;
    uri: string;
  }>({ base64: '', imageName: '', uri: '' });
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
    setLoading(true);
    if (
      !title ||
      !description ||
      !ingredients ||
      !instructions ||
      !categoryId
    ) {
      Alert.alert(
        'Error',
        'Por favor, complete todos los campos y suba una imagen.'
      );
      return;
    }

    const uploadResponse = await uploadRecipeImage(
      imageUpload.base64,
      imageUpload.imageName
    );

    if (!uploadResponse) {
      return;
    }

    try {
      const recipe: Recipe = {
        user_id: user.id,
        title,
        description,
        ingredients,
        instructions,
        image_url: uploadResponse,
        category_id: categoryId,
      };
      await addRecipe(recipe);

      Alert.alert('Éxito', 'Receta creada con éxito');
      setTitle('');
      setDescription('');
      setIngredients('');
      setInstructions('');
      setCategoryId('');
      setLoading(false);
    } catch (error) {
      console.error('Error al crear la receta:', error);
      Alert.alert('Error', 'No se pudo crear la receta.');
    }
  };

  const handlePhotoUpload = async () => {
    const result = await takePhoto();
    if (!result) return;
    const { base64, imageName, uri } = result;
    setImageUpload({ base64, imageName, uri });
  };
  const handleImageUpload = async () => {
    const result = await pickImage();
    if (!result) return;
    const { base64, imageName, uri } = result;
    setImageUpload({ base64, imageName, uri });
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
        <View className="flex-row justify-center items-center">
          <Pressable
            className="bg-green-500 w-44 h-16 text-white rounded-full px-4 py-2 m-2 hover:bg-green-400"
            onPress={handleImageUpload}
          >
            <Text>Seleccionar Imagen</Text>
          </Pressable>

          <Pressable
            className="bg-blue-500 w-44 h-16 text-white rounded-full px-4 py-2 m-2 hover:bg-blue-400"
            onPress={handlePhotoUpload}
          >
            <Text>Tomar Foto con la Cámara</Text>
          </Pressable>
        </View>
        <Pressable
          className="bg-gray-500-500 text-white rounded-full px-4 py-2 m-2"
          onPress={handleSubmit}
        ></Pressable>

        {imageUpload && (
          <Image
            source={{ uri: imageUpload.uri }}
            style={{ width: 100, height: 100, paddingTop: 10 }}
          />
        )}
        <Spinner
          visible={loading}
          textContent="Cargando..."
          textStyle={{ color: '#FFF' }}
          overlayColor="rgba(0, 0, 0, 0.75)" // Color del overlay
        />
      </ScrollView>
    </View>
  );
}
