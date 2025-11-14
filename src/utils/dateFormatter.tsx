// src/utils/dateFormatter.ts

// Fungsi ini mengubah string ISO (dari API) menjadi format 'YYYY-MM-DD'
export const formatToYYYYMMDD = (isoDateString: string): string => {
  try {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    // getMonth() dimulai dari 0 (Jan=0), jadi +1
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (e) {
    console.error('Error formatting date:', isoDateString, e);
    return ''; // Mengembalikan string kosong jika formatnya salah
  }
};

// Fungsi ini mengubah string ISO menjadi format '15 Des 2024' (untuk UI)
export const formatToReadableDate = (isoDateString: string): string => {
    try {
      const date = new Date(isoDateString);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch (e) {
        return isoDateString; // Kembalikan string asli jika gagal
    }
};