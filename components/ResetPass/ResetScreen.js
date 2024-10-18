import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, StatusBar } from 'react-native';
import { auth } from '../../firebaseConfig'; // Ajuste o caminho se necessário
import { sendPasswordResetEmail } from 'firebase/auth';

const ResetScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      setErrorMessage('Por favor, insira seu e-mail.');
      return;
    }

    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert('E-mail enviado', 'Verifique sua caixa de entrada para redefinir sua senha.');
        setEmail(''); // Limpa o campo de e-mail após o envio
        setLoading(false);
        navigation.navigate('Login'); // Redireciona para a tela de login após o envio
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            setErrorMessage('E-mail inválido. Por favor, insira um e-mail válido.');
            break;
          case 'auth/user-not-found':
            setErrorMessage('Usuário não encontrado. Verifique seu e-mail.');
            break;
          default:
            setErrorMessage('Ocorreu um erro. Tente novamente.');
        }
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="orange" />
      <Text style={styles.title}>Redefinir Senha</Text>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        accessibilityLabel="E-mail"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#FF9110" style={styles.loading} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Enviar E-mail de Redefinição</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backToLogin}>Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF9F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
    width: '100%',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FF9110',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  loading: {
    marginVertical: 16,
  },
  backToLogin: {
    color: '#FF9110',
    marginTop: 16,
  },
});

export default ResetScreen;
