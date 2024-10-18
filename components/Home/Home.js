// components/Home/Home.js
import React from 'react';
import { View, Text, StyleSheet, StatusBar, Button } from 'react-native';
import { auth } from '../../firebaseConfig'; // Ajuste o caminho se necessário
import { signOut } from 'firebase/auth';

const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('Logout realizado com sucesso');
        navigation.navigate('Login'); // Navegar de volta para a tela de login
      })
      .catch((error) => {
        console.error('Erro ao fazer logout:', error);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="orange" />
      <Text style={styles.welcomeText}>Bem-vindo à Página Home!</Text>
      <Button title="Logout" onPress={handleLogout} color="orange" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
    backgroundColor: '#FBF9F5',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Espaço entre o texto e o botão
  },
});

export default HomeScreen;
