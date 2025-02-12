// RecipeFormUI.tsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Spinner from 'react-native-loading-spinner-overlay';

interface RecipeFormUIProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  ingredients: string;
  setIngredients: (ingredients: string) => void;
  instructions: string;
  setInstructions: (instructions: string) => void;
  categories: { id: string; name: string }[];
  categoryId: string;
  setCategoryId: (categoryId: string) => void;
  handleImageUpload: () => void;
  handlePhotoUpload: () => void;
  handleSubmit: () => void;
  imageUpload: { uri: string };
  loading: boolean;
}

const RecipeFormUI: React.FC<RecipeFormUIProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  ingredients,
  setIngredients,
  instructions,
  setInstructions,
  categories,
  categoryId,
  setCategoryId,
  handleImageUpload,
  handlePhotoUpload,
  handleSubmit,
  imageUpload,
  loading,
}) => {
  return (
    <View className="flex-1 justify-center items-center p-4 bg-gray-100">
      <ScrollView>
        <Text className="text-2xl font-bold text-gray-800 mb-6">
          Crear Receta
        </Text>
        <Text>Titulo</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Título"
          className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-700"
        />
        <Text>Descripción</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Descripción"
          className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-700"
        />
        <Text>Ingredientes</Text>
        <TextInput
          value={ingredients}
          onChangeText={setIngredients}
          placeholder="Ingredientes"
          className="w-full p-3 mb-4 border rounded-lg bg-white text-gray-700"
        />
        <Text>Instrucciones</Text>
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
            <Picker.Item
              label="Selecciona una categoría"
              value=""
              enabled={false}
            />
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
            className="bg-green-500 w-44 h-16 rounded-full transition-opacity active:opacity-50 px-4 py-2 m-2 hover:bg-green-400 text-center items-center justify-center"
            onPress={handleImageUpload}
          >
            <Text className="text-white">Seleccionar Imagen</Text>
          </Pressable>

          <Pressable
            className="bg-blue-500 w-44 h-16 text-white rounded-full transition-opacity active:opacity-50 px-4 py-2 m-2 hover:bg-blue-400 text-center items-center justify-center"
            onPress={handlePhotoUpload}
          >
            <Text className="text-white">Tomar Foto con la Cámara</Text>
          </Pressable>
        </View>
        <Text className="mb-2 text-gray-700">Selecciona una categoría:</Text>
        <Pressable
          className="bg-gray-500 w-36 h-16 text-white rounded-full transition-opacity active:opacity-50 px-4 py-2 m-2 text-center items-center justify-center"
          onPress={handleSubmit}
        >
          <Text className="text-white ">Crear Receta</Text>
        </Pressable>

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
};

export default RecipeFormUI;
