import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Card from '../../components/cards/Card';

describe('Card Component', () => {
  const mockProps = {
    title: 'Test Title',
    description: 'This is a test description',
    imageUrl: 'https://example.com/test-image.jpg',
  };

  it('renders the card container correctly', () => {
    render(<Card {...mockProps} />);

    // Verifica que el contenedor de la tarjeta esté presente
    const cardContainer = screen.getByTestId('card-container');
    expect(cardContainer).toBeTruthy();
  });

  it('displays the correct title', () => {
    render(<Card {...mockProps} />);

    // Verifica que el título se muestre correctamente
    const titleElement = screen.getByTestId('card-title');
    expect(titleElement).toBeTruthy();
    expect(titleElement.props.children).toBe(mockProps.title);
  });

  it('displays the correct description', () => {
    render(<Card {...mockProps} />);

    // Verifica que la descripción se muestre correctamente
    const descriptionElement = screen.getByTestId('card-description');
    expect(descriptionElement).toBeTruthy();
    expect(descriptionElement.props.children).toBe(mockProps.description);
  });

  it('displays the correct image', () => {
    render(<Card {...mockProps} />);

    // Verifica que la imagen se muestre correctamente
    const imageElement = screen.getByTestId('card-image');
    expect(imageElement).toBeTruthy();
    expect(imageElement.props.source.uri).toBe(mockProps.imageUrl);
  });
});
