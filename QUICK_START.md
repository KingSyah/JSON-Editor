# 🚀 Quick Start - JSON Editor

## 📋 Langkah Cepat Memulai

### 1. **Jalankan Aplikasi**
```bash
# Windows
run.bat

# Linux/Mac
./run.sh

# Manual
python server.py
```

### 2. **Buka Browser**
- Otomatis terbuka di: `http://localhost:8000`
- Atau buka manual jika tidak otomatis

### 3. **Load atau Buat File JSON**
**Pilihan A - Upload File:**
- Drag & drop file JSON ke area upload
- Atau klik area upload untuk browse file
- Gunakan `sample.json` untuk testing

**Pilihan B - Buat Baru:**
- Klik "Buat JSON Baru" untuk struktur kosong
- Mulai dengan 1 publikasi kosong
- Tambah publikasi sesuai kebutuhan

### 4. **Edit Data**
- Form akan muncul otomatis
- Edit field yang diinginkan
- Perubahan tersimpan real-time

### 5. **Kelola Publikasi**
- **Tambah**: Klik "Tambah Publikasi"
- **Hapus**: Klik tombol "Hapus" di publikasi
- **Cari**: Gunakan search box untuk filter

### 6. **Save & Export**
- **Save**: Backup di browser
- **Download JSON**: Unduh file JSON
- **Export CSV**: Unduh sebagai CSV
- **Preview**: Lihat JSON sebelum save

## 🎯 Tips Penggunaan

### **Search & Filter**
- Ketik di search box untuk filter publikasi
- Search berdasarkan judul, penulis, atau keterangan
- Real-time filtering saat mengetik

### **Form Fields**
- **No**: Input number untuk nomor urut
- **Nama Penulis**: Textarea untuk multiple authors
- **Judul**: Textarea + optional link field
- **Keterangan**: Textarea untuk info jurnal/konferensi

### **Data Validation**
- Klik "Validasi Data" untuk check error
- Field kosong akan ditandai sebagai error
- Statistik menampilkan jumlah publikasi

### **Backup & Recovery**
- Auto backup setiap perubahan
- Backup tersimpan di browser storage
- Reload page akan restore backup otomatis

## ⚡ Keyboard Shortcuts

- **Ctrl+S**: Save data (jika focus di form)
- **Ctrl+F**: Focus ke search box
- **Tab**: Navigate antar field
- **Enter**: Submit form field

## 🔧 Troubleshooting Cepat

### **File Tidak Load**
1. Check file JSON valid
2. Pastikan struktur sesuai format
3. Lihat console browser (F12)

### **Form Tidak Muncul**
1. Refresh browser
2. Check JavaScript enabled
3. Clear browser cache

### **Save Gagal**
1. Try download sebagai alternatif
2. Check browser storage tidak penuh
3. Copy JSON dari preview

### **Server Error**
1. Restart server (Ctrl+C, lalu run lagi)
2. Check port tidak digunakan aplikasi lain
3. Pastikan Python terinstall

## 📊 Format Data yang Didukung

```json
{
  "year": "2024",
  "tables": [
    {
      "headers": ["No", "Nama Penulis", "Judul", "Keterangan"],
      "rows": [
        ["1", "Author", "Title", "Journal"]
      ]
    }
  ]
}
```

## 🎨 Fitur Unggulan

- ✅ **Auto Form Generation**: Deteksi struktur JSON otomatis
- ✅ **Real-time Search**: Filter publikasi instant
- ✅ **Drag & Drop**: Upload file mudah
- ✅ **Multiple Export**: JSON dan CSV
- ✅ **Data Validation**: Check error otomatis
- ✅ **Auto Backup**: Tidak kehilangan data
- ✅ **Responsive**: Works di mobile dan desktop

## 📞 Bantuan Cepat

**Masalah Umum:**
- Port 8000 used → Server cari port alternatif otomatis
- File tidak valid → Check format JSON
- Form kosong → Reload dan coba lagi

**Console Browser (F12):**
- Lihat error JavaScript
- Check network requests
- Debug loading issues

---

**Ready to edit? Start dengan sample.json untuk testing! 🎉**

---

**© 2025 KingSyah** - JSON Editor for MTE USK Publications
*Developed with ❤️ for Program Studi Magister Teknik Elektro USK*
