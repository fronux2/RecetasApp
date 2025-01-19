import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';
// Aseguramos que las variables de entorno sean de tipo string

// Exportamos el cliente tipado de Supabase
export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
