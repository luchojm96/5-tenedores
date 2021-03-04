import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Account from '../screens/Account/Account';
import Login from '../screens/Account/Login';
import Register from '../screens/Account/Register';

const Stack = createStackNavigator();

export default class AccountStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="account"
          component={Account}
          options={{ title: 'Mi Cuenta' }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ title: 'Iniciar Sesión' }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ title: 'Registrarse' }}
        />
      </Stack.Navigator>
    );
  }
}
