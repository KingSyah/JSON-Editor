# 📊 JSON/JSONL Editor - Data Publikasi MTE USK

> **Editor untuk Data Publikasi Ilmiah Program Studi Magister Teknik Elektro Universitas Syiah Kuala**
> *Advanced JSON/JSONL Editor with Form Generation*

Repository ini berisi JSON/JSONL Editor untuk mengedit data publikasi penelitian dari Program Studi Magister Teknik Elektro (MTE) Universitas Syiah Kuala. Editor mendukung format JSON dan JSONL dengan fitur form generation otomatis.

## ✨ Fitur

- **Multi-format Support**: Mendukung format JSON dan JSONL
- **Auto Form Generation**: Membuat form editing otomatis berdasarkan struktur data
- **Drag & Drop**: Upload file dengan drag & drop
- **Real-time Validation**: Validasi data secara real-time
- **Multiple Export**: Export ke JSON, JSONL, dan CSV
- **Search & Filter**: Pencarian dan filter publikasi
- **Responsive Design**: Tampilan responsif untuk semua device

## 🚀 Cara Penggunaan

### Metode 1: Langsung
1. **Download/Clone** repository ini
2. **Buka** file `start.html` atau `index.html` di browser
3. **Upload File**: Drag & drop atau pilih file JSON/JSONL
4. **Edit Data**: Gunakan form yang ter-generate otomatis
5. **Save/Export**: Simpan atau export dalam format yang diinginkan

### Metode 2: GitHub Pages
Akses langsung melalui: `https://[username].github.io/[repository-name]/`

### Metode 3: Local Server
```bash
# Jika menggunakan Python
python -m http.server 8000

# Jika menggunakan Node.js
npx serve .

# Kemudian buka http://localhost:8000
```

## 📁 Struktur Proyek

```
JSON-Editor/
├── index.html              # File utama editor
├── script.js               # JavaScript logic
├── config.js               # Konfigurasi aplikasi
├── README.md               # Dokumentasi
└── data-penelitian/        # Contoh data
    ├── JSON/               # File JSON format
    │   ├── 2024.json
    │   ├── 2023.json
    │   └── ...
    └── JSONL/              # File JSONL format
        ├── auto.jsonl
        ├── object.jsonl
        └── ...
```

## 🔍 Format Data yang Didukung

Editor mendukung dua format data:

### Format JSON (MTE USK)

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

### Format JSONL (JSON Lines)
```jsonl
{"No": "1", "Nama Penulis": "Dr. Ahmad Syahputra, M.T.", "Judul": {"text": "Machine Learning Applications", "link": "https://example.com/paper1.pdf"}, "Keterangan": "IEEE Transactions"}
{"No": "2", "Nama Penulis": "Dr. Siti Aminah, M.T.", "Judul": "Deep Learning for Signal Processing", "Keterangan": "Jurnal Teknik Elektro"}
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

## 🛠️ Teknologi

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5.1.3 (CDN)
- **Icons**: Font Awesome 6.0 (CDN)
- **Format**: JSON, JSONL, CSV support
- **No Backend Required**: Pure client-side application

## 🎨 Fitur Utama

- **Multi-format Support**: JSON dan JSONL
- **Auto Form Generation**: Generate form otomatis dari struktur data
- **Drag & Drop**: Upload file dengan mudah
- **Real-time Validation**: Validasi data secara real-time
- **Multiple Export**: Export ke JSON, JSONL, dan CSV
- **Search & Filter**: Pencarian dan filter publikasi
- **Responsive Design**: Tampilan optimal di semua device

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Proyek ini menggunakan lisensi akademik untuk Program Studi Magister Teknik Elektro Universitas Syiah Kuala.

## 👨‍💻 Author

**KingSyah**
- Program Studi Magister Teknik Elektro
- Universitas Syiah Kuala
- © 2025 All rights reserved

## 🙏 Acknowledgments

- Program Studi Magister Teknik Elektro USK
- Bootstrap Team
- Font Awesome Team
- Semua kontributor data publikasi

---

**Terakhir diperbarui**: 25 Juni 2025
**Status**: ✅ JSON/JSONL Editor v2.1
**Dikembangkan oleh**: KingSyah
