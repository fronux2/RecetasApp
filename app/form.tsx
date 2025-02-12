import FormRecipe from '../components/cards/FormRecipe';

import { useLocalSearchParams } from 'expo-router';
export default function Form() {
  const { id } = useLocalSearchParams();
  if (id) {
    const idRecipe = id.toString() || undefined;
    return <FormRecipe id={idRecipe} />;
  }
  return <FormRecipe id={undefined} />;
}
