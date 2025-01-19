import { supabase } from '../supabase/supabaseCliente'; // Asegúrate de tener configurado el cliente de Supabase
import { Recipe } from '../types/models'; // Asegúrate de que la interfaz `Recipe` esté en el archivo correcto

// Función para agregar una nueva receta
export const addRecipe = async (newRecipe: Recipe) => {
  try {
    const { data, error } = await supabase
      .from('recipes') // La tabla donde se almacenarán las recetas
      .insert([
        {
          user_id: newRecipe.user_id,
          title: newRecipe.title,
          description: newRecipe.description,
          ingredients: newRecipe.ingredients,
          instructions: newRecipe.instructions,
          image_url: newRecipe.image_url,
          category_id: newRecipe.category_id,
          created_at: new Date().toISOString(), // Añadir la fecha de creación
        },
      ])
      .single(); // Usamos `.single()` para obtener un solo objeto como resultado

    if (error) {
      throw new Error(error.message);
    }

    return data; // Devuelve los datos de la receta agregada
  } catch (error) {
    console.error('Error al agregar la receta:', error);
    throw error;
  }
};
