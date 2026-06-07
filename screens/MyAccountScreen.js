import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAppContext } from '../context/AppContext';
import colors from '../constants/colors';

// Linha de informação do perfil (componente local)
const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value || '—'}</Text>
  </View>
);

// Tela Minha Conta
const MyAccountScreen = ({ navigation }) => {
  // Desestruturação do contexto
  const { user, logout, cartCount, favorites } = useAppContext();

  const handleLogout = () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => {
          logout();
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        },
      },
    ]);
  };

  // Primeira letra para avatar
  const avatarLetter = user?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <View style={styles.container}>
      {/* Avatar e nome */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{avatarLetter}</Text>
        </View>
        <Text style={styles.userName}>{user?.name || 'Usuário'}</Text>
        <Text style={styles.userEmail}>{user?.email || ''}</Text>
      </View>

      {/* Informações da conta */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Informações da Conta</Text>
        <InfoRow label="Nome" value={user?.name} />
        <InfoRow label="E-mail" value={user?.email} />
        <InfoRow label="Telefone" value={user?.phone} />
      </View>

      {/* Estatísticas */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{cartCount}</Text>
          <Text style={styles.statLabel}>No Carrinho</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{favorites.length}</Text>
          <Text style={styles.statLabel}>Favoritos</Text>
        </View>
      </View>

      {/* Botão sair */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>🚪  Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 20,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 28, fontWeight: '800', color: colors.white },
  userName: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: 4 },
  userEmail: { fontSize: 14, color: colors.textSecondary },

  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  cardTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 14 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  infoLabel: { fontSize: 14, color: colors.textSecondary },
  infoValue: { fontSize: 14, fontWeight: '500', color: colors.text },

  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: { fontSize: 28, fontWeight: '800', color: colors.primary },
  statLabel: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },

  logoutBtn: {
    height: 50,
    borderWidth: 1.5,
    borderColor: colors.error,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: { color: colors.error, fontSize: 15, fontWeight: '600' },
});

export default MyAccountScreen;
