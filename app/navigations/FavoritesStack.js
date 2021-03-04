import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Favorites from '../screens/Favorites';

const Stack = createStackNavigator();

export default class FavoritesStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="favorites"
          component={Favorites}
          options={{ title: 'Restaurantes Favoritos' }}
        />
      </Stack.Navigator>
    );
  }
}
