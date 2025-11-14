import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  FlatList, 
  Text, 
  View,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { COLORS } from '../constants/colors';
import { getTugasTerbaru, Tugas } from '../services/apiService';
import ItemJadwal from '../components/jadwal/ItemJadwal';
import { formatToReadableDate } from '../utils/dateFormatter';

const JadwalScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tugas, setTugas] = useState<Tugas[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setError(null);
      const data = await getTugasTerbaru(); // Mengambil semua tugas
      setTugas(data);
    } catch (err) {
      setError('Gagal memuat daftar tugas.');
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    loadData();
  };

  // Render konten utama
  const renderContent = () => {
    if (isLoading && !isRefreshing) {
      return <ActivityIndicator size="large" color={COLORS.primary} style={styles.centered} />;
    }
    
    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    if (tugas.length === 0) {
      return <Text style={styles.errorText}>Tidak ada tugas ditemukan.</Text>;
    }

// src/screens/JadwalScreen.tsx (Hanya cuplikan di bagian FlatList)

    // ... (kode lainnya)
    
    return (
      <FlatList
        data={tugas}
        keyExtractor={(item) => item.id}
        // --- PERUBAHAN DI SINI ---
        renderItem={({ item, index }) => ( // <-- DAPATKAN 'index' dari renderItem
          <ItemJadwal
            title={item.title}
            index={index} // <-- PASS 'index' prop
            deadline={formatToReadableDate(item.deadline)} 
            status={item.status}
            progress={item.progress}
          />
        )}
        // --- AKHIR PERUBAHAN ---
        style={styles.list}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    );
  };
  
  // ... (sisa kode)

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Semua Tugas</Text>
      </View>
      {renderContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 40,
    fontSize: 16,
  },
});

export default JadwalScreen;