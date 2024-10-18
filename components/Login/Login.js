import React, { useEffect, useState } from 'react';
import { View, Text, Button, StatusBar, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from '../../firebaseConfig'; // Ajuste o caminho se necessário
import { signInWithEmailAndPassword } from 'firebase/auth';
import styles from './estilos';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Estado de loading

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Se o usuário já estiver logado, redireciona para a tela Home
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      }
    });

    return () => unsubscribe(); // Limpa o listener ao desmontar o componente
  }, [navigation]);

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage('Todos os campos são obrigatórios.');
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage('Por favor, insira um e-mail válido.');
      return;
    }

    setLoading(true); // Inicia o loading

    // Realiza o login com Firebase
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Login realizado com sucesso');
        setErrorMessage(''); // Limpar mensagem de erro
        setLoading(false); // Parar o loading antes de redirecionar
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }], // Redireciona para a tela Home
        });
      })
      .catch((error) => {
        // Define uma mensagem de erro com base no código de erro do Firebase
        switch (error.code) {
          case 'auth/user-not-found':
            setErrorMessage('Usuário não encontrado. Verifique seu e-mail.');
            break;
          case 'auth/wrong-password':
            setErrorMessage('Senha incorreta. Tente novamente.');
            break;
          case 'auth/invalid-email':
            setErrorMessage('E-mail inválido. Verifique e tente novamente.');
            break;
          default:
            setErrorMessage('Usuário ou a senha está incorreta.');
        }
        setLoading(false); // Para o loading independentemente do resultado
      });
  };

  // Verifica se os campos estão válidos para habilitar o botão
  const isLoginButtonDisabled = !isValidEmail(email) || !password;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar backgroundColor="orange" />
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps='handled'>
        <View style={styles.iconContainer}>
          <View style={styles.iconWrapper}>
            <MaterialIcons name="login" size={60} color="white" />
          </View>
        </View>
        <Text style={styles.welcomeText}>Bem-vindo Polly!</Text>
        <Text style={styles.signupText}>Faça login na sua conta</Text>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            accessibilityLabel="E-mail"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!passwordVisible}
              accessibilityLabel="Senha"
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
              <MaterialIcons name={passwordVisible ? "visibility" : "visibility-off"} size={22} color="#57636C" />
            </TouchableOpacity>
          </View>

          {loading ? ( // Exibe indicador de carregamento
            <ActivityIndicator size="large" color="#FF9110" style={styles.loading} />
          ) : (
            <TouchableOpacity
              style={[styles.button, isLoginButtonDisabled && { opacity: 0.5 }]}
              onPress={handleLogin}
              disabled={isLoginButtonDisabled} // Desabilita o botão se inválido
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ResetScreen')}>
            <Text style={styles.linkText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Não tem conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Tela')}>
            <Text style={styles.linkText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
