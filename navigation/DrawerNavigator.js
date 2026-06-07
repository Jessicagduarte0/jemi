import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CatalogScreen from '../screens/CatalogScreen';
import CartScreen from '../screens/CartScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import CustomDrawer from '../components/CustomDrawer';
import colors from '../constants/colors';

const Drawer = createDrawerNavigator();

// Drawer Navigator customizado do App JEMI
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      // Componente do drawer customizado
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: '700',
          letterSpacing: 2,
          fontSize: 18,
        },
        headerTitleAlign: 'center',
        drawerStyle: {
          width: 280,
        },
        drawerType: 'front',
        swipeEnabled: true,
      }}
    >
      <Drawer.Screen
        name="Inicio"
        component={CatalogScreen}
        options={{ title: 'JEMI' }}
      />
      <Drawer.Screen
        name="Catalogo"
        component={CatalogScreen}
        options={{ title: 'Catálogo' }}
      />
      <Drawer.Screen
        name="Carrinho"
        component={CartScreen}
        options={{ title: 'Meu Carrinho' }}
      />
      <Drawer.Screen
        name="Notificacoes"
        component={NotificationsScreen}
        options={{ title: 'Notificações' }}
      />
      <Drawer.Screen
        name="MinhaConta"
        component={MyAccountScreen}
        options={{ title: 'Minha Conta' }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
