import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useAppContext } from '../../context/AppContext';
import styles from './styles';

// Menu items do Drawer
const MENU_ITEMS = [
  { name: 'Inicio', label: 'Início', icon: '🏠' },
  { name: 'Catalogo', label: 'Catálogo', icon: '👗' },
  { name: 'Carrinho', label: 'Meu Carrinho', icon: '🛒' },
  { name: 'Notificacoes', label: 'Notificações', icon: '🔔' },
  { name: 'MinhaConta', label: 'Minha Conta', icon: '👤' },
];

// Componente do Drawer customizado
// Recebe props via desestruturação
const CustomDrawer = ({ navigation, state }) => {
  // Desestruturação do contexto
  const { user, logout, cartCount, unreadCount } = useAppContext();

  // Rota ativa atual
  const activeRouteName = state?.routeNames?.[state?.index] ?? '';

  // Primeira letra do nome para avatar
  const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : 'U';

  const handleLogout = () => {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const getBadgeCount = (routeName) => {
    if (routeName === 'Carrinho') return cartCount;
    if (routeName === 'Notificacoes') return unreadCount;
    return 0;
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com info do usuário */}
      <View style={styles.header}>
        <Text style={styles.brandName}>JEMI</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{avatarLetter}</Text>
        </View>
        <Text style={styles.userName}>{user?.name || 'Usuário'}</Text>
        <Text style={styles.userEmail}>{user?.email || ''}</Text>
      </View>

      {/* Itens do menu */}
      <DrawerContentScrollView
        style={styles.menuList}
        scrollEnabled={false}
      >
        {MENU_ITEMS.map(({ name, label, icon }) => {
          const isActive = activeRouteName === name;
          const badge = getBadgeCount(name);
          return (
            <TouchableOpacity
              key={name}
              style={[styles.menuItem, isActive && styles.menuItemActive]}
              onPress={() => navigation.navigate(name)}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>{icon}</Text>
              <Text style={[styles.menuText, isActive && styles.menuTextActive]}>
                {label}
              </Text>
              {badge > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{badge}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </DrawerContentScrollView>

      {/* Rodapé com botão de sair */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={{ fontSize: 20 }}>🚪</Text>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
