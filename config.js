/**
 * Configuration file for JSON Editor
 *
 * @author KingSyah
 * @copyright © 2025 KingSyah
 * @version 2.0
 * @description Configuration settings for JSON Editor MTE USK
 */

const CONFIG = {
    // Server settings
    server: {
        defaultPort: 8000,
        alternativePorts: [8001, 8080, 3000, 5000],
        autoOpenBrowser: true
    },
    
    // Editor settings
    editor: {
        autoSave: true,
        autoSaveInterval: 30000, // 30 seconds
        maxBackups: 5,
        validateOnChange: true,
        showLineNumbers: false
    },
    
    // UI settings
    ui: {
        theme: 'default', // default, dark, light
        language: 'id', // id, en
        itemsPerPage: 50,
        showStatistics: true,
        enableSearch: true,
        enableFilters: true
    },
    
    // File settings
    files: {
        allowedExtensions: ['.json'],
        maxFileSize: 10 * 1024 * 1024, // 10MB
        encoding: 'utf-8',
        backupPrefix: 'backup_',
        exportFormats: ['json', 'csv', 'xlsx']
    },
    
    // Validation rules
    validation: {
        required: ['No', 'Nama Penulis', 'Judul'],
        maxLength: {
            'Nama Penulis': 500,
            'Judul': 1000,
            'Keterangan': 2000
        },
        patterns: {
            'No': /^\d+$/,
            'URL': /^https?:\/\/.+/
        }
    },
    
    // Data structure templates
    templates: {
        newPublication: {
            'No': '',
            'Nama Penulis': '',
            'Judul': '',
            'Keterangan': ''
        },
        
        jsonStructure: {
            source: 'Website MTE USK',
            url: '',
            extractedAt: '',
            year: '',
            tablesCount: 1,
            tables: [{
                tableIndex: 1,
                headers: ['No', 'Nama Penulis', 'Judul', 'Keterangan'],
                rows: []
            }]
        }
    },
    
    // Field configurations
    fields: {
        'No': {
            type: 'number',
            required: true,
            autoIncrement: true,
            width: 'col-md-2'
        },
        'Nama Penulis': {
            type: 'textarea',
            required: true,
            rows: 2,
            placeholder: 'Masukkan nama penulis...',
            width: 'col-md-12'
        },
        'Judul': {
            type: 'textarea',
            required: true,
            rows: 3,
            placeholder: 'Masukkan judul publikasi...',
            supportLink: true,
            width: 'col-md-12'
        },
        'Keterangan': {
            type: 'textarea',
            required: false,
            rows: 3,
            placeholder: 'Masukkan keterangan jurnal/konferensi...',
            width: 'col-md-12'
        }
    },
    
    // Export settings
    export: {
        csv: {
            delimiter: ',',
            encoding: 'utf-8-bom',
            includeHeaders: true
        },
        json: {
            indent: 2,
            sortKeys: false,
            includeMetadata: true
        }
    },
    
    // Search and filter settings
    search: {
        caseSensitive: false,
        searchFields: ['Nama Penulis', 'Judul', 'Keterangan'],
        highlightResults: true,
        minSearchLength: 2
    },
    
    // Messages and labels (Indonesian)
    messages: {
        id: {
            loading: 'Memuat data...',
            saving: 'Menyimpan data...',
            saved: 'Data berhasil disimpan',
            error: 'Terjadi kesalahan',
            noData: 'Tidak ada data',
            confirmDelete: 'Yakin ingin menghapus publikasi ini?',
            validationError: 'Data tidak valid',
            fileNotFound: 'File tidak ditemukan',
            invalidFormat: 'Format file tidak valid'
        },
        en: {
            loading: 'Loading data...',
            saving: 'Saving data...',
            saved: 'Data saved successfully',
            error: 'An error occurred',
            noData: 'No data available',
            confirmDelete: 'Are you sure you want to delete this publication?',
            validationError: 'Data is not valid',
            fileNotFound: 'File not found',
            invalidFormat: 'Invalid file format'
        }
    },
    
    // Default data structure for new JSON
    defaultStructure: {
        source: "Manual Input",
        url: "",
        extractedAt: "",
        year: "",
        tablesCount: 1,
        tables: [{
            tableIndex: 1,
            headers: ["No", "Nama Penulis", "Judul", "Keterangan"],
            rows: []
        }]
    }
};

// Make config available globally
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}
