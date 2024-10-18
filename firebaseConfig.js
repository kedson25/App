import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyAbGMqqW3dBaF0WtivEetvxEMMLdUxpI0w",
    authDomain: "login-aa007.firebaseapp.com",
    projectId: "login-aa007",
    storageBucket: "login-aa007.appspot.com",
    messagingSenderId: "629635921694",
    appId: "1:629635921694:web:7f93106ba1536c90f63b0f",
    measurementId: "G-SYQ8CX6Z73"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
