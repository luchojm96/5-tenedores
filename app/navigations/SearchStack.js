import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Search from '../screens/Search';

const Stack = createStackNavigator();

export default class SearchStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="search"
          component={Search}
          options={{ title: 'Buscador' }}
        />
      </Stack.Navigator>
    );
  }
}
