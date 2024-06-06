import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavBar } from './components/NavBar/NavBar';
import { MainPage } from './components/Pages/MainPage';

export default function App() {
  return (
    <SafeAreaView style={styles.page}>
      <MainPage />
      <NavBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: '#111111'
    }
});
