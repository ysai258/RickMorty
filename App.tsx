import React from 'react';
import Home from './src/Screens/Home/Home';
import {APIProvider} from './src/Context/ApiContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from './src/Screens/Profile/Profile';
import {RootStackParamList} from './src/Types/types';

const Stack = createNativeStackNavigator<RootStackParamList>(); // Creating a stack navigator and specifying the RootStackParamList as its parameter

const App = () => {
  return (
    <NavigationContainer>
      <APIProvider>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </APIProvider>
    </NavigationContainer>
  );
};

export default App;
