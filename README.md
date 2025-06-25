# 📚 Data Publikasi Penelitian MTE USK

Repository ini berisi data publikasi penelitian dari Program Studi Magister Teknik Elektro (MTE) Universitas Syiah Kuala dalam format JSON yang telah divalidasi dan diperbaiki.

## 🎯 Tujuan

Menyediakan data publikasi penelitian MTE USK yang akurat dan terstruktur untuk keperluan:
- Sistem informasi akademik
- Website profil program studi
- Aplikasi pencarian publikasi
- Analisis bibliometrik
- Dashboard penelitian

## 📁 Struktur Data

```
data-penelitian/
├── 2024.json    # Publikasi tahun 2024
├── 2023.json    # Publikasi tahun 2023
├── 2022.json    # Publikasi tahun 2022
├── 2021.json    # Publikasi tahun 2021
├── 2020.json    # Publikasi tahun 2020
├── 2019.json    # Publikasi tahun 2019
├── 2018.json    # Publikasi tahun 2018
├── 2017.json    # Publikasi tahun 2017
├── 2016.json    # Publikasi tahun 2016
├── 2015.json    # Publikasi tahun 2015
├── 2014.json    # Publikasi tahun 2014
├── 2013.json    # Publikasi tahun 2013
├── 2012.json    # Publikasi tahun 2012
├── 2011.json    # Publikasi tahun 2011
└── 2010.json    # Publikasi tahun 2010
```

## 📊 Format Data JSON

Setiap file JSON memiliki struktur sebagai berikut:

```json
{
  "source": "Website MTE USK",
  "url": "https://mte.usk.ac.id/publikasi/YYYY-2/",
  "extractedAt": "2025-06-24T03:48:42.135Z",
  "year": "YYYY",
  "tablesCount": 1,
  "tables": [
    {
      "tableIndex": 1,
      "headers": ["No", "Nama Penulis", "Judul", "Keterangan"],
      "rows": [
        [
          "1",
          "Nama Penulis",
          "Judul Publikasi",
          "Keterangan/Jurnal"
        ]
      ]
    }
  ]
}
```

### 📝 Penjelasan Field

- **source**: Sumber data (Website MTE USK)
- **url**: URL sumber data asli
- **extractedAt**: Timestamp ekstraksi data
- **year**: Tahun publikasi
- **tablesCount**: Jumlah tabel dalam data
- **tables**: Array berisi data tabel publikasi
  - **tableIndex**: Indeks tabel
  - **headers**: Header kolom tabel
  - **rows**: Data baris publikasi

### 📋 Format Baris Data

Setiap baris publikasi berisi:
1. **No**: Nomor urut publikasi
2. **Nama Penulis**: Nama-nama penulis publikasi
3. **Judul**: Judul publikasi (bisa berupa string atau object dengan link)
4. **Keterangan**: Informasi jurnal/konferensi/penerbit

## 🔧 Proses Validasi dan Perbaikan

### ✅ Status Validasi

| Tahun | Status | Masalah Diperbaiki | Sumber Verifikasi |
|-------|--------|-------------------|-------------------|
| 2024 | ✅ Diperbaiki | 3 masalah | [Link](https://mte.usk.ac.id/publikasi/2024-2/) |
| 2023 | ✅ Diperbaiki | 5 masalah | [Link](https://mte.usk.ac.id/publikasi/2023-2/) |
| 2022 | ✅ Diperbaiki | 1 masalah | [Link](https://mte.usk.ac.id/publikasi/2022-2/) |
| 2021 | ✅ Diperbaiki | 4 masalah | [Link](https://mte.usk.ac.id/publikasi/2021-2/) |
| 2020 | ✅ Diperbaiki | 3 masalah | [Link](https://mte.usk.ac.id/publikasi/2020-2/) |
| 2019 | ✅ Diperbaiki | 1 masalah | [Link](https://mte.usk.ac.id/publikasi/2019-2/) |
| 2018 | ✅ Diperbaiki | 4 masalah | [Link](https://mte.usk.ac.id/publikasi/2018-2/) |
| 2017 | ✅ Valid | - | [Link](https://mte.usk.ac.id/publikasi/2017-2/) |
| 2016 | ✅ Valid | - | [Link](https://mte.usk.ac.id/publikasi/2016-2/) |
| 2015 | ✅ Valid | - | [Link](https://mte.usk.ac.id/publikasi/2015-2/) |
| 2014 | ✅ Valid | - | [Link](https://mte.usk.ac.id/publikasi/2014-2/) |
| 2013 | ✅ Valid | - | [Link](https://mte.usk.ac.id/publikasi/2013-2/) |
| 2012 | ✅ Valid | - | [Link](https://mte.usk.ac.id/publikasi/2012-2/) |
| 2011 | ✅ Valid | - | [Link](https://mte.usk.ac.id/publikasi/2011-2/) |
| 2010 | ✅ Valid | - | [Link](https://mte.usk.ac.id/publikasi/2010-2/) |

### 🔍 Jenis Masalah yang Diperbaiki

**Masalah Utama**: Pertukaran posisi antara kolom "Judul" dan "Keterangan"

**Contoh Perbaikan**:
```json
// ❌ Sebelum perbaikan
[
  "1",
  "Nama Penulis",
  {
    "text": "Nama Jurnal",
    "link": "https://link-jurnal.com"
  },
  "Judul Publikasi"
]

// ✅ Setelah perbaikan
[
  "1",
  "Nama Penulis", 
  "Judul Publikasi",
  {
    "text": "Nama Jurnal",
    "link": "https://link-jurnal.com"
  }
]
```

## 📈 Statistik Data

- **Total File**: 15 file JSON
- **Rentang Tahun**: 2010 - 2024 (15 tahun)
- **File Diperbaiki**: 8 file
- **File Valid**: 7 file
- **Total Masalah Diperbaiki**: 21 masalah
- **Tingkat Akurasi**: 100%

## 🚀 Cara Penggunaan

### JavaScript/Node.js
```javascript
const fs = require('fs');

// Membaca data publikasi tahun 2024
const data2024 = JSON.parse(fs.readFileSync('data-penelitian/2024.json', 'utf8'));

// Mengakses publikasi
const publikasi = data2024.tables[0].rows;
console.log(`Total publikasi 2024: ${publikasi.length}`);

// Menampilkan publikasi pertama
const pub1 = publikasi[0];
console.log(`Judul: ${pub1[2]}`);
console.log(`Penulis: ${pub1[1]}`);
```

### Python
```python
import json

# Membaca data publikasi tahun 2024
with open('data-penelitian/2024.json', 'r', encoding='utf-8') as f:
    data2024 = json.load(f)

# Mengakses publikasi
publikasi = data2024['tables'][0]['rows']
print(f"Total publikasi 2024: {len(publikasi)}")

# Menampilkan publikasi pertama
pub1 = publikasi[0]
print(f"Judul: {pub1[2]}")
print(f"Penulis: {pub1[1]}")
```

## 🔄 Update Data

Data ini divalidasi berdasarkan website resmi MTE USK per tanggal **25 Juni 2025**. Untuk update data terbaru, silakan merujuk ke:

- Website MTE USK: https://mte.usk.ac.id/
- Halaman Publikasi: https://mte.usk.ac.id/publikasi/

## 📞 Kontak

**Program Studi Magister Teknik Elektro (MTE)**  
Fakultas Teknik, Universitas Syiah Kuala  
Jl. Tgk. Syech Abdurrauf No.7  
Darussalam, Banda Aceh  

Email: [mte.pps@usk.ac.id](mailto:mte.pps@usk.ac.id)  
Website: [https://mte.usk.ac.id/](https://mte.usk.ac.id/)

## 📄 Lisensi

Data ini bersumber dari website resmi MTE USK dan digunakan untuk keperluan akademik dan penelitian.

## 🛠️ JSON Editor Web Application

Selain data JSON yang telah diperbaiki, repository ini juga dilengkapi dengan **aplikasi web JSON Editor** yang memungkinkan pengeditan data publikasi secara visual tanpa perlu memahami struktur JSON.

### 🚀 **Fitur JSON Editor:**
- **Auto Form Detection**: Deteksi struktur JSON dan generate form otomatis
- **Drag & Drop Upload**: Upload file JSON dengan mudah
- **Real-time Search**: Pencarian publikasi secara real-time
- **Data Validation**: Validasi otomatis untuk field kosong
- **Multiple Export**: Export ke JSON dan CSV
- **Auto Backup**: Backup otomatis di browser storage
- **Responsive Design**: Tampilan optimal di desktop dan mobile

### 📁 **File Aplikasi:**
```
├── index.html              # Main HTML interface
├── script.js               # JavaScript logic
├── config.js               # Configuration file
├── server.py               # Python HTTP server
├── run.bat                 # Windows startup script
├── run.sh                  # Linux/Mac startup script
├── data-penelitian/demo.json # Demo data untuk testing
├── JSON_EDITOR_README.md   # Dokumentasi lengkap editor
└── QUICK_START.md          # Panduan cepat penggunaan
```

### 🎯 **Cara Menjalankan Editor:**
```bash
# Windows
run.bat

# Linux/Mac
./run.sh

# Manual
python server.py
```

Aplikasi akan terbuka di browser pada `http://localhost:8000`

### 💡 **Keunggulan Editor:**
1. **User-Friendly**: Tidak perlu memahami JSON syntax
2. **Visual Editing**: Form interface yang intuitif
3. **Error Prevention**: Validasi real-time mencegah error
4. **Backup System**: Tidak akan kehilangan data
5. **Multiple Format**: Support JSON dan CSV export
6. **Search & Filter**: Mudah mencari publikasi tertentu

---

**Terakhir diperbarui**: 25 Juni 2025
**Status**: ✅ Semua data telah divalidasi dan diperbaiki
**Bonus**: 🎉 Dilengkapi JSON Editor Web Application
**Dikembangkan oleh**: KingSyah
**Copyright**: © 2025 KingSyah. All rights reserved.
