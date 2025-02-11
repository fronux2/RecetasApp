import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Fontisto from '@expo/vector-icons/Fontisto';

export const NoteIcon = () => {
  return <SimpleLineIcons name="note" size={24} color="black" />;
};

export const HomeIcon = () => {
  return <SimpleLineIcons name="home" size={24} color="black" />;
};

export const UserIcon = () => {
  return <SimpleLineIcons name="user" size={24} color="black" />;
};

export const FavoriteIcon = ({ color }: { color: string }) => {
  return <Fontisto name="favorite" size={50} color={color} />;
};
