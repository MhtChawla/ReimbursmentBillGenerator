import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import UberScreen from '../screens/Uber.screen';
import HomeScreen from '../screens/Home.screen';
import SwiggyScreen from '../screens/Swiggy.screen';
import UberForm from '../screens/Form.uber';
import SwiggyForm from '../screens/Form.swiggy';

const RootNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'Home'} component={HomeScreen} />
        <Stack.Screen
          name={'UberForm'}
          component={UberForm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'SwiggyForm'}
          component={SwiggyForm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Uber'}
          component={UberScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Swiggy'}
          component={SwiggyScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
