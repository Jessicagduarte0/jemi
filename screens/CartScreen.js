import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useAppContext } from '../context/AppContext';
import colors from '../constants/colors';

// Componente de item do carrinho (componentização)
const CartItem = ({ item, onRemove }) => {
  // Desestruturação do item do carrinho
  const { name, price, image, size, quantity } = item;

  const itemTotal = (price * quantity).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName} numberOfLines={1}>{name}</Text>
        <Text style={styles.itemSize}>Tamanho: {size}</Text>
        <Text style={styles.itemPrice}>{itemTotal}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeBtn}
        onPress={onRemove}
        activeOpacity={0.7}
      >
        <Text style={styles.removeIcon}>🗑</Text>
      </TouchableOpacity>
    </View>
  );
};

// Tela do Carrinho de Compras
const CartScreen = ({ navigation }) => {
  // Desestruturação do contexto
  const { cart, removeFromCart, cartTotal, clearCart } = useAppContext();

  const formattedTotal = cartTotal.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const handleFinalize = () => {
    Alert.alert(
      'Pedido Finalizado! 🎉',
      `Total: ${formattedTotal}\n\nObrigada pela sua compra!`,
      [{ text: 'OK', onPress: () => clearCart() }]
    );
  };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>Carrinho vazio</Text>
        <Text style={styles.emptySubtitle}>Adicione produtos para continuar.</Text>
        <TouchableOpacity
          style={styles.shopBtn}
          onPress={() => navigation.navigate('Catalogo')}
        >
          <Text style={styles.shopBtnText}>Ver Catálogo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Lista de itens do carrinho */}
      <FlatList
        data={cart}
        keyExtractor={({ id, size }) => `${id}-${size}`}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={() => removeFromCart(item.id, item.size)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Rodapé com total e botão */}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formattedTotal}</Text>
        </View>
        <TouchableOpacity
          style={styles.finalizeBtn}
          onPress={handleFinalize}
          activeOpacity={0.85}
        >
          <Text style={styles.finalizeBtnText}>Finalizar Pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  listContent: { padding: 16 },

  // Item do carrinho
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemImage: {
    width: 72,
    height: 72,
    borderRadius: 8,
    resizeMode: 'cover',
    backgroundColor: colors.card,
  },
  itemInfo: { flex: 1, marginLeft: 12 },
  itemName: { fontSize: 15, fontWeight: '600', color: colors.text, marginBottom: 2 },
  itemSize: { fontSize: 12, color: colors.textSecondary, marginBottom: 4 },
  itemPrice: { fontSize: 15, fontWeight: '700', color: colors.primary },
  removeBtn: { padding: 8 },
  removeIcon: { fontSize: 20 },

  // Rodapé
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  totalLabel: { fontSize: 16, color: colors.textSecondary, fontWeight: '500' },
  totalValue: { fontSize: 22, fontWeight: '800', color: colors.primary },
  finalizeBtn: {
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finalizeBtnText: { color: colors.white, fontSize: 16, fontWeight: '700' },

  // Estado vazio
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: colors.textSecondary, marginBottom: 24 },
  shopBtn: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  shopBtnText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});

export default CartScreen;
