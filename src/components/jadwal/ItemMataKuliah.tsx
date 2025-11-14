// src/components/jadwal/ItemMataKuliah.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { MataKuliah } from '../../services/apiService';

// Kita gunakan 'Omit' untuk mengecualikan 'id'
type ItemProps = {
  item: Omit<MataKuliah, 'id'>;
};

const InfoBaris = ({ icon, text }: { icon: any; text: string }) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={16} color={COLORS.textMuted} style={styles.icon} />
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

const ItemMataKuliah = ({ item }: ItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.namaMK}</Text>
      <InfoBaris icon="person-outline" text={item.dosen} />
      <InfoBaris icon="location-outline" text={item.ruangan} />
      
      <View style={styles.footer}>
        <InfoBaris icon="calendar-outline" text={item.hari} />
        <InfoBaris icon="time-outline" text={item.waktu} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 10,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ItemMataKuliah;