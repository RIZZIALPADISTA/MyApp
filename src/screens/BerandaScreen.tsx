// src/screens/BerandaScreen.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  ActivityIndicator,
  SafeAreaView // Pastikan ini diimpor
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../navigation/types';
import { COLORS } from '../constants/colors';
import { getTugasTerbaru, Tugas, UserSummary } from '../services/apiService';
import { formatToReadableDate } from '../utils/dateFormatter';
import UserAvatar from '../assets/images/nusput.jpg';

// Impor komponen
import HeaderBeranda from '../components/layout/HeaderBeranda';
import KartuRingkasan from '../components/layout/KartuRingkasan';
import TombolAksiCepat from '../components/jadwal/TombolAksiCepat';
import ItemJadwal from '../components/jadwal/ItemJadwal';

// 1. Definisikan data TANPA gambar di luar
const STATIC_USER_DATA = {
  id: '1',
  name: 'Rizzi', // Ganti nama Anda
  tugasSelesai: 24,
  tugasProgress: 8
};

const BerandaScreen = () => {
  
  // --- INI PERBAIKAN UTAMA ---
  // 2. HAPUS semua 'useState<UserSummary>(...)' yang duplikat.
  // 3. Pastikan HANYA ADA SATU 'useState' untuk 'user'.
  const [user, setUser] = useState<UserSummary>(() => {
    // 4. Panggil 'require()' DI DALAM sini (Lazy Init)
    return {
      ...STATIC_USER_DATA, // <-- Gabungkan data statis
      avatar: UserAvatar// <-- Tambahkan avatar
    };
  });
  // --- AKHIR PERBAIKAN ---

  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tugas, setTugas] = useState<Tugas[]>([]);
  
  const navigation = useNavigation<AppNavigationProp>();

  // ... (fungsi loadData dan useEffect Anda) ...
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const tugasData = await getTugasTerbaru();
        setTugas(tugasData);
      } catch (err) {
        setError('Gagal memuat data.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // ... (sisa kode render Anda, pastikan sudah benar)
  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBeranda userName={user.name} avatar={user.avatar} />
      <ScrollView style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          {/* ... (kode search bar) ... */}
        </View>

        {/* Ringkasan */}
        <View style={styles.ringkasanContainer}>
          <KartuRingkasan
            title="Tugas Selesai"
            count={user.tugasSelesai}
            iconName="checkmark-done"
            backgroundColor={COLORS.cardBlue}
          />
          <KartuRingkasan
            title="Dalam Progress"
            count={user.tugasProgress}
            iconName="time"
            backgroundColor={COLORS.cardOrange}
          />
        </View>

        {/* Aksi Cepat */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aksi Cepat</Text>
          <View style={styles.aksiContainer}>
            <TombolAksiCepat title="Tugas Baru" iconName="add" bgColor={COLORS.bgTugas} iconColor={COLORS.iconTugas} onPress={() => console.log('Tugas Baru')} />
            <TombolAksiCepat title="Mata Kuliah" iconName="book" bgColor={COLORS.bgJadwal} iconColor={COLORS.iconJadwal} onPress={() => navigation.navigate('SemuaMataKuliah')} />
            <TombolAksiCepat title="Materi" iconName="book" bgColor={COLORS.bgMateri} iconColor={COLORS.iconMateri} onPress={() => console.log('Materi')} />
            <TombolAksiCepat title="Laporan" iconName="document-text" bgColor={COLORS.bgLaporan} iconColor={COLORS.iconLaporan} onPress={() => console.log('Laporan')} />
          </View>
        </View>

        {/* Tugas Terbaru */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tugas Terbaru</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            tugas.map((item, index) => (
              <ItemJadwal
                key={item.id}
                index={index}
                title={item.title}
                deadline={formatToReadableDate(item.deadline)} 
                status={item.status}
                progress={item.progress}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ... (Salin semua styles Anda)
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, paddingHorizontal: 20 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: { marginRight: 10 },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  ringkasanContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 15,
  },
  aksiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: { textAlign: 'center', color: 'red' }
});


export default BerandaScreen;