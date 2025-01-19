// src/services/authService.ts
import { supabase } from '../supabase/supabaseCliente';
import { User } from '@supabase/supabase-js';
// src/services/auth.ts

export const register = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  // Acceder al usuario a través de 'data.user'
  return data.user; // Aquí cambiamos 'user' a 'data.user'
};

// src/services/auth.ts

export const login = async (
  email: string,
  password: string
): Promise<User | null> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data.user; // 'data.user' es del tipo 'User | null'
};

// src/services/auth.ts

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};
