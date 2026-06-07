// App JEMI - Loja de Moda
// Desenvolvido com React Native + Expo

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Context Provider
import { AppProvider } from './context/AppContext';

// Navegação
import DrawerNavigator from './navigation/DrawerNavigator';

// Telas do Stack
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';

const Stack = createStackNavigator();

// Componente raiz da aplicação
export default function App() {
  return (
    // Provider do contexto global (createContext / useContext)
    <AppProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{ headerShown: false }}
        >
          {/* Fluxo de autenticação */}
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />

          {/* Navegação principal com Drawer */}
          <Stack.Screen name="Main" component={DrawerNavigator} />

          {/* Detalhe do produto (empilhado sobre o Drawer) */}
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
