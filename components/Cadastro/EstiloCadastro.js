import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF9F5',
  },
  scrollContainer: {
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
    marginTop: 55,
  },
  iconWrapper: {
    width: 120,
    height: 120,
    backgroundColor: '#FF9110',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  welcomeText: {
    fontFamily: 'Readex Pro',
    color: '#101518',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  signupText: {
    fontFamily: 'Inter',
    color: '#57636C',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5, // Adicionado espaçamento inferior
  },

  signupTextt: {
    fontFamily: 'Inter',
    color: '#57636C',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 1, // Adicionado espaçamento inferior
  },




  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    elevation: 2,
    marginTop: 30,
  },
  input: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
    marginBottom: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  button: {
    backgroundColor: '#FF9110',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  alreadyHaveAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  alreadyHaveAccountText: {
    color: '#101518', // Cor preta para "Já tem conta?"
    fontSize: 16,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: 'transparent', // Sem fundo
    marginLeft: 8, // Espaço entre o texto e o botão
  },
  loginButtonText: {
    color: '#FF9110', // Cor laranja para "Logar"
    fontSize: 16,
    fontWeight: '500',
  },
});

export default styles;
