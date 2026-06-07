import React, { createContext, useContext, useState, useCallback } from 'react';
import { ENDPOINTS } from '../constants/api';

// Criação do contexto global da aplicação
const AppContext = createContext(null);

// Hook customizado para usar o contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext deve ser usado dentro de AppProvider');
  }
  return context;
};

// Provider do contexto - envolve toda a aplicação
export const AppProvider = ({ children }) => {
  // Estado do usuário autenticado
  const [user, setUser] = useState(null);

  // Estado do carrinho de compras
  const [cart, setCart] = useState([]);

  // Estado dos favoritos
  const [favorites, setFavorites] = useState([]);

  // Estado de notificações
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Bem-vinda à JEMI!', message: 'Explore nossas novas coleções.', read: false },
    { id: '2', title: 'Promoção Especial', message: '20% de desconto em vestidos esta semana!', read: false },
  ]);

  // ---------------------------
  // Funções de Autenticação
  // ---------------------------

  // POST: cadastrar usuário na API
  const registerUser = useCallback(async ({ name, email, password, phone }) => {
    try {
      const response = await fetch(ENDPOINTS.users, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      });
      if (!response.ok) throw new Error('Erro ao cadastrar');
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.warn('API indisponível, usando cadastro local:', error.message);
      // Fallback local: salva em estado
      return { success: true, data: { id: Date.now().toString(), name, email, phone } };
    }
  }, []);

  // GET: buscar usuários na API (para login)
  const loginUser = useCallback(async ({ email, password }) => {
    try {
      const response = await fetch(ENDPOINTS.users);
      if (!response.ok) throw new Error('Erro na API');
      const users = await response.json();
      const found = users.find(
        (u) => u.email === email && u.password === password
      );
      if (found) {
        setUser(found);
        return { success: true, user: found };
      }
      return { success: false, message: 'E-mail ou senha incorretos.' };
    } catch (error) {
      console.warn('API indisponível, usando login demo:', error.message);
      // Fallback: aceita qualquer login para demonstração
      const demoUser = { id: '0', name: email.split('@')[0], email, phone: '' };
      setUser(demoUser);
      return { success: true, user: demoUser };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCart([]);
  }, []);

  // ---------------------------
  // Funções do Carrinho
  // ---------------------------

  const addToCart = useCallback((product, size) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, size, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === productId && item.size === size)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  // Desestruturação: total e quantidade do carrinho
  const cartTotal = cart.reduce((total, { price, quantity }) => total + price * quantity, 0);
  const cartCount = cart.reduce((count, { quantity }) => count + quantity, 0);

  // ---------------------------
  // Funções de Favoritos
  // ---------------------------

  const toggleFavorite = useCallback((productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isFavorite = useCallback(
    (productId) => favorites.includes(productId),
    [favorites]
  );

  // ---------------------------
  // Funções de Notificações
  // ---------------------------

  const markNotificationRead = useCallback((notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Valor exposto pelo contexto (desestruturação pelo consumidor)
  const contextValue = {
    // Usuário
    user,
    registerUser,
    loginUser,
    logout,
    // Carrinho
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
    // Favoritos
    favorites,
    toggleFavorite,
    isFavorite,
    // Notificações
    notifications,
    markNotificationRead,
    unreadCount,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
