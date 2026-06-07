import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useAppContext } from '../context/AppContext';
import colors from '../constants/colors';

// Item de notificação (componentização inline)
const NotificationItem = ({ notification, onRead }) => {
  // Desestruturação do objeto de notificação
  const { id, title, message, read } = notification;
  return (
    <TouchableOpacity
      style={[styles.item, !read && styles.itemUnread]}
      onPress={() => onRead(id)}
      activeOpacity={0.8}
    >
      <View style={styles.iconWrapper}>
        <Text style={styles.icon}>{read ? '🔔' : '🔔'}</Text>
        {!read && <View style={styles.unreadDot} />}
      </View>
      <View style={styles.textWrapper}>
        <Text style={[styles.title, !read && styles.titleUnread]}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Tela de Notificações
const NotificationsScreen = () => {
  const { notifications, markNotificationRead } = useAppContext();

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <NotificationItem
            notification={item}
            onRead={markNotificationRead}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔕</Text>
            <Text style={styles.emptyText}>Nenhuma notificação.</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  listContent: { padding: 16 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemUnread: {
    backgroundColor: '#F0F4FF',
    borderColor: '#C5D3F0',
  },
  iconWrapper: { position: 'relative', marginRight: 14 },
  icon: { fontSize: 28 },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.error,
    borderWidth: 1.5,
    borderColor: colors.white,
  },
  textWrapper: { flex: 1 },
  title: { fontSize: 15, fontWeight: '500', color: colors.textSecondary, marginBottom: 4 },
  titleUnread: { fontWeight: '700', color: colors.text },
  message: { fontSize: 13, color: colors.textSecondary, lineHeight: 18 },
  empty: { alignItems: 'center', marginTop: 80 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyText: { color: colors.textSecondary, fontSize: 15 },
});

export default NotificationsScreen;
