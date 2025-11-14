// src/components/jadwal/JadwalCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { MataKuliah } from '../../services/apiService';

type JadwalCardProps = {
  item: MataKuliah;
};

// Fungsi helper untuk mendapatkan warna status
const getStatusColors = (status: string) => {
  switch (status) {
    case 'Aktif':
      return { bg: '#E6F9F0', text: '#00875A', border: '#10B981' };
    case 'Segera':
      return { bg: '#FFF8E6', text: '#F97316', border: '#F59E0B' };
    case 'Nanti':
    default:
      return { bg: '#F4F7F9', text: '#888888', border: '#DFE1E6' };
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  const colors = getStatusColors(status);
  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.badgeText, { color: colors.text }]}>{status}</Text>
    </View>
  );
};

const InfoRow = ({ icon, text }: { icon: any; text: string }) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={16} color={COLORS.textMuted} style={styles.icon} />
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

const JadwalCard = ({ item }: JadwalCardProps) => {
  const colors = getStatusColors(item.status);

  return (
    <View style={[styles.container, { borderLeftColor: colors.border }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.namaMK}</Text>
        <StatusBadge status={item.status} />
      </View>
      <Text style={styles.ruangan}>{item.ruangan}</Text>
      
      <InfoRow icon="time-outline" text={item.waktu} />
      <InfoRow icon="person-outline" text={item.dosen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 10,
  },
  ruangan: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  icon: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default JadwalCard;