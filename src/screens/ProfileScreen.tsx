// src/screens/ProfileScreen.tsx
import React, { useState } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  Text, 
  View, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { COLORS } from '../constants/colors';
import { UserSummary } from '../services/apiService';
import { Ionicons } from '@expo/vector-icons';
import UserAvatar from '../assets/images/nusput.jpg';

// 1. Definisikan data TANPA gambar di luar
const STATIC_USER_DATA = {
  id: '1',
  name: 'Rizzi', // Ganti nama Anda
  tugasSelesai: 24,
  tugasProgress: 8
};

const ProfileScreen = () => {

  // --- INI PERBAIKAN UTAMA ---
  // 2. Pastikan HANYA ADA SATU 'useState' untuk 'user'.
  const [user] = useState<UserSummary>(() => {
    // 3. Panggil 'require()' DI DALAM sini (Lazy Init)
    return {
      ...STATIC_USER_DATA, // <-- Gabungkan data statis
      avatar: UserAvatar
    };
  });
  // --- AKHIR PERBAIKAN ---

  // ... (sisa kode render Anda)
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
      </View>
      
      <View style={styles.content}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>mahasiswa@kampus.ac.id</Text>

        {/* ... (sisa UI Anda) ... */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statCount}>{user.tugasSelesai}</Text>
            <Text style={styles.statLabel}>Tugas Selesai</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statCount}>{user.tugasProgress}</Text>
            <Text style={styles.statLabel}>Dalam Progress</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.iconLaporan} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// ... (Salin semua styles Anda)
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.textPrimary },
  content: { flex: 1, alignItems: 'center', padding: 20 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 20,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  name: { fontSize: 22, fontWeight: 'bold', color: COLORS.textPrimary },
  email: { fontSize: 16, color: COLORS.textMuted, marginBottom: 30 },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statBox: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: '45%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statCount: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary },
  statLabel: { fontSize: 14, color: COLORS.textMuted },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.bgLaporan,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: COLORS.iconLaporan, // Ubah agar sesuai dengan ikon
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});


export default ProfileScreen;