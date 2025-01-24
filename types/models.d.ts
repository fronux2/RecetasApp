export interface User {
  id?: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
}

export interface Recipe {
  id?: string;
  user_id: string;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  image_url: string;
  created_at?: string;
  category_id: string;
  categories?: Category;
}
