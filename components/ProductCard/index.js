import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import styles from './styles';

// Componente de cartão de produto reutilizável
// Recebe props via desestruturação
const ProductCard = ({ product, onPress }) => {
  // Desestruturação direta das props do produto
  const { id, name, price, category, image } = product;

  // Consumindo contexto de favoritos
  const { toggleFavorite, isFavorite } = useAppContext();
  const favorited = isFavorite(id);

  const formattedPrice = price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: image }} style={styles.image} />
        <TouchableOpacity
          style={styles.favoriteBtn}
          onPress={() => toggleFavorite(id)}
          activeOpacity={0.8}
        >
          <Text style={{ fontSize: 16, color: favorited ? '#E53935' : '#CCCCCC' }}>
            {favorited ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.price}>{formattedPrice}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
