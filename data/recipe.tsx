import { Recipe } from '../types/models';

export const recipes: Recipe[] = [
  // Almuerzos y Cenas
  {
    id: '1',
    user_id: '1',
    title: 'Spaghetti a la Boloñesa',
    description: 'Deliciosa pasta con salsa de tomate y carne molida.',
    ingredients:
      'Spaghetti, carne molida, tomate, cebolla, ajo, queso parmesano.',
    instructions:
      'Cocinar la pasta, preparar la salsa en una sartén y mezclar.',
    image_url:
      'https://images.pexels.com/photos/3908197/pexels-photo-3908197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category_id: '1',
  },
  {
    id: '2',
    user_id: '1',
    title: 'Pollo al Curry',
    description: 'Pollo en una deliciosa salsa de curry con arroz.',
    ingredients: 'Pollo, curry en polvo, crema, arroz, ajo, jengibre.',
    instructions: 'Dorar el pollo, añadir el curry y crema, servir con arroz.',
    image_url:
      'https://images.pexels.com/photos/6113813/pexels-photo-6113813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category_id: '1',
  },
  {
    id: '3',
    user_id: '1',
    title: 'Ensalada César',
    description: 'Clásica ensalada con lechuga, pollo y aderezo César.',
    ingredients: 'Lechuga, pollo, crutones, queso parmesano, aderezo César.',
    instructions: 'Mezclar todos los ingredientes y servir fría.',
    image_url:
      'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category_id: '1',
  },
  {
    id: '4',
    user_id: '1',
    title: 'Salmón al Horno',
    description: 'Salmón horneado con hierbas y limón.',
    ingredients: 'Salmón, limón, ajo, hierbas aromáticas, sal, pimienta.',
    instructions: 'Hornear el salmón con especias a 200°C durante 20 minutos.',
    image_url:
      'https://images.pexels.com/photos/5741440/pexels-photo-5741440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category_id: '1',
  },
  {
    id: '5',
    user_id: '1',
    title: 'Pizza Margarita',
    description: 'Pizza clásica con tomate, mozzarella y albahaca.',
    ingredients:
      'Masa para pizza, tomate, mozzarella, albahaca, aceite de oliva.',
    instructions: 'Armar la pizza y hornear a 220°C por 15 minutos.',
    image_url:
      'https://images.pexels.com/photos/16890470/pexels-photo-16890470/free-photo-of-pizza-margherita-de-masa-madre-con-albahaca-fresca-picada.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category_id: '1',
  },
  {
    id: '6',
    user_id: '1',
    title: 'Churrasco Italiano',
    description: 'Sándwich chileno con palta, tomate y mayonesa.',
    ingredients: 'Pan, churrasco, palta, tomate, mayonesa.',
    instructions: 'Armar el sándwich con todos los ingredientes y disfrutar.',
    image_url:
      'https://th.bing.com/th/id/OIP.ygkvwBi_WyHy5h05_tqW_QHaE8?rs=1&pid=ImgDetMain',
    category_id: '1',
  },

  // Bebidas
  {
    id: '7',
    user_id: '2',
    title: 'Limonada Clásica',
    description: 'Refrescante bebida con limón y menta.',
    ingredients: 'Limón, agua, azúcar, menta, hielo.',
    instructions: 'Mezclar todos los ingredientes y servir con hielo.',
    image_url:
      'https://images.pexels.com/photos/2109099/pexels-photo-2109099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category_id: '2',
  },
  {
    id: '8',
    user_id: '2',
    title: 'Mojito',
    description: 'Cóctel con ron, menta y soda.',
    ingredients: 'Ron, menta, azúcar, soda, hielo.',
    instructions: 'Mezclar los ingredientes en un vaso y añadir hielo.',
    image_url:
      'https://images.pexels.com/photos/4457151/pexels-photo-4457151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category_id: '2',
  },
  {
    id: '9',
    user_id: '2',
    title: 'Té Helado',
    description: 'Té refrescante con limón.',
    ingredients: 'Té negro, limón, azúcar, hielo.',
    instructions: 'Preparar el té, añadir limón y servir con hielo.',
    image_url:
      'https://images.pexels.com/photos/30337181/pexels-photo-30337181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category_id: '2',
  },
  {
    id: '10',
    user_id: '2',
    title: 'Chocolate Caliente',
    description: 'Bebida cálida y reconfortante con chocolate.',
    ingredients: 'Leche, chocolate en barra, azúcar.',
    instructions:
      'Calentar la leche y mezclar con el chocolate hasta derretir.',
    image_url:
      'https://images.pexels.com/photos/3523148/pexels-photo-3523148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category_id: '2',
  },
  {
    id: '11',
    user_id: '2',
    title: 'Smoothie de Frutas',
    description: 'Bebida cremosa de frutas frescas.',
    ingredients: 'Frutas (plátano, fresa), yogur, miel, hielo.',
    instructions: 'Licuar todos los ingredientes y servir frío.',
    image_url:
      'https://images.pexels.com/photos/7937483/pexels-photo-7937483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category_id: '2',
  },
  {
    id: '12',
    user_id: '2',
    title: 'Piña Colada',
    description: 'Cóctel tropical con piña y coco.',
    ingredients: 'Piña, crema de coco, ron, hielo.',
    instructions: 'Licuar los ingredientes y servir frío.',
    image_url:
      'https://images.pexels.com/photos/24870656/pexels-photo-24870656/free-photo-of-vacaciones-relajacion-verano-alcohol.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category_id: '2',
  },

  // Postres
  {
    id: '13',
    user_id: '3',
    title: 'Tiramisú',
    description: 'Postre italiano con café y mascarpone.',
    ingredients: 'Mascarpone, café, bizcochos de soletilla, cacao.',
    instructions: 'Montar capas de mascarpone y bizcocho remojado en café.',
    image_url:
      'https://images.pexels.com/photos/27566691/pexels-photo-27566691/free-photo-of-comida-plato-rojo-gafas-de-sol.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category_id: '3',
  },
  {
    id: '14',
    user_id: '3',
    title: 'Cheesecake de Fresa',
    description: 'Tarta cremosa con fresas frescas.',
    ingredients: 'Queso crema, fresas, galletas, mantequilla.',
    instructions: 'Preparar la base, añadir la crema y decorar con fresas.',
    image_url:
      'https://images.pexels.com/photos/13096225/pexels-photo-13096225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category_id: '3',
  },
  {
    id: '15',
    user_id: '3',
    title: 'Helado de Vainilla',
    description: 'Clásico helado de vainilla.',
    ingredients: 'Leche, crema, azúcar, extracto de vainilla.',
    instructions: 'Mezclar ingredientes y congelar en máquina de helados.',
    image_url:
      'https://images.pexels.com/photos/5060373/pexels-photo-5060373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category_id: '3',
  },
  {
    id: '16',
    user_id: '3',
    title: 'Brownies',
    description: 'Deliciosos cuadrados de chocolate.',
    ingredients: 'Chocolate, mantequilla, azúcar, harina, huevos.',
    instructions: 'Hornear la mezcla de ingredientes en un molde cuadrado.',
    image_url:
      'https://images.pexels.com/photos/2373520/pexels-photo-2373520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category_id: '3',
  },
  {
    id: '17',
    user_id: '3',
    title: 'Flan de Caramelo',
    description: 'Postre cremoso con caramelo.',
    ingredients: 'Leche, huevos, azúcar, esencia de vainilla.',
    instructions: 'Hornear la mezcla al baño maría hasta cuajar.',
    image_url:
      'https://images.pexels.com/photos/12340630/pexels-photo-12340630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category_id: '3',
  },
  {
    id: '18',
    user_id: '3',
    title: 'Panqueques',
    description: 'Panqueques esponjosos con miel.',
    ingredients: 'Harina, leche, huevos, azúcar, mantequilla.',
    instructions: 'Cocinar la mezcla en una sartén hasta dorar ambos lados.',
    image_url:
      'https://images.pexels.com/photos/6863872/pexels-photo-6863872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category_id: '3',
  },
];
