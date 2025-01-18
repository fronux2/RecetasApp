import React from 'react';
import { Text, View, ImageBackground } from 'react-native';

const Hero = () => {
  return (
    <View className="relative w-full h-80">
      <ImageBackground
        source={require('../assets/ingre.webp')}
        className="absolute inset-0 w-full h-full xl:h-96"
        resizeMode="cover"
      >
        <View className="absolute inset-0 bg-black opacity-40" />
        <View className="absolute inset-0 flex justify-center items-center p-4">
          <Text className="text-white text-3xl font-bold">
            ¡Bienvenido a Mi Recetario!
          </Text>
          <Text className="text-white text-lg mt-2">
            Explora nuestras deliciosas recetas y empieza a cocinar platos
            increíbles.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Hero;
