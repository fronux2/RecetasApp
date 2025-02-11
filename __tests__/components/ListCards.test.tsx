// ListCards.test.tsx
import { render, screen } from '@testing-library/react-native';
import ListCards from '../../components/cards/ListCards'; // Ajusta la ruta
import { recipes } from '../../data/recipe';
import { Link } from 'expo-router';
import Card from '../../components/cards/Card';

// Mock de datos de recetas filtrables
jest.mock('../../data/recipe', () => ({
  recipes: [
    {
      id: '1',
      title: 'Tacos al pastor',
      description: 'Auténticos tacos mexicanos',
      image_url: 'tacos.jpg',
      category_id: 'comida-mexicana',
    },
    {
      id: '2',
      title: 'Pozole rojo',
      description: 'Plato tradicional de fiestas',
      image_url: 'pozole.jpg',
      category_id: 'comida-mexicana',
    },
    {
      id: '3',
      title: 'Sushi rolls',
      description: 'Rollos japoneses frescos',
      image_url: 'sushi.jpg',
      category_id: 'comida-japonesa',
    },
  ],
}));

// Mock de Link para verificar la navegación
jest.mock('expo-router', () => ({
  Link: jest.fn(({ children, href, testID }) => children), // Mock simple
}));

// Mock del componente Card para verificar props
jest.mock('../../components/cards/Card', () => jest.fn((props) => null));

describe('ListCards Component', () => {
  const categoryId = 'comida-mexicana';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('muestra el título correctamente', () => {
    render(<ListCards title="Comida Mexicana" id={categoryId} />);
    expect(screen.getByText('Comida Mexicana')).toBeTruthy();
  });

  it('filtra y muestra SOLO las recetas de la categoría correcta', () => {
    render(<ListCards title="Test" id={categoryId} />);

    // Verificamos cuántas veces se llamó a Card
    const expectedRecipes = recipes.filter((r) => r.category_id === categoryId);
    expect(Card).toHaveBeenCalledTimes(expectedRecipes.length);
  });

  it('pasa las props correctas a cada Card', () => {
    render(<ListCards title="Test" id={categoryId} />);

    const expectedRecipes = recipes.filter((r) => r.category_id === categoryId);

    // Verificamos los parámetros de cada llamada a Card
    expectedRecipes.forEach((recipe, index) => {
      expect(Card).toHaveBeenNthCalledWith(
        index + 1,
        expect.objectContaining({
          title: recipe.title,
          description: recipe.description,
          imageUrl: recipe.image_url,
        }),
        {}
      );
    });
  });

  it('los Links tienen los hrefs correctos', () => {
    render(<ListCards title="Test" id={categoryId} />);

    const expectedRecipes = recipes.filter((r) => r.category_id === categoryId);
    const linkElements = screen.getAllByTestId('link-receta');

    expectedRecipes.forEach((recipe, index) => {
      expect(linkElements[index].props.href).toBe(`/${recipe.id}`);
    });
  });

  it('no muestra cards cuando no hay recetas en la categoría', () => {
    render(<ListCards title="Test" id="categoria-inexistente" />);
    expect(Card).not.toHaveBeenCalled();
  });
});
