// RecipeForm.tsx
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { type Recipe } from '../../types/models';
import { pickImage, takePhoto } from '../../utils/imageUtils';
import { uploadRecipeImage } from '../../services/uploadImage';
import { addRecipe, updateRecipe } from '../../services/recipeService';
import RecipeFormUI from '../../components/cards/FormRecipeUI';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';
import { supabase } from '../../supabase/supabaseCliente';
import { router } from 'expo-router';

export default function FormRecipe({ id }: { id: string | undefined }) {
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
  const [categories, setCategories] = useState<{ id: string }[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    try {
      if (id) {
        const fetchRecipes = async () => {
          const { data, error } = await supabase
            .from('recipes')
            .select('*')
            .eq('id', id);
          if (!error) {
            setTitle(data[0].title);
            setDescription(data[0].description);
            setIngredients(data[0].ingredients);
            setInstructions(data[0].instructions);
            setCategoryId(data[0].category_id);
            setImageUpload({
              base64: data[0].image_url,
              imageName: '',
              uri: data[0].image_url,
            });
          }
        };
        fetchRecipes();
      }
    } catch (error) {
      console.log(error);
    }

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
      (event: AuthChangeEvent, session: Session | null) => {
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
      !imageUpload.base64
    ) {
      Alert.alert(
        'Error',
        'Por favor, complete todos los campos y suba una imagen.'
      );
      return;
    }

    setLoading(true);
    let imageUrl: string;
    if (!id) {
      const uploadResponse = await uploadRecipeImage(
        imageUpload.base64,
        imageUpload.imageName
      );

      if (!uploadResponse) {
        return Alert.alert(
          'Error',
          'No se pudo subir la imagen, Selecciona otra imagen.'
        );
      }
      imageUrl = uploadResponse;
    } else {
      imageUrl = imageUpload.uri;
    }
    try {
      const recipe: Recipe = {
        user_id: user.id,
        title,
        description,
        ingredients,
        instructions,
        image_url: imageUrl,
        category_id: categoryId,
      };
      console.log('recipe: ' + recipe);

      if (id) await updateRecipe(id, recipe);
      else {
        await addRecipe(recipe);
      }

      Alert.alert('Éxito', 'Receta creada con éxito');
      router.back();
      setImageUpload({ base64: '', imageName: '', uri: '' });
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
    <RecipeFormUI
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      ingredients={ingredients}
      setIngredients={setIngredients}
      instructions={instructions}
      setInstructions={setInstructions}
      categories={categories}
      categoryId={categoryId}
      setCategoryId={setCategoryId}
      handleImageUpload={handleImageUpload}
      handlePhotoUpload={handlePhotoUpload}
      handleSubmit={handleSubmit}
      imageUpload={imageUpload}
      loading={loading}
    />
  );
}
