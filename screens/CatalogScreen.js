import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FilterBar from '../components/FilterBar';
import ProductCard from '../components/ProductCard';
import PRODUCTS from '../constants/products';
import colors from '../constants/colors';

// Tela de Catálogo: busca + filtro com RNPicker (Picker) + FlatList
const CatalogScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');

  // Filtragem por categoria e busca (desestruturação de cada produto)
  const filteredProducts = PRODUCTS.filter(({ name, category: cat }) => {
    const matchCategory = category === 'Todos' || cat === category;
    const matchSearch = name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Renderiza cada card de produto (FlatList)
  const renderProduct = useCallback(
    ({ item }) => (
      <ProductCard
        product={item}
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
      />
    ),
    [navigation]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <View style={styles.container}>
      {/* Barra de busca */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar produto"
          placeholderTextColor={colors.textLight}
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
        />
        {!!search && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* FilterBar com RNPicker + abas (requisito do trabalho) */}
      <FilterBar selectedCategory={category} onCategoryChange={setCategory} />

      {/* Lista de produtos com FlatList (requisito do trabalho) */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={keyExtractor}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nenhum produto encontrado.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 14,
    height: 44,
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: colors.text },
  clearIcon: { fontSize: 16, color: colors.textLight, paddingLeft: 8 },
  listContent: { paddingHorizontal: 10, paddingBottom: 20 },
  empty: { flex: 1, alignItems: 'center', marginTop: 60 },
  emptyText: { color: colors.textSecondary, fontSize: 15 },
});

export default CatalogScreen;
