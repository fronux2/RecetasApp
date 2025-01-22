import { supabase } from '../supabase/supabaseCliente';
import { decode } from 'base64-arraybuffer';

export const uploadRecipeImage = async (
  base64Data: string,
  recipeId: string
) => {
  try {
    const fileName = recipeId;
    const { data, error } = await supabase.storage
      .from('recipe-covers')
      .upload(fileName, decode(base64Data), {
        contentType: 'image/jpeg',
      });

    if (error) {
      throw error;
    }

    // Obtén la URL pública del archivo subido
    const { data: publicUrlData } = supabase.storage
      .from('recipe-covers')
      .getPublicUrl(fileName);

    return publicUrlData?.publicUrl; // Retorna la URL pública
  } catch (error) {
    console.error('Error subiendo la imagen:', error.message);
    return null;
  }
};
