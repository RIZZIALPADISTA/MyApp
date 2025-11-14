import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, SafeAreaView, Text, View, ActivityIndicator } from 'react-native';
import { Calendar, LocaleConfig, DateData } from 'react-native-calendars';
import { COLORS } from '../constants/colors';
import { getTugasTerbaru, Tugas } from '../services/apiService';
import { formatToYYYYMMDD } from '../utils/dateFormatter';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '../navigation/types';

// Konfigurasi lokal untuk bahasa Indonesia (opsional tapi bagus)
LocaleConfig.locales['id'] = {
  monthNames: ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
  monthNamesShort: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'],
  dayNames: ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'],
  dayNamesShort: ['Min','Sen','Sel','Rab','Kam','Jum','Sab'],
};
LocaleConfig.defaultLocale = 'id';

const KalenderScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tugas, setTugas] = useState<Tugas[]>([]);
  const navigation = useNavigation<AppNavigationProp>();

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const data = await getTugasTerbaru();
        setTugas(data);
      } catch (err) {
        setError('Gagal memuat data kalender.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Gunakan useMemo untuk memproses data 'markedDates' hanya saat 'tugas' berubah
  const markedDates = useMemo(() => {
    const markers: { [key: string]: { marked: boolean, dotColor: string } } = {};

    tugas.forEach(item => {
      // Gunakan helper kita untuk mendapatkan format 'YYYY-MM-DD'
      const dateString = formatToYYYYMMDD(item.deadline);
      if (dateString) {
        markers[dateString] = {
          marked: true,
          dotColor: item.status === 'Selesai' ? COLORS.selesai : COLORS.progress,
        };
      }
    });
    return markers;
  }, [tugas]);

  const onDayPress = (day: DateData) => {
    // Pindah ke layar MataKuliah dan kirim tanggal yang diklik
    navigation.navigate('MataKuliah', { dateString: day.dateString });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kalender</Text>
      </View>
      
      {isLoading && (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.centered} />
      )}
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {!isLoading && !error && (
        <Calendar
          style={styles.calendar}
          // Tandai tanggal-tanggal dari state 'markedDates'
          markedDates={markedDates}
          onDayPress={onDayPress}
          theme={{
            calendarBackground: COLORS.white,
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: COLORS.primary,
            selectedDayTextColor: COLORS.white,
            todayTextColor: COLORS.primary,
            dayTextColor: COLORS.textPrimary,
            dotColor: COLORS.primary,
            selectedDotColor: COLORS.white,
            arrowColor: COLORS.primary,
            monthTextColor: COLORS.textPrimary,
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '500',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
        />
      )}
      <Text style={styles.infoText}>Klik sebuah tanggal untuk melihat jadwal kuliah.</Text>
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
  calendar: {
    margin: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  centered: {
    marginTop: 50,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 40,
    fontSize: 16,
  },
  infoText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: COLORS.textMuted,
    paddingHorizontal: 20,
  }
});

export default KalenderScreen;