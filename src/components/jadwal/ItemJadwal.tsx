// src/components/jadwal/ItemJadwal.tsx

import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  TouchableOpacity 
} from 'react-native';
import { COLORS } from '../../constants/colors';

// --- AWAL PERBAIKAN: Kode Lengkap untuk Komponen Internal ---

// Komponen ProgressBar (Kode Lengkap)
type ProgressBarProps = {
  progress: number;
};

const ProgressBar = ({ progress }: ProgressBarProps) => (
  <View style={styles.progressContainer}>
    <View style={[styles.progressBar, { width: `${progress}%` }]} />
  </View>
);

// Komponen StatusBadge (Kode Lengkap)
type StatusBadgeProps = {
  status: string;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const isSelesai = status === 'Selesai';
  const backgroundColor = isSelesai ? COLORS.bgJadwal : COLORS.bgTugas;
  const color = isSelesai ? COLORS.selesai : COLORS.progress;

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.badgeText, { color }]}>{status}</Text>
    </View>
  );
};
// --- AKHIR PERBAIKAN ---

// Tipe untuk props ItemJadwal (termasuk index untuk animasi)
type ItemJadwalProps = {
  title: string;
  deadline: string;
  status: string;
  progress: number;
  index: number; 
};

const ItemJadwal = ({ title, deadline, status, progress, index }: ItemJadwalProps) => {
  
  // Animasi Load-in (dari langkah sebelumnya)
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  const slideAnim = useRef(new Animated.Value(20)).current; 

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 100, 
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 100, 
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, slideAnim, index]);
  
  return (
    <Animated.View 
      style={{ 
        opacity: fadeAnim, 
        transform: [{ translateY: slideAnim }] 
      }}
    >
      <TouchableOpacity 
        style={styles.container}
        activeOpacity={0.7} 
        onPress={() => console.log('Membuka detail untuk:', title)}
      >
        <View style={styles.row}>
          <Text style={styles.title}>{title}</Text>
          {/* Sekarang ini akan berfungsi */}
          <StatusBadge status={status} />
        </View>
        <Text style={styles.deadline}>Deadline: {deadline}</Text>
        <View style={styles.row}>
          {/* Ini juga akan berfungsi */}
          <ProgressBar progress={progress} />
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
  },
  deadline: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginBottom: 12,
  },
  progressContainer: {
    height: 8,
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 4,
    marginRight: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.progressBar,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 10,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ItemJadwal;