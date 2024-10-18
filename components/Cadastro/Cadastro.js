import React, { useState } from 'react';
import { View, Text, StatusBar, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from '../../firebaseConfig'; // Ajuste o caminho se necessário
import { createUserWithEmailAndPassword } from 'firebase/auth';
import styles from './EstiloCadastro';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para validar e-mail (somente Gmail)
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@gmail\.com$/; // Apenas endereços Gmail
    return regex.test(email);
  };

  const handleSignup = () => {
    if (!email || !password || !confirmPassword) {
      setErrorMessage('Todos os campos são obrigatórios.');
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage('Por favor, insira um e-mail válido');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não correspondem.');
      return;
    }

    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log('Cadastro realizado com sucesso');
        setErrorMessage('');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setErrorMessage('Este e-mail já está em uso.');
            break;
          case 'auth/invalid-email':
            setErrorMessage('E-mail inválido. Verifique e tente novamente.');
            break;
          case 'auth/weak-password':
            setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
            break;
          default:
            setErrorMessage('Erro ao cadastrar. Tente novamente.');
        }
        setLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar backgroundColor="orange" />
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps='handled'>
        <View style={styles.iconContainer}>
          <View style={styles.iconWrapper}>
            <MaterialIcons name="person-add" size={60} color="white" />
          </View>
        </View>
        <Text style={styles.welcomeText}>Crie sua conta!</Text>
        <Text style={styles.signupText}>Cadastre-se para continuar</Text>

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
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!confirmPasswordVisible}
              accessibilityLabel="Confirmar Senha"
            />
            <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} style={styles.eyeIcon}>
              <MaterialIcons name={confirmPasswordVisible ? "visibility" : "visibility-off"} size={22} color="#57636C" />
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#FF9110" style={styles.loading} />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupTextt}>Já tem conta?</Text>
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButtonText}>Logar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
