# 🎯 JSON Editor - Data Publikasi MTE USK

Aplikasi web sederhana untuk mengedit file JSON data publikasi MTE USK dengan antarmuka yang user-friendly. Aplikasi ini secara otomatis mendeteksi struktur JSON dan membuat form editing yang sesuai.

## ✨ Fitur Utama

### 🔧 **Auto Form Detection**
- Deteksi otomatis struktur JSON
- Generate form input sesuai tipe data
- Support untuk text, textarea, number, dan URL fields
- Handle object dengan link (judul dengan URL)

### 📝 **Editor Features**
- **Drag & Drop**: Upload file JSON dengan drag and drop
- **Real-time Editing**: Edit data langsung tanpa reload
- **Data Validation**: Validasi otomatis untuk field kosong
- **Auto Numbering**: Penomoran otomatis untuk publikasi
- **Add/Delete**: Tambah dan hapus publikasi dengan mudah

### 💾 **Save & Export**
- **Auto Backup**: Backup otomatis di browser storage
- **Download JSON**: Download file JSON yang sudah diedit
- **Preview Mode**: Preview JSON sebelum save
- **Copy to Clipboard**: Copy JSON ke clipboard

### 🎨 **User Interface**
- **Responsive Design**: Tampilan optimal di desktop dan mobile
- **Bootstrap 5**: UI modern dan profesional
- **Status Indicators**: Indikator visual untuk status file
- **Progress Tracking**: Track perubahan dan status save

## 📁 Struktur File

```
json-editor/
├── index.html              # Main HTML file
├── script.js               # JavaScript logic
├── config.js               # Configuration file
├── server.py               # Python HTTP server
├── run.bat                 # Windows startup script
├── run.sh                  # Linux/Mac startup script
├── test.html               # Test suite
├── downloads/              # Directory untuk file yang disimpan
├── JSON_EDITOR_README.md   # Dokumentasi lengkap
└── QUICK_START.md          # Panduan cepat
```

## 🚀 Cara Menjalankan

### **Windows**
```bash
# Double-click atau jalankan di Command Prompt
run.bat
```

### **Linux/Mac**
```bash
# Beri permission dan jalankan
chmod +x run.sh
./run.sh

# Atau manual
python3 server.py
```

### **Manual (Semua OS)**
```bash
# Pastikan Python terinstall
python --version

# Jalankan server
python server.py

# Buka browser ke http://localhost:8000
```

## 📖 Cara Penggunaan

### 1. **Load atau Buat File JSON**
- **Upload File**: Drag & drop file JSON ke area upload atau klik untuk browse
- **Buat Baru**: Klik "Buat JSON Baru" untuk membuat struktur kosong
- **Load Backup**: Sistem akan menanyakan jika ada backup sebelumnya

### 2. **Edit Data**
- Form akan ter-generate otomatis sesuai struktur JSON
- Edit field yang diinginkan
- Perubahan tersimpan otomatis

### 3. **Manage Publikasi**
- **Tambah**: Klik "Tambah Publikasi" untuk entry baru
- **Hapus**: Klik tombol "Hapus" di setiap publikasi
- **Edit**: Langsung edit di form yang tersedia

### 4. **Validasi & Save**
- **Validasi**: Klik "Validasi Data" untuk cek error
- **Preview**: Klik "Preview JSON" untuk lihat hasil
- **Save**: Klik "Save" untuk backup di browser
- **Download**: Klik "Download" untuk unduh file

## 🔧 Fitur Teknis

### **Auto Form Detection**
```javascript
// Deteksi tipe field otomatis
if (header === 'No') {
    // Generate number input
} else if (header === 'Judul') {
    // Generate textarea + optional link field
} else if (typeof value === 'object') {
    // Handle object dengan text dan link
} else {
    // Generate textarea untuk text panjang
}
```

### **Data Structure Support**
```json
// Support untuk berbagai format
{
  "simple_field": "text value",
  "object_field": {
    "text": "Display text",
    "link": "https://example.com"
  },
  "array_field": ["item1", "item2"]
}
```

### **Real-time Updates**
- Perubahan langsung update ke memory
- Status indicator menunjukkan perubahan
- Auto backup setiap perubahan

## 🎨 Customization

### **Styling**
```css
/* Custom CSS dapat ditambahkan di index.html */
.publication-item {
    /* Style untuk setiap publikasi */
}

.editor-card {
    /* Style untuk main container */
}
```

### **Field Types**
```javascript
// Tambah tipe field baru di script.js
if (header === 'Custom_Field') {
    // Custom field handling
}
```

## 🔒 Keamanan

- **Client-side Only**: Semua editing dilakukan di browser
- **No Server Storage**: Data tidak disimpan di server
- **Local Backup**: Backup hanya di browser storage
- **CORS Enabled**: Support untuk cross-origin requests

## 🐛 Troubleshooting

### **Port Already in Use**
```bash
# Server otomatis cari port alternatif
# Port yang dicoba: 8000, 8001, 8080, 3000, 5000
```

### **File Not Loading**
- Pastikan file JSON valid
- Check console browser untuk error
- Pastikan file ada di folder `data-penelitian/`

### **Form Not Generating**
- Check struktur JSON sesuai format yang didukung
- Pastikan ada field `tables[0].rows` dan `tables[0].headers`

### **Save Issues**
- Check browser storage tidak penuh
- Pastikan JavaScript enabled
- Try download sebagai alternatif

## 📊 Supported JSON Format

```json
{
  "source": "Website MTE USK",
  "url": "https://mte.usk.ac.id/publikasi/2024-2/",
  "extractedAt": "2025-06-24T03:48:42.135Z",
  "year": "2024",
  "tablesCount": 1,
  "tables": [
    {
      "tableIndex": 1,
      "headers": ["No", "Nama Penulis", "Judul", "Keterangan"],
      "rows": [
        [
          "1",
          "Author Name",
          "Publication Title",
          "Journal/Conference Info"
        ]
      ]
    }
  ]
}
```

## 🔄 Updates & Maintenance

### **Auto Backup**
- Backup otomatis setiap perubahan
- Restore backup saat reload page
- Clear backup dengan clear browser storage

### **Version Control**
- Timestamp otomatis di `extractedAt`
- Track perubahan dengan status indicator
- Download untuk version control manual

## 📞 Support

Jika mengalami masalah:
1. Check console browser (F12)
2. Pastikan Python terinstall
3. Check file permissions
4. Restart server jika perlu

---

**Dibuat untuk**: Program Studi Magister Teknik Elektro USK
**Dikembangkan oleh**: KingSyah
**Versi**: 2.0
**Tanggal**: Juni 2025
**Copyright**: © 2025 KingSyah. All rights reserved.
**Lisensi**: Academic Use - MTE USK
