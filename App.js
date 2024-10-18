import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './components/Login/Login';
import Inicio from './components/Home/Home';
import Cadastro from './components/Cadastro/Cadastro';
import ResetScreen from './components/ResetPass/ResetScreen';
import UpdateScreen from './components/update/updates';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UpdateScreen">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Inicio}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Tela"
          component={Cadastro}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ResetScreen"
          component={ResetScreen}
          options={{ headerShown: false }}
        />

<Stack.Screen
          name="UpdateScreen"
          component={UpdateScreen}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
