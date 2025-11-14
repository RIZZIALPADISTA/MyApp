// src/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator'; 
import MataKuliahScreen from '../screens/MataKuliahScreen'; 
// --- IMPOR LAYAR BARU ---
import SemuaMataKuliahScreen from '../screens/SemuaMataKuliah';
// ---
import { AppStackParamList } from './types'; 

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#4A80F0' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator} 
        options={{ headerShown: false }} // Header utama disembunyikan
      />
      
      <Stack.Screen 
        name="MataKuliah" 
        component={MataKuliahScreen} 
        // Layar ini sudah memiliki header-nya sendiri (custom)
        options={{ headerShown: false }} 
      />

      {/* --- TAMBAHKAN LAYAR BARU INI --- */}
      <Stack.Screen 
        name="SemuaMataKuliah" 
        component={SemuaMataKuliahScreen} 
        options={{ 
          title: 'Semua Mata Kuliah', // Judul di header
        }} 
      />
      {/* --- AKHIR TAMBAHAN --- */}

    </Stack.Navigator>
  );
};

export default AppNavigator;