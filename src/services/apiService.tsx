// src/services/apiService.ts
import axios from 'axios';
import { ImageSourcePropType } from 'react-native';

//URL MOCKAPI 
const API_BASE_URL = 'https://6902d593b208b24affe75fdf.mockapi.io/JadwalKuliah';

// --- PERBAIKAN: Definisikan tipe data dari API Anda ---
/**export interface UserSummary {
  id: string;
  name: string;
  avatar: string;
  tugasSelesai: number;
  tugasProgress: number;
}*/

export interface Tugas {
  id: string;
  title: string;
  deadline: string;
  status: string;
  progress: number;
}

export interface UserSummary {
  id: string;
  name: string;
  avatar: ImageSourcePropType;
  tugasSelesai: number;
  tugasProgress: number;
}

// INTERFACE MATAKULIAH ---
export interface MataKuliah {
  id: string;
  namaMK: string;
  dosen: string;
  hari: string; 
  waktu: string;
  ruangan: string;
  status: string;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// PERBAIKAN: Menambahkan tipe data 'Promise<Tugas[]>'
export const getTugasTerbaru = async (): Promise<Tugas[]> => {
  try {
    const response = await apiClient.get('/tugas');
    return response.data; 
  } catch (error) {
    console.error('Error fetching tugas terbaru:', error);
    throw error;
  }
};

// PERBAIKAN: Menambahkan tipe data 'Promise<UserSummary>'
/**export const getUserSummary = async (userId: number = 1): Promise<UserSummary> => {
  try {
    const response = await apiClient.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user summary:', error);
    throw error;
  }
};*/

// --- TAMBAHKAN FUNGSI getMataKuliah (DARI LANGKAH SEBELUMNYA) ---
export const getMataKuliah = async (): Promise<MataKuliah[]> => {
  try {
    const response = await apiClient.get('/matakuliah');
    return response.data;
  } catch (error) {
    console.error('Error fetching mata kuliah:', error);
    throw error;
  }
};