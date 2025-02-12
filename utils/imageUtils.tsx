import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
// Solicitar permisos de cámara y galería
export const requestPermissions = async () => {
  const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
  const mediaLibraryPermission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (
    cameraPermission.status !== 'granted' ||
    mediaLibraryPermission.status !== 'granted'
  ) {
    Alert.alert(
      'Permiso denegado',
      'Es necesario permitir el acceso a la cámara y la galería para seleccionar o tomar una foto.'
    );
    return false;
  }
  return true;
};

// Seleccionar imagen desde la galería
export const pickImage = async () => {
  const hasPermissions = await requestPermissions();
  if (!hasPermissions) return;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'images',
    quality: 1,
  });
  if (!result.canceled) {
    const capturedImageUri = result.assets[0];
    const uri = result.assets[0].uri;
    const base64 = await FileSystem.readAsStringAsync(capturedImageUri.uri, {
      encoding: 'base64',
    });

    try {
      const imageName = `${Date.now()}.jpg`;
      try {
        const imageName = `${Date.now()}.jpg`;
        return { base64, imageName, uri };
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        Alert.alert('Error', 'No se pudo subir la imagen.');
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      Alert.alert('Error', 'No se pudo subir la imagen.');
    }
  }
};

// Tomar foto con la cámara
export const takePhoto = async () => {
  const hasPermissions = await requestPermissions();
  if (!hasPermissions) return;

  const result = await ImagePicker.launchCameraAsync({
    quality: 1,
    base64: true,
  });

  if (!result.canceled) {
    const capturedImageUri = result.assets[0];
    const uri = result.assets[0].uri;
    const base64 = await FileSystem.readAsStringAsync(capturedImageUri.uri, {
      encoding: 'base64',
    });
    //setImage(capturedImageUri);

    try {
      const imageName = `${Date.now()}.jpg`;
      return { base64, imageName, uri };
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      Alert.alert('Error', 'No se pudo subir la imagen.');
    }
  }
};
