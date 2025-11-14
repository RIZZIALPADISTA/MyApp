// src/navigation/types.ts
import { StackNavigationProp } from '@react-navigation/stack';
// --- 1. Impor tipe ini ---
import { NavigatorScreenParams } from '@react-navigation/native';

// --- 2. Buat tipe baru untuk Tab Navigator Anda ---
// Ini mendefinisikan layar-layar di dalam Tab Bawah
export type MainTabParamList = {
  Beranda: undefined;
  Tugas: undefined;
  Kalender: undefined;
  Profile: undefined;
};

// --- 3. Perbarui tipe AppStackParamList ---
export type AppStackParamList = {
  // Ganti 'undefined' dengan tipe baru ini:
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  MataKuliah: { dateString: string };
  DetailTugas: { tugasId: string };
  SemuaMataKuliah: undefined; // Layar untuk daftar mata kuliah lengkap
};

// Tipe ini (AppNavigationProp) tetap sama
export type AppNavigationProp = StackNavigationProp<AppStackParamList>;