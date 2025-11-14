// src/screens/SemuaMataKuliahScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView, // <-- GANTI FlatList dengan ScrollView
  ActivityIndicator,
  Text,
  SafeAreaView // Kita tetap pakai SafeAreaView untuk padding
} from 'react-native';
import { COLORS } from '../constants/colors';
import { getMataKuliah, MataKuliah } from '../services/apiService';
import JadwalCard from '../components/jadwal/JadwalCard';

const SemuaMataKuliahScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [matakuliah, setMataKuliah] = useState<MataKuliah[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const data = await getMataKuliah();
        setMataKuliah(data);
      } catch (err) {
        setError('Gagal memuat daftar mata kuliah.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // --- PERBAIKAN UTAMA DI SINI ---
  return (
    // 1. Gunakan SafeAreaView sebagai pembungkus
    <SafeAreaView style={styles.container}>
      {/* 2. Gunakan ScrollView untuk membungkus konten */}
      <ScrollView contentContainerStyle={styles.list}>
        {matakuliah.length > 0 ? (
          // 3. Gunakan .map() untuk me-render daftar
          matakuliah.map((item) => (
            <JadwalCard key={item.id} item={item} />
          ))
        ) : (
          // Tampilkan pesan 'empty' jika tidak ada data
          <View style={styles.centeredEmpty}>
            <Text style={styles.emptyText}>Tidak ada mata kuliah ditemukan.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
  // --- AKHIR PERBAIKAN ---
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // 'flex: 1' di sini SANGAT PENTING
    backgroundColor: COLORS.background,
  },
  list: {
    padding: 20,
    paddingBottom: 40, // Padding di bawah agar tidak terpotong
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  centeredEmpty: {
    paddingTop: 100,
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textMuted,
  },
});

export default SemuaMataKuliahScreen;