import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TopRestaurants from '../screens/TopRestaurants';

const Stack = createStackNavigator();

export default class TopRestaurantsStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="top-restaurants"
          component={TopRestaurants}
          options={{ title: 'Los Mejores Restaurantes' }}
        />
      </Stack.Navigator>
    );
  }
}
