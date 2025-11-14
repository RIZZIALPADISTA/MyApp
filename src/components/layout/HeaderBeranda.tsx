// src/components/layout/HeaderBeranda.tsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ImageSourcePropType // <-- 1. Impor tipe ini
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

// 2. Definisikan tipe untuk props dengan benar
type HeaderProps = {
  userName: string;
  avatar: ImageSourcePropType; // <-- Tambahkan avatar
};

// 3. Terima 'userName' dan 'avatar' di sini
const HeaderBeranda = ({ userName, avatar }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.avatar}
          // 4. Ganti 'source' agar menggunakan prop 'avatar'
          // Hapus: source={{ uri: 'https://i.pravatar.cc/150?img=5' }}
          source={avatar} // <-- Gunakan prop ini
        />
        <View>
          <Text style={styles.greeting}>Selamat Pagi</Text>
          {/* 5. Ganti 'Text' agar menggunakan prop 'userName' */}
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={26} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    paddingTop: 20, 
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  greeting: {
    fontSize: 14,
    color: COLORS.textSecondary,
    opacity: 0.9,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default HeaderBeranda;