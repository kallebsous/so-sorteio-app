import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Tutorial } from './src/components/Tutorial';
import { Simulator } from './src/components/Simulator';
import { SimulationProvider } from './src/contexts/SimulationContext';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SimulationProvider>
        <StatusBar style="dark" />
        <Stack.Navigator 
          initialRouteName="Tutorial"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTintColor: '#1a1a1a',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: '#f8f9fa',
            },
          }}
        >
          <Stack.Screen 
            name="Tutorial" 
            component={Tutorial}
            options={{ 
              title: 'Aprenda sobre Escalonamento',
              headerLargeTitle: true,
            }}
          />
          <Stack.Screen 
            name="Simulator" 
            component={Simulator}
            options={{ 
              title: 'Simulador de Escalonamento',
              headerLargeTitle: true,
            }}
          />
        </Stack.Navigator>
      </SimulationProvider>
    </NavigationContainer>
  );
}