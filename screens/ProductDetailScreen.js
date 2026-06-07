import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { useAppContext } from '../context/AppContext';
import colors from '../constants/colors';

const { width } = Dimensions.get('window');

// Tela de Detalhe do Produto
// Recebe o produto via parâmetros de navegação (passagem de parâmetros)
const ProductDetailScreen = ({ route, navigation }) => {
  // Desestruturação dos parâmetros de rota (comunicação indireta)
  const { product } = route.params;
  const { id, name, price, category, description, image, sizes } = product;

  const { addToCart, toggleFavorite, isFavorite } = useAppContext();

  const [selectedSize, setSelectedSize] = useState(null);
  const favorited = isFavorite(id);

  const formattedPrice = price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const handleAddToCart = () => {
    if (!selectedSize) {
      Alert.alert('Atenção', 'Selecione um tamanho antes de adicionar ao carrinho.');
      return;
    }
    // Passagem de parâmetros direta: produto + tamanho
    addToCart(product, selectedSize);
    Alert.alert('✓ Adicionado!', `${name} (Tam. ${selectedSize}) foi adicionado ao carrinho.`, [
      { text: 'Continuar', style: 'cancel' },
      { text: 'Ver Carrinho', onPress: () => navigation.navigate('Main', { screen: 'Carrinho' }) },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header customizado */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes</Text>
        <TouchableOpacity onPress={() => toggleFavorite(id)}>
          <Text style={{ fontSize: 22, color: favorited ? colors.favorite : colors.textLight }}>
            {favorited ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Imagem do produto */}
        <Image source={{ uri: image }} style={styles.image} />

        <View style={styles.details}>
          {/* Nome e categoria */}
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>{formattedPrice}</Text>

          {/* Descrição */}
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{description}</Text>

          {/* Seletor de tamanho */}
          <Text style={styles.sectionTitle}>Tamanho</Text>
          <View style={styles.sizesRow}>
            {sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <TouchableOpacity
                  key={size}
                  style={[styles.sizeBtn, isSelected && styles.sizeBtnActive]}
                  onPress={() => setSelectedSize(size)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.sizeBtnText, isSelected && styles.sizeBtnTextActive]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Botão Adicionar ao Carrinho */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.btnCart}
          onPress={handleAddToCart}
          activeOpacity={0.85}
        >
          <Text style={styles.btnCartText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backBtn: { padding: 4 },
  backIcon: { fontSize: 22, color: colors.text },
  headerTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  image: {
    width,
    height: width * 1.1,
    resizeMode: 'cover',
    backgroundColor: colors.card,
  },
  details: { padding: 20 },
  category: { fontSize: 12, color: colors.textSecondary, marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 },
  name: { fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: 8 },
  price: { fontSize: 24, fontWeight: '800', color: colors.primary, marginBottom: 20 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 10 },
  description: { fontSize: 14, color: colors.textSecondary, lineHeight: 22, marginBottom: 20 },
  sizesRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', marginBottom: 20 },
  sizeBtn: {
    minWidth: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  sizeBtnActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  sizeBtnText: { fontSize: 14, fontWeight: '600', color: colors.text },
  sizeBtnTextActive: { color: colors.white },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  btnCart: {
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCartText: { color: colors.white, fontSize: 16, fontWeight: '700' },
});

export default ProductDetailScreen;
