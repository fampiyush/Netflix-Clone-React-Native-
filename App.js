import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Home from './components/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#1c1c1a' />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1a',
  },
});
