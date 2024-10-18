// /componentes/update/update.js
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { auth } from '../../firebaseConfig'; // Ajuste o caminho se necessário

const UpdateScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Define um timeout para exibir a tela por 3 segundos
      const timer = setTimeout(() => {
        setLoading(false); // Para o loading assim que a verificação for concluída
        if (user) {
          // Se o usuário estiver logado, redireciona para a tela Home
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        } else {
          // Se não estiver logado, redireciona para a tela de Login
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      }, 3000); // 3000 milissegundos = 3 segundos

      return () => {
        clearTimeout(timer); // Limpa o timeout se o componente for desmontado
        unsubscribe(); // Limpa o listener ao desmontar o componente
      };
    });

    return () => unsubscribe(); // Limpa o listener ao desmontar o componente
  }, [navigation]);

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#FF9110" />
          <Text style={styles.loadingText}>Checando informações...</Text>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#57636C',
  },
});

export default UpdateScreen;
