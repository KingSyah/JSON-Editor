/**
 * JSON Editor for MTE USK Publications
 *
 * @description Advanced JSON Editor with auto form generation
 * @version 2.0
 * @author KingSyah
 * @copyright © 2025 KingSyah. All rights reserved.
 * @license Academic Use - Program Studi Magister Teknik Elektro USK
 *
 * Features:
 * - Auto form detection and generation
 * - Multi-publication editing
 * - Real-time validation
 * - Multiple export formats
 * - Responsive design
 */

class JSONEditor {
    constructor() {
        this.currentData = null;
        this.currentFileName = '';
        this.isModified = false;
        this.initializeEventListeners();

        // Add copyright info to console
        console.log('%c🎯 JSON Editor v2.0', 'color: #007bff; font-size: 16px; font-weight: bold;');
        console.log('%c© 2025 KingSyah - JSON Editor for MTE USK', 'color: #6c757d; font-size: 12px;');
    }

    initializeEventListeners() {
        // File input events
        document.getElementById('fileInput').addEventListener('change', (e) => this.handleFileSelect(e));
        document.getElementById('dragDropArea').addEventListener('click', () => document.getElementById('fileInput').click());

        // Button events
        document.getElementById('createNewBtn').addEventListener('click', () => this.createNewJSON());
        document.getElementById('saveBtn').addEventListener('click', () => this.saveData());
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadJSON());
        document.getElementById('exportCsvBtn').addEventListener('click', () => this.exportToCSV());
        document.getElementById('addNewBtn').addEventListener('click', () => this.addNewPublication());
        document.getElementById('validateBtn').addEventListener('click', () => this.validateData());
        document.getElementById('previewBtn').addEventListener('click', () => this.showPreview());
        document.getElementById('copyJsonBtn').addEventListener('click', () => this.copyJSON());

        // Drag and drop events
        const dragDropArea = document.getElementById('dragDropArea');
        dragDropArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        dragDropArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        dragDropArea.addEventListener('drop', (e) => this.handleDrop(e));
    }

    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.currentTarget.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type === 'application/json') {
            this.loadFile(files[0]);
        } else {
            this.showStatus('error', 'File harus berformat JSON');
        }
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.loadFile(file);
        }
    }

    createNewJSON() {
        const newData = {
            source: "Manual Input",
            url: "",
            extractedAt: new Date().toISOString(),
            year: new Date().getFullYear().toString(),
            tablesCount: 1,
            tables: [{
                tableIndex: 1,
                headers: ["No", "Nama Penulis", "Judul", "Keterangan"],
                rows: [
                    ["1", "", "", ""]
                ]
            }]
        };

        this.currentFileName = `data_${Date.now()}.json`;
        this.loadJSONData(newData);
        this.showStatus('modified', 'JSON baru berhasil dibuat');
    }

    loadFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                this.currentFileName = file.name;
                this.loadJSONData(data);
            } catch (error) {
                this.showStatus('error', 'File JSON tidak valid');
            }
        };
        reader.readAsText(file);
    }

    loadJSONData(data) {
        this.currentData = data;
        this.isModified = false;
        this.generateForm();
        this.updateUI();
        this.showStatus('saved', `File ${this.currentFileName} berhasil dimuat`);
    }

    generateForm() {
        const container = document.getElementById('formContainer');
        container.innerHTML = '';

        if (!this.currentData) {
            container.innerHTML = '<div class="alert alert-warning">Data tidak valid atau kosong</div>';
            return;
        }

        // Handle different JSON structures
        let headers = [];
        let rows = [];

        // Check if it's the MTE USK format
        if (this.currentData.tables && this.currentData.tables[0]) {
            headers = this.currentData.tables[0].headers;
            rows = this.currentData.tables[0].rows;
        }
        // Check if it's a simple array format
        else if (Array.isArray(this.currentData)) {
            // Auto-detect headers from first object
            if (this.currentData.length > 0 && typeof this.currentData[0] === 'object') {
                headers = Object.keys(this.currentData[0]);
                rows = this.currentData.map(item => headers.map(header => item[header] || ''));
            }
        }
        // Check if it's an object with array property
        else if (this.currentData.data && Array.isArray(this.currentData.data)) {
            if (this.currentData.data.length > 0) {
                headers = Object.keys(this.currentData.data[0]);
                rows = this.currentData.data.map(item => headers.map(header => item[header] || ''));
            }
        }
        // If no recognizable structure, show raw JSON editor
        else {
            this.showRawJSONEditor();
            return;
        }

        if (headers.length === 0) {
            container.innerHTML = '<div class="alert alert-info">Struktur JSON tidak dikenali. Gunakan mode raw editor.</div>';
            this.showRawJSONEditor();
            return;
        }

        // Create metadata form
        const metadataDiv = document.createElement('div');
        metadataDiv.className = 'mb-4 p-3 bg-light rounded';
        metadataDiv.innerHTML = `
            <h5><i class="fas fa-info-circle"></i> Informasi File</h5>
            <div class="row">
                <div class="col-md-6">
                    <label class="form-label">Tahun:</label>
                    <input type="text" class="form-control" value="${this.currentData.year || ''}"
                           onchange="editor.updateMetadata('year', this.value)">
                </div>
                <div class="col-md-6">
                    <label class="form-label">URL Sumber:</label>
                    <input type="url" class="form-control" value="${this.currentData.url || ''}"
                           onchange="editor.updateMetadata('url', this.value)">
                </div>
            </div>
        `;
        container.appendChild(metadataDiv);

        // Create search and filter controls
        const searchDiv = document.createElement('div');
        searchDiv.className = 'mb-4 p-3 bg-light rounded';
        searchDiv.innerHTML = `
            <div class="row align-items-center">
                <div class="col-md-6">
                    <label class="form-label">🔍 Cari Publikasi:</label>
                    <input type="text" class="form-control" id="searchInput"
                           placeholder="Cari berdasarkan judul, penulis, atau keterangan..."
                           onkeyup="editor.filterPublications()">
                </div>
                <div class="col-md-3">
                    <label class="form-label">📅 Filter Tahun:</label>
                    <select class="form-select" id="yearFilter" onchange="editor.filterPublications()">
                        <option value="">Semua Tahun</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label class="form-label">📊 Statistik:</label>
                    <div class="bg-white p-2 rounded border">
                        <small id="statsText">Total: ${rows.length} publikasi</small>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(searchDiv);

        // Create publications form
        const publicationsDiv = document.createElement('div');
        publicationsDiv.innerHTML = `<h5><i class="fas fa-book"></i> Data Publikasi</h5>`;
        publicationsDiv.id = 'publicationsContainer';
        
        // Create container for all publications
        const publicationsListDiv = document.createElement('div');
        publicationsListDiv.id = 'publicationsList';

        rows.forEach((row, index) => {
            const publicationDiv = this.createPublicationForm(row, index, headers);
            publicationsListDiv.appendChild(publicationDiv);
        });

        publicationsDiv.appendChild(publicationsListDiv);

        container.appendChild(publicationsDiv);
    }

    createPublicationForm(row, index, headers) {
        const div = document.createElement('div');
        div.className = 'publication-item';
        div.setAttribute('data-index', index);

        let formHTML = `
            <div class="publication-header d-flex justify-content-between align-items-center">
                <span>Publikasi #${index + 1}</span>
                <button class="btn btn-sm btn-outline-danger" onclick="editor.deletePublication(${index})">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </div>
        `;

        headers.forEach((header, headerIndex) => {
            const value = row[headerIndex];
            const fieldId = `field_${index}_${headerIndex}`;

            if (header === 'No') {
                formHTML += `
                    <div class="mb-3 col-md-3">
                        <label class="form-label">${header}:</label>
                        <input type="number" class="form-control" id="${fieldId}" value="${value || ''}"
                               onchange="editor.updateField(${index}, ${headerIndex}, this.value)">
                    </div>
                `;
            } else if (header === 'Judul') {
                // Handle both string and object formats for title
                let titleValue = '';
                let titleLink = '';
                let hasLink = false;

                if (typeof value === 'object' && value !== null && value.text) {
                    titleValue = value.text;
                    titleLink = value.link || '';
                    hasLink = true;
                } else {
                    titleValue = value || '';
                }

                formHTML += `
                    <div class="mb-3 col-md-12">
                        <label class="form-label">${header}:</label>
                        <textarea class="form-control" id="${fieldId}" rows="2"
                                  onchange="editor.updateField(${index}, ${headerIndex}, this.value)">${titleValue}</textarea>
                        <div class="mt-2">
                            <label class="form-label">Link (opsional):</label>
                            <input type="url" class="form-control" id="${fieldId}_link" value="${titleLink}"
                                   placeholder="https://..."
                                   onchange="editor.updateFieldLink(${index}, ${headerIndex}, this.value)">
                        </div>
                    </div>
                `;
            } else if (header === 'Nama Penulis') {
                formHTML += `
                    <div class="mb-3 col-md-9">
                        <label class="form-label">${header}:</label>
                        <textarea class="form-control" id="${fieldId}" rows="2"
                                  placeholder="Masukkan nama penulis..."
                                  onchange="editor.updateField(${index}, ${headerIndex}, this.value)">${value || ''}</textarea>
                    </div>
                `;
            } else {
                // Handle other fields (Keterangan, etc.)
                let fieldValue = '';
                if (typeof value === 'object' && value !== null && value.text) {
                    fieldValue = value.text;
                } else {
                    fieldValue = value || '';
                }

                formHTML += `
                    <div class="mb-3 col-md-12">
                        <label class="form-label">${header}:</label>
                        <textarea class="form-control" id="${fieldId}" rows="3"
                                  placeholder="Masukkan ${header.toLowerCase()}..."
                                  onchange="editor.updateField(${index}, ${headerIndex}, this.value)">${fieldValue}</textarea>
                    </div>
                `;
            }
        });

        // Wrap fields in row for better layout
        formHTML = `<div class="row">${formHTML}</div>`;

        div.innerHTML = formHTML;
        return div;
    }

    updateField(rowIndex, fieldIndex, value) {
        if (!this.currentData || !this.currentData.tables[0]) return;

        const currentValue = this.currentData.tables[0].rows[rowIndex][fieldIndex];

        // If current value is an object, preserve the structure
        if (typeof currentValue === 'object' && currentValue !== null && currentValue.text !== undefined) {
            this.currentData.tables[0].rows[rowIndex][fieldIndex].text = value;
        } else {
            this.currentData.tables[0].rows[rowIndex][fieldIndex] = value;
        }

        this.markAsModified();
        console.log(`Updated field [${rowIndex}][${fieldIndex}] to:`, value);
    }

    updateFieldLink(rowIndex, fieldIndex, link) {
        if (!this.currentData || !this.currentData.tables[0]) return;

        const currentValue = this.currentData.tables[0].rows[rowIndex][fieldIndex];

        // If link is provided and current value is not an object, convert it
        if (link && link.trim() !== '') {
            if (typeof currentValue === 'object' && currentValue !== null) {
                this.currentData.tables[0].rows[rowIndex][fieldIndex].link = link;
            } else {
                // Convert string to object with link
                this.currentData.tables[0].rows[rowIndex][fieldIndex] = {
                    text: currentValue || '',
                    link: link
                };
            }
        } else {
            // If link is empty and current value is an object, convert back to string
            if (typeof currentValue === 'object' && currentValue !== null && currentValue.text !== undefined) {
                this.currentData.tables[0].rows[rowIndex][fieldIndex] = currentValue.text;
            }
        }

        this.markAsModified();
        console.log(`Updated field link [${rowIndex}][${fieldIndex}] to:`, link);
    }

    updateMetadata(field, value) {
        if (!this.currentData) return;
        this.currentData[field] = value;
        this.markAsModified();
    }

    addNewPublication() {
        if (!this.currentData || !this.currentData.tables[0]) return;

        const headers = this.currentData.tables[0].headers;
        const newRow = headers.map((header, index) => {
            if (header === 'No') {
                return String(this.currentData.tables[0].rows.length + 1);
            }
            return '';
        });

        this.currentData.tables[0].rows.push(newRow);

        // Regenerate the entire form to include the new publication
        this.generateForm();
        this.markAsModified();
        this.showStatus('modified', `Publikasi baru ditambahkan. Total: ${this.currentData.tables[0].rows.length} publikasi`);

        // Scroll to the new publication
        setTimeout(() => {
            const newPubElement = document.querySelector(`[data-index="${this.currentData.tables[0].rows.length - 1}"]`);
            if (newPubElement) {
                newPubElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                newPubElement.style.backgroundColor = '#fff3cd';
                setTimeout(() => {
                    newPubElement.style.backgroundColor = '';
                }, 2000);
            }
        }, 100);
    }

    deletePublication(index) {
        if (!this.currentData || !this.currentData.tables[0]) return;

        const totalPublications = this.currentData.tables[0].rows.length;

        if (totalPublications <= 1) {
            this.showStatus('error', 'Tidak dapat menghapus publikasi terakhir. Minimal harus ada 1 publikasi.');
            return;
        }

        if (confirm(`Yakin ingin menghapus publikasi #${index + 1}?`)) {
            this.currentData.tables[0].rows.splice(index, 1);

            // Renumber the remaining publications
            this.currentData.tables[0].rows.forEach((row, idx) => {
                if (this.currentData.tables[0].headers[0] === 'No') {
                    row[0] = String(idx + 1);
                }
            });

            this.generateForm();
            this.markAsModified();
            this.showStatus('modified', `Publikasi berhasil dihapus. Total: ${this.currentData.tables[0].rows.length} publikasi`);
        }
    }

    validateData() {
        if (!this.currentData) {
            this.showStatus('error', 'Tidak ada data untuk divalidasi');
            return;
        }

        const errors = [];
        const table = this.currentData.tables[0];
        
        table.rows.forEach((row, index) => {
            row.forEach((field, fieldIndex) => {
                if (!field || (typeof field === 'string' && field.trim() === '')) {
                    errors.push(`Baris ${index + 1}, kolom ${table.headers[fieldIndex]}: kosong`);
                }
            });
        });

        if (errors.length === 0) {
            this.showStatus('saved', 'Data valid - tidak ada error ditemukan');
        } else {
            this.showStatus('error', `Ditemukan ${errors.length} error`);
            console.log('Validation errors:', errors);
        }
    }

    showPreview() {
        if (!this.currentData) return;
        
        const jsonString = JSON.stringify(this.currentData, null, 2);
        document.getElementById('jsonPreview').textContent = jsonString;
        
        const modal = new bootstrap.Modal(document.getElementById('previewModal'));
        modal.show();
    }

    copyJSON() {
        const jsonText = document.getElementById('jsonPreview').textContent;
        navigator.clipboard.writeText(jsonText).then(() => {
            this.showStatus('saved', 'JSON berhasil disalin ke clipboard');
        });
    }

    async saveData() {
        if (!this.currentData) return;

        // Update timestamp
        this.currentData.extractedAt = new Date().toISOString();

        // Save to localStorage as backup
        localStorage.setItem('jsonEditor_backup', JSON.stringify(this.currentData));

        // Try to save to server if available
        try {
            const response = await fetch('/api/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    filename: this.currentFileName,
                    content: this.currentData
                })
            });

            if (response.ok) {
                const result = await response.json();
                this.showStatus('saved', `Data berhasil disimpan: ${result.message}`);
            } else {
                throw new Error('Server save failed');
            }
        } catch (error) {
            // Fallback to local storage only
            this.showStatus('saved', 'Data berhasil disimpan (backup di browser)');
        }

        this.isModified = false;
        this.updateUI();
    }

    downloadJSON() {
        if (!this.currentData) return;
        
        const jsonString = JSON.stringify(this.currentData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = this.currentFileName || 'data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showStatus('saved', `File ${this.currentFileName} berhasil didownload`);
    }

    markAsModified() {
        this.isModified = true;
        this.updateUI();
        this.showStatus('modified', 'Data telah dimodifikasi');
    }

    updateUI() {
        const saveBtn = document.getElementById('saveBtn');
        const downloadBtn = document.getElementById('downloadBtn');
        const exportCsvBtn = document.getElementById('exportCsvBtn');
        const actionButtons = document.getElementById('actionButtons');

        const hasData = this.currentData !== null;

        saveBtn.disabled = !hasData;
        downloadBtn.disabled = !hasData;
        exportCsvBtn.disabled = !hasData;
        actionButtons.style.display = hasData ? 'block' : 'none';
        
        // Update file info
        const fileInfo = document.getElementById('fileInfo');
        if (hasData) {
            const rowCount = this.currentData.tables[0]?.rows?.length || 0;
            fileInfo.textContent = `${this.currentFileName} - ${rowCount} publikasi`;
        } else {
            fileInfo.textContent = 'Belum ada file dimuat';
        }
    }

    filterPublications() {
        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const yearFilter = document.getElementById('yearFilter')?.value || '';

        if (!this.currentData || !this.currentData.tables[0]) return;

        const publications = document.querySelectorAll('.publication-item');
        let visibleCount = 0;

        publications.forEach((pub, index) => {
            const row = this.currentData.tables[0].rows[index];
            if (!row) return;

            // Get text content for searching
            const searchContent = row.join(' ').toLowerCase();

            // Check search term
            const matchesSearch = !searchTerm || searchContent.includes(searchTerm);

            // Check year filter (if applicable)
            const matchesYear = !yearFilter || searchContent.includes(yearFilter);

            if (matchesSearch && matchesYear) {
                pub.style.display = 'block';
                visibleCount++;
            } else {
                pub.style.display = 'none';
            }
        });

        // Update statistics
        const statsText = document.getElementById('statsText');
        if (statsText) {
            const totalCount = this.currentData.tables[0].rows.length;
            if (visibleCount === totalCount) {
                statsText.textContent = `Total: ${totalCount} publikasi`;
            } else {
                statsText.textContent = `Menampilkan: ${visibleCount} dari ${totalCount} publikasi`;
            }
        }
    }

    exportToCSV() {
        if (!this.currentData || !this.currentData.tables[0]) return;

        const table = this.currentData.tables[0];
        const headers = table.headers;
        const rows = table.rows;

        // Create CSV content
        let csvContent = headers.join(',') + '\n';

        rows.forEach(row => {
            const csvRow = row.map(field => {
                // Handle object fields
                if (typeof field === 'object' && field.text) {
                    return `"${field.text.replace(/"/g, '""')}"`;
                }
                // Handle string fields
                return `"${String(field).replace(/"/g, '""')}"`;
            });
            csvContent += csvRow.join(',') + '\n';
        });

        // Download CSV
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = this.currentFileName.replace('.json', '.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showStatus('saved', 'File CSV berhasil didownload');
    }

    showStatus(type, message) {
        const statusText = document.getElementById('statusText');
        const indicator = statusText.querySelector('.status-indicator');

        indicator.className = `status-indicator status-${type}`;
        statusText.innerHTML = `<span class="status-indicator status-${type}"></span>${message}`;

        // Auto hide status after 5 seconds for non-error messages
        if (type !== 'error') {
            setTimeout(() => {
                if (this.isModified) {
                    this.showStatus('modified', 'Data telah dimodifikasi');
                } else {
                    this.showStatus('saved', 'Siap untuk memuat file JSON');
                }
            }, 5000);
        }
    }
}

// Initialize the editor
const editor = new JSONEditor();

// Initialize editor on page load
window.addEventListener('load', () => {
    // Check for backup data
    const backup = localStorage.getItem('jsonEditor_backup');
    if (backup) {
        try {
            const data = JSON.parse(backup);
            if (confirm('Ditemukan backup data sebelumnya. Ingin memuat backup tersebut?')) {
                editor.currentFileName = 'backup.json';
                editor.loadJSONData(data);
                editor.showStatus('modified', 'Backup data dimuat dari browser');
            }
        } catch (error) {
            console.log('No valid backup found');
        }
    }
});
