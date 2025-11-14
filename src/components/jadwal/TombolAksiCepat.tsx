// src/components/jadwal/TombolAksiCepat.tsx
import React, { useRef } from 'react'; // <-- Impor useRef
import { 
  Text, 
  StyleSheet, 
  Pressable, // <-- Ganti TouchableOpacity
  Animated // <-- Impor Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

type TombolAksiProps = {
  title: string;
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  bgColor: string;
  iconColor: string;
  onPress?: () => void;
};

const TombolAksiCepat = ({ title, iconName, bgColor, iconColor, onPress}: TombolAksiProps) => {
  // --- AWAL PERUBAHAN: Animasi Skala ---
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    // Tombol mengecil saat ditekan
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true, // Performa lebih baik
    }).start();
  };

  const onPressOut = () => {
    // Tombol kembali ke ukuran normal
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4, // Efek sedikit memantul
      tension: 40,
      useNativeDriver: true,
    }).start();
  };
  // --- AKHIR PERUBAHAN ---

  return (
    // --- GANTI <TouchableOpacity> DENGAN <Pressable> & <Animated.View> ---
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      disabled={!onPress}
      style={styles.pressableContainer}
    >
      <Animated.View style={[
        styles.container, 
        { backgroundColor: bgColor },
        { transform: [{ scale: scaleAnim }] } // Terapkan animasi skala
      ]}>
        <Ionicons name={iconName} size={24} color={iconColor} />
        <Text style={[styles.title, { color: iconColor }]}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  container: {
    // Hapus 'flex: 1' dan 'marginHorizontal' dari sini
    aspectRatio: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    padding: 10,
  },
  title: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default TombolAksiCepat;