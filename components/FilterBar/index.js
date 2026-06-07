import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';

const CATEGORIES = ['Todos', 'Feminino', 'Masculino', 'Infantil'];

// Componente de filtro por categoria
// Usa RNPicker (Picker) com exibição visual de abas
// Recebe selectedCategory e onCategoryChange via desestruturação
const FilterBar = ({ selectedCategory, onCategoryChange }) => {
  return (
    <View style={styles.container}>
      {/* Filtro com Picker (RNPicker) conforme requisito */}
      <Text style={styles.pickerLabel}>Filtrar por categoria:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(value) => onCategoryChange(value)}
          style={styles.picker}
          mode="dropdown"
        >
          {CATEGORIES.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      {/* Abas visuais de categoria (complementar ao Picker) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 10 }}
        contentContainerStyle={styles.tabsContainer}
      >
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => onCategoryChange(cat)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FilterBar;
