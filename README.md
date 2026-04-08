# 📊 JSON/JSONL Editor - Data Publikasi MTE USK

> **Editor untuk Data Publikasi Ilmiah Program Studi Magister Teknik Elektro Universitas Syiah Kuala**
> *Advanced JSON/JSONL Editor with Form Generation*

Editor untuk mengedit data publikasi penelitian dari Program Studi Magister Teknik Elektro (MTE) Universitas Syiah Kuala. Mendukung format JSON dan JSONL dengan fitur form generation otomatis, validasi struktur, dan pembuatan template.

## ✨ Fitur

### Core
- **Multi-format Support** — JSON dan JSONL, auto-detect format
- **Auto Form Generation** — form editing otomatis berdasarkan struktur data
- **Universal Link Support** — field manapun dengan struktur `{text, link}` otomatis dapat input link
- **Drag & Drop** — upload file dengan drag & drop

### Edit & Validasi
- **Tambah / Hapus Publikasi** — struktur baru di-derive dari data yang ada, bukan hardcode
- **Validasi Struktur** — cek otomatis sebelum Save/Download, deteksi perubahan struktur, field hilang, link hilang
- **Validasi Manual** — tombol `Validasi Data` untuk cek menyeluruh (error struktur + peringatan konten)
- **Search & Filter** — pencarian dan filter publikasi

### Export & Template
- **Multiple Export** — JSON, JSONL, CSV
- **Buat dari Template** — buat file baru dengan struktur kosong dari data yang sedang dibuka, auto-increment nama file

### UI
- **Responsive Design** — Bootstrap 5, tampil optimal di semua device
- **Preview Data** — modal preview JSON sebelum download
- **Auto-save** — backup otomatis ke localStorage

## 🚀 Cara Penggunaan

### Langsung
1. Download/clone repository ini
2. Buka `index.html` di browser
3. Upload file JSON/JSONL (drag & drop atau klik)
4. Edit data melalui form yang ter-generate
5. Save atau Download

### Local Server
```bash
python -m http.server 8000
# atau
npx serve .
# buka http://localhost:8000
```

### GitHub Pages
Akses: `https://[username].github.io/[repository-name]/`

## 📁 Struktur Proyek

```
app/
├── index.html          # UI (form, tombol, modal)
├── script.js           # Class JSONEditor — semua logic
├── config.js           # Konfigurasi: field, validasi, template
├── README.md           # Dokumentasi
├── CHANGELOG.md        # Riwayat perubahan
└── *.jsonl / *.json    # Data publikasi
```

## 🔍 Format Data

### JSONL (JSON Lines) — Format Utama
```jsonl
{"No":"1","Nama Penulis":"Dr. Ahmad","Judul":"Paper Title","Keterangan":{"text":"IEEE Transactions","link":"https://doi.org/..."}}
{"No":"2","Nama Penulis":"Dr. Siti","Judul":{"text":"Paper Title 2","link":"https://doi.org/..."},"Keterangan":"Jurnal TE"}
```

### JSON (MTE USK Format)
```json
{
  "source": "Website MTE USK",
  "url": "https://mte.usk.ac.id/publikasi/2024-2/",
  "extractedAt": "2025-06-24T03:48:42.135Z",
  "year": "2024",
  "tablesCount": 1,
  "tables": [{
    "tableIndex": 1,
    "headers": ["No", "Nama Penulis", "Judul", "Keterangan"],
    "rows": [["1", "Nama Penulis", "Judul Publikasi", {"text":"Jurnal","link":"https://..."}]]
  }]
}
```

### Struktur Field

Field bisa berupa **string** atau **object** dengan `{text, link}`:

```json
// String — untuk teks biasa
"Judul": "Paper Title"

// Object — untuk teks + link (otomatis dapat input link di form)
"Judul": { "text": "Paper Title", "link": "https://doi.org/..." }
"Keterangan": { "text": "IEEE Access", "link": "https://ieeexplore.ieee.org/..." }
```

Editor **auto-detect** struktur object → tampilkan input link tanpa perlu konfigurasi.

### Penjelasan Field

| Field | Tipe | Wajib | Keterangan |
|-------|------|-------|------------|
| `No` | string/number | Ya | Nomor urut |
| `Nama Penulis` | string | Ya | Nama penulis (pisah koma) |
| `Judul` | string / `{text,link}` | Ya | Judul publikasi, bisa punya link |
| `Keterangan` | string / `{text,link}` | Tidak | Jurnal/konferensi, bisa punya link |

> **Universal**: Editor mendukung field apapun dengan struktur `{text, link}`, bukan hanya `Judul` dan `Keterangan`.

## 📋 Fitur Detail

### Buat dari Template
1. Buka file sumber (misal `2024.jsonl`)
2. Klik **Buat dari Template**
3. Data kosong terbentuk dengan struktur sama persis
4. Nama file auto-increment (`2024.jsonl` → `2025.jsonl`)
5. Isi data baru → Download

### Validasi Struktur
Sebelum Save/Download, editor otomatis mengecek:
- Field yang **hilang** dari data asli
- Field yang **berubah tipe** (object → string = link hilang!)
- **Keys object** yang berubah
- **Per-entry consistency** — setiap baris dicek

Jika ada masalah, dialog peringatan muncul dengan detail. User bisa override.

### Validasi Manual
Klik **Validasi Data** untuk cek menyeluruh:
- 🔴 **Error Struktur** — perubahan struktur fatal
- ⚠️ **Peringatan** — field kosong, link tidak valid

## 🔧 Proses Validasi Data

| Tahun | Status | Masalah | Sumber |
|-------|--------|---------|--------|
| 2024 | ✅ Diperbaiki | 3 | [Link](https://mte.usk.ac.id/publikasi/2024-2/) |
| 2023 | ✅ Diperbaiki | 5 | [Link](https://mte.usk.ac.id/publikasi/2023-2/) |
| 2022 | ✅ Diperbaiki | 1 | [Link](https://mte.usk.ac.id/publikasi/2022-2/) |
| 2021 | ✅ Diperbaiki | 4 | [Link](https://mte.usk.ac.id/publikasi/2021-2/) |
| 2020 | ✅ Diperbaiki | 3 | [Link](https://mte.usk.ac.id/publikasi/2020-2/) |
| 2019 | ✅ Diperbaiki | 1 | [Link](https://mte.usk.ac.id/publikasi/2019-2/) |
| 2018 | ✅ Diperbaiki | 4 | [Link](https://mte.usk.ac.id/publikasi/2018-2/) |
| 2017 | ✅ Valid | - | [Link](https://mte.usk.ac.id/publikasi/2017-2/) |
| 2016 | ✅ Valid | - | [Link](https://mte.usk.ac.id/publikasi/2016-2/) |
| 2015 | ✅ Valid | - | [Link](https://mte.usk.ac.id/publikasi/2015-2/) |
| 2014 | ✅ Valid | - | [Link](https://mte.usk.ac.id/publikasi/2014-2/) |
| 2013 | ✅ Valid | - | [Link](https://mte.usk.ac.id/publikasi/2013-2/) |
| 2012 | ✅ Valid | - | [Link](https://mte.usk.ac.id/publikasi/2012-2/) |
| 2011 | ✅ Valid | - | [Link](https://mte.usk.ac.id/publikasi/2011-2/) |
| 2010 | ✅ Valid | - | [Link](https://mte.usk.ac.id/publikasi/2010-2/) |

**Total**: 15 file, 21 masalah diperbaiki, tingkat akurasi 100%

### Contoh Perbaikan
```json
// ❌ Sebelum — kolom Judul dan Keterangan tertukar
["1", "Nama Penulis", {"text":"Nama Jurnal","link":"..."}, "Judul Publikasi"]

// ✅ Sesudah — posisi benar
["1", "Nama Penulis", "Judul Publikasi", {"text":"Nama Jurnal","link":"..."}]
```

## 📈 Statistik

- **Rentang Tahun**: 2010 – 2024 (15 tahun)
- **Total File**: 15 file JSON
- **File Diperbaiki**: 8 file
- **Total Masalah**: 21 masalah diperbaiki

## 🛠️ Teknologi

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5.1.3 (CDN)
- **Icons**: Font Awesome 6.0 (CDN)
- **Backend**: Tidak dibutuhkan — pure client-side

## 🔄 Update Data

Data divalidasi berdasarkan website resmi MTE USK per **25 Juni 2025**.

- Website: https://mte.usk.ac.id/
- Publikasi: https://mte.usk.ac.id/publikasi/

## 📖 Changelog

Lihat [CHANGELOG.md](./CHANGELOG.md) untuk riwayat perubahan lengkap.

## 🤝 Kontribusi

1. Fork repository
2. Buat branch (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📞 Kontak

**Program Studi Magister Teknik Elektro (MTE)**
Fakultas Teknik, Universitas Syiah Kuala
Jl. Tgk. Syech Abdurrauf No.7, Darussalam, Banda Aceh

- Email: [mte.pps@usk.ac.id](mailto:mte.pps@usk.ac.id)
- Website: https://mte.usk.ac.id/

---

**KingSyah** — Program Studi Magister Teknik Elektro USK
© 2025 All rights reserved

> **v2.2.0** — Universal link support, validasi struktur, buat dari template
