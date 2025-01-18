import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Main from './components/Main';
export default function App() {
  return (
    <SafeAreaProvider>
      <View>
        <StatusBar style="auto" />
        <Main />
      </View>
    </SafeAreaProvider>
  );
}
