// src/screens/MataKuliahScreen.tsx
import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { COLORS } from '../constants/colors';
import { getMataKuliah, MataKuliah } from '../services/apiService';
import JadwalCard from '../components/jadwal/JadwalCard';
import { Ionicons } from '@expo/vector-icons';

import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../navigation/types';

// Tipe untuk route
type MataKuliahRouteProp = RouteProp<AppStackParamList, 'MataKuliah'>;

// --- FUNGSI HELPER YANG LEBIH AMAN ---
const getDayNameFromDateString = (dateString: string): string => {
  // Guard tambahan untuk memastikan dateString valid
  if (!dateString || typeof dateString !== 'string') {
    return "Error: Hari tidak valid";
  }
  try {
    const safeDateString = dateString.replace(/-/g, '/');
    const date = new Date(safeDateString);
    // Periksa apakah tanggalnya valid
    if (isNaN(date.getTime())) {
      return "Error: Tanggal tidak valid";
    }
    const dayName = date.toLocaleDateString('id-ID', { weekday: 'long' });
    return dayName;
  } catch (e) {
    console.error("Error parsing date: ", e);
    return "Error";
  }
};

const formatHeaderDate = (dateString: string): string => {
  if (!dateString || typeof dateString !== 'string') {
    return "Error: Tanggal tidak valid";
  }
  try {
    const safeDateString = dateString.replace(/-/g, '/');
    const date = new Date(safeDateString);
    if (isNaN(date.getTime())) {
      return "Error: Tanggal tidak valid";
    }
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (e) {
    return "Tanggal Error";
  }
};
// --- AKHIR FUNGSI HELPER ---


const MataKuliahScreen = () => {
  const route = useRoute<MataKuliahRouteProp>();
  const navigation = useNavigation();
  
  // 1. Dapatkan dateString dengan aman
  const dateString = route.params?.dateString;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allMataKuliah, setAllMataKuliah] = useState<MataKuliah[]>([]);

  useEffect(() => {
    if (dateString) {
      const loadData = async () => {
        try {
          setError(null);
          setIsLoading(true);
          const data = await getMataKuliah();
          setAllMataKuliah(data);
        } catch (err) {
          setError('Gagal memuat jadwal.');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      loadData();
    } else {
      setIsLoading(false);
    }
  }, [dateString]); 

  // 2. "Penjaga" (Guard Clause) tetap di paling ATAS
  if (!dateString) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: Tanggal tidak diterima.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonError}>
          <Text style={{color: COLORS.primary}}>Kembali</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 3. 'useMemo' sekarang aman karena 'dateString' 100% ada
  const selectedDayName = useMemo(() => getDayNameFromDateString(dateString), [dateString]);
  const formattedDate = useMemo(() => formatHeaderDate(dateString), [dateString]);

  const filteredJadwal = useMemo(() => {
    return allMataKuliah.filter(
      (item) => {
        // PERBAIKAN: Pastikan 'item.hari' adalah string sebelum memanggil .toLowerCase()
        return item.hari && 
               typeof item.hari === 'string' && 
               item.hari.toLowerCase() === selectedDayName.toLowerCase()
      }
    );
  }, [allMataKuliah, selectedDayName]);

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={COLORS.white} />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerTitle}>Jadwal Perkuliahan</Text>
        <Text style={styles.headerSubtitle}>{formattedDate}</Text>
      </View>
      <Ionicons name="notifications-outline" size={24} color={COLORS.white} style={styles.backButton} />
    </View>
  );

  // 4. Sisa render logic
  return (
    <SafeAreaView style={styles.safeArea}>
      {renderHeader()}
      
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayTitle}>Hari ini {selectedDayName}</Text>
            <View style={styles.classCountContainer}>
              <Text style={styles.classCount}>{filteredJadwal.length}</Text>
            </View>
          </View>

          <FlatList
            data={filteredJadwal}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <JadwalCard item={item} />}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              <View style={styles.centeredEmpty}>
                <Text style={styles.emptyText}>Tidak ada jadwal di hari ini.</Text>
              </View>
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

// ... (Salin semua styles Anda seperti sebelumnya)
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 16, color: COLORS.white, opacity: 0.8 },
  headerSubtitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.white },
  content: { flex: 1 },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  dayTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textPrimary },
  classCountContainer: {
    backgroundColor: COLORS.bgTugas,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  classCount: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary },
  list: { paddingHorizontal: 20 },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, 
  },
  centeredEmpty: {
    // Hapus 'flex: 1' agar tidak memenuhi layar
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50, 
  },
  errorText: { textAlign: 'center', color: 'red', fontSize: 16 },
  emptyText: { fontSize: 16, color: COLORS.textMuted, marginTop: 40 },
  backButtonError: { marginTop: 15, padding: 10 }
});

export default MataKuliahScreen;