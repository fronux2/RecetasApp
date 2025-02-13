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

export const deleteRecipe = async (id: string): Promise<void> => {
  const data = await supabase.from('recipes').delete().eq('id', id);
  console.log('borrado: ' + id);
  console.log('data: ' + data);
  if (data.error) {
    console.error(data.error);
  }
};

export const updateRecipe = async (
  id: string,
  recipe: Recipe
): Promise<void> => {
  console.log('id: ' + id);
  console.log('recipe: ' + recipe);
  const { error } = await supabase.from('recipes').update(recipe).eq('id', id);
  if (error) {
    console.error(error);
  }
};
