import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavPage from '../pages/navpage';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Nav"
          options={{headerShown: false}}
          component={NavPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
