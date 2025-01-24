// src/services/supabaseService.ts
import { supabase } from '../supabase/supabaseCliente';
import { Recipe } from '../types/models';
export const fetchRecipes = async (): Promise<Recipe[]> => {
  const { data, error } = await supabase.from('recipes').select('*');

  if (error) {
    console.error(error);
    return [];
  }

  return data as Recipe[];
};

export const addRecipe = async (recipe: Recipe): Promise<void> => {
  const { error } = await supabase.from('recipes').insert([recipe]);

  if (error) {
    console.error(error);
  }
};
