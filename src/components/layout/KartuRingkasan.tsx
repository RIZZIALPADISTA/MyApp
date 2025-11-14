// src/components/layout/KartuRingkasan.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // <-- PERBAIKAN: Impor dari expo
import { COLORS } from '../../constants/colors';

// PERBAIKAN: Tipe untuk props
type KartuRingkasanProps = {
  title: string;
  count: string | number;
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  backgroundColor: string;
};

const KartuRingkasan = ({ title, count, iconName, backgroundColor }: KartuRingkasanProps) => {
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor }]}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>{count}</Text>
      </View>
      <View style={styles.iconWrapper}>
        <Ionicons name={iconName} size={20} color={backgroundColor} />
      </View>
    </TouchableOpacity>
  );
};

// ... (Styles tetap sama)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 14,
    color: COLORS.white,
    marginBottom: 5,
  },
  count: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default KartuRingkasan;