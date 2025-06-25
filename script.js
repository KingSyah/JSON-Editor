/**
 * JSON Editor for MTE USK Publications
 *
 * @description Advanced JSON Editor with auto form generation
 * @version 2.1
 * @author KingSyah
 * @copyright © 2025 KingSyah. All rights reserved.
 * @license Academic Use - Program Studi Magister Teknik Elektro USK
 *
 * Features:
 * - Auto form detection and generation
 * - Multi-publication editing
 * - Real-time validation
 * - Multiple export formats (JSON, JSONL, CSV)
 * - JSONL support for line-by-line JSON data
 * - Responsive design
 */

class JSONEditor {
    constructor() {
        this.currentData = null;
        this.currentFileName = '';
        this.isModified = false;
        this.fileType = 'json'; // 'json' or 'jsonl'
        this.initializeEventListeners();

        // Add copyright info to console
        console.log('%c🎯 JSON/JSONL Editor v2.1', 'color: #007bff; font-size: 16px; font-weight: bold;');
        console.log('%c© 2025 KingSyah - JSON/JSONL Editor for MTE USK', 'color: #6c757d; font-size: 12px;');
    }

    initializeEventListeners() {
        // File input events
        document.getElementById('fileInput').addEventListener('change', (e) => this.handleFileSelect(e));
        document.getElementById('dragDropArea').addEventListener('click', () => document.getElementById('fileInput').click());

        // Button events
        document.getElementById('createNewBtn').addEventListener('click', () => this.createNewJSON());
        document.getElementById('createNewJsonlBtn').addEventListener('click', () => this.createNewJSONL());
        document.getElementById('saveBtn').addEventListener('click', () => this.saveData());
        document.getElementById('downloadJsonBtn').addEventListener('click', () => this.downloadJSON());
        document.getElementById('downloadJsonlBtn').addEventListener('click', () => this.downloadJSONL());
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
        if (files.length > 0) {
            const file = files[0];
            const fileName = file.name.toLowerCase();
            if (fileName.endsWith('.json') || fileName.endsWith('.jsonl') || file.type === 'application/json') {
                this.loadFile(file);
            } else {
                this.showStatus('error', 'File harus berformat JSON atau JSONL');
            }
        } else {
            this.showStatus('error', 'Tidak ada file yang dipilih');
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
        this.fileType = 'json';
        this.loadJSONData(newData);
        this.showStatus('modified', 'JSON baru berhasil dibuat');
    }

    createNewJSONL() {
        // Create sample JSONL data (array of objects)
        const newData = [
            {
                "No": "1",
                "Nama Penulis": "",
                "Judul": "",
                "Keterangan": ""
            }
        ];

        this.currentFileName = `data_${Date.now()}.jsonl`;
        this.fileType = 'jsonl';
        this.loadJSONData(newData);
        this.showStatus('modified', 'JSONL baru berhasil dibuat');
    }

    loadFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                this.currentFileName = file.name;
                const fileExtension = file.name.split('.').pop().toLowerCase();

                if (fileExtension === 'jsonl') {
                    this.fileType = 'jsonl';
                    const data = this.parseJSONL(e.target.result);
                    this.loadJSONData(data);
                } else {
                    this.fileType = 'json';
                    const data = JSON.parse(e.target.result);
                    this.loadJSONData(data);
                }
            } catch (error) {
                this.showStatus('error', `File ${this.fileType.toUpperCase()} tidak valid: ${error.message}`);
            }
        };
        reader.readAsText(file);
    }

    parseJSONL(jsonlText) {
        const lines = jsonlText.trim().split('\n');
        const data = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
                try {
                    const obj = JSON.parse(line);
                    data.push(obj);
                } catch (error) {
                    throw new Error(`Error parsing line ${i + 1}: ${error.message}`);
                }
            }
        }

        return data;
    }

    loadJSONData(data) {
        this.currentData = data;
        this.isModified = false;
        this.generateForm();
        this.updateUI();
        this.showStatus('saved', `File ${this.currentFileName} (${this.fileType.toUpperCase()}) berhasil dimuat`);
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
        // Check if it's a simple array format (common in JSONL)
        else if (Array.isArray(this.currentData)) {
            // Auto-detect headers from first object
            if (this.currentData.length > 0 && typeof this.currentData[0] === 'object') {
                headers = Object.keys(this.currentData[0]);
                rows = this.currentData.map(item => headers.map(header => {
                    const value = item[header];
                    // Handle nested objects (like {text: "...", link: "..."})
                    if (typeof value === 'object' && value !== null) {
                        return value;
                    }
                    return value || '';
                }));
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
        if (!this.currentData) return;

        // Handle different data structures
        if (this.currentData.tables && this.currentData.tables[0]) {
            // MTE USK format
            const currentValue = this.currentData.tables[0].rows[rowIndex][fieldIndex];

            // If current value is an object, preserve the structure
            if (typeof currentValue === 'object' && currentValue !== null && currentValue.text !== undefined) {
                this.currentData.tables[0].rows[rowIndex][fieldIndex].text = value;
            } else {
                this.currentData.tables[0].rows[rowIndex][fieldIndex] = value;
            }
        } else if (Array.isArray(this.currentData)) {
            // Array format (JSONL)
            const obj = this.currentData[rowIndex];
            const keys = Object.keys(obj);
            const fieldName = keys[fieldIndex];
            const currentValue = obj[fieldName];

            // If current value is an object, preserve the structure
            if (typeof currentValue === 'object' && currentValue !== null && currentValue.text !== undefined) {
                obj[fieldName].text = value;
            } else {
                obj[fieldName] = value;
            }
        }

        this.markAsModified();
        console.log(`Updated field [${rowIndex}][${fieldIndex}] to:`, value);
    }

    updateFieldLink(rowIndex, fieldIndex, link) {
        if (!this.currentData) return;

        // Handle different data structures
        if (this.currentData.tables && this.currentData.tables[0]) {
            // MTE USK format
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
        } else if (Array.isArray(this.currentData)) {
            // Array format (JSONL)
            const obj = this.currentData[rowIndex];
            const keys = Object.keys(obj);
            const fieldName = keys[fieldIndex];
            const currentValue = obj[fieldName];

            // If link is provided and current value is not an object, convert it
            if (link && link.trim() !== '') {
                if (typeof currentValue === 'object' && currentValue !== null) {
                    obj[fieldName].link = link;
                } else {
                    // Convert string to object with link
                    obj[fieldName] = {
                        text: currentValue || '',
                        link: link
                    };
                }
            } else {
                // If link is empty and current value is an object, convert back to string
                if (typeof currentValue === 'object' && currentValue !== null && currentValue.text !== undefined) {
                    obj[fieldName] = currentValue.text;
                }
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
        if (!this.currentData) return;

        let newIndex = 0;

        // Handle different data structures
        if (this.currentData.tables && this.currentData.tables[0]) {
            // MTE USK format
            const headers = this.currentData.tables[0].headers;
            const newRow = headers.map((header, index) => {
                if (header === 'No') {
                    return String(this.currentData.tables[0].rows.length + 1);
                }
                return '';
            });

            this.currentData.tables[0].rows.push(newRow);
            newIndex = this.currentData.tables[0].rows.length - 1;
            this.showStatus('modified', `Publikasi baru ditambahkan. Total: ${this.currentData.tables[0].rows.length} publikasi`);
        } else if (Array.isArray(this.currentData)) {
            // Array format (JSONL)
            if (this.currentData.length > 0) {
                const template = { ...this.currentData[0] };
                // Reset all values and set No
                Object.keys(template).forEach(key => {
                    if (key === 'No') {
                        template[key] = String(this.currentData.length + 1);
                    } else {
                        template[key] = '';
                    }
                });
                this.currentData.push(template);
            } else {
                // Empty array, create default structure
                this.currentData.push({
                    "No": "1",
                    "Nama Penulis": "",
                    "Judul": "",
                    "Keterangan": ""
                });
            }
            newIndex = this.currentData.length - 1;
            this.showStatus('modified', `Publikasi baru ditambahkan. Total: ${this.currentData.length} publikasi`);
        }

        // Regenerate the entire form to include the new publication
        this.generateForm();
        this.markAsModified();

        // Scroll to the new publication
        setTimeout(() => {
            const newPubElement = document.querySelector(`[data-index="${newIndex}"]`);
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
        if (!this.currentData) return;

        let totalPublications = 0;

        // Get total publications based on data structure
        if (this.currentData.tables && this.currentData.tables[0]) {
            totalPublications = this.currentData.tables[0].rows.length;
        } else if (Array.isArray(this.currentData)) {
            totalPublications = this.currentData.length;
        }

        if (totalPublications <= 1) {
            this.showStatus('error', 'Tidak dapat menghapus publikasi terakhir. Minimal harus ada 1 publikasi.');
            return;
        }

        if (confirm(`Yakin ingin menghapus publikasi #${index + 1}?`)) {
            // Handle different data structures
            if (this.currentData.tables && this.currentData.tables[0]) {
                // MTE USK format
                this.currentData.tables[0].rows.splice(index, 1);

                // Renumber the remaining publications
                this.currentData.tables[0].rows.forEach((row, idx) => {
                    if (this.currentData.tables[0].headers[0] === 'No') {
                        row[0] = String(idx + 1);
                    }
                });

                this.showStatus('modified', `Publikasi berhasil dihapus. Total: ${this.currentData.tables[0].rows.length} publikasi`);
            } else if (Array.isArray(this.currentData)) {
                // Array format (JSONL)
                this.currentData.splice(index, 1);

                // Renumber the remaining publications
                this.currentData.forEach((obj, idx) => {
                    if (obj.hasOwnProperty('No')) {
                        obj['No'] = String(idx + 1);
                    }
                });

                this.showStatus('modified', `Publikasi berhasil dihapus. Total: ${this.currentData.length} publikasi`);
            }

            this.generateForm();
            this.markAsModified();
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
        // Ensure .json extension
        let fileName = this.currentFileName || 'data.json';
        if (!fileName.endsWith('.json')) {
            fileName = fileName.replace(/\.[^/.]+$/, '') + '.json';
        }
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showStatus('saved', `File JSON ${fileName} berhasil didownload`);
    }

    downloadJSONL() {
        if (!this.currentData) return;

        let jsonlString = '';

        // Convert current data to JSONL format
        if (this.currentData.tables && this.currentData.tables[0]) {
            // Convert from MTE USK format to JSONL
            const headers = this.currentData.tables[0].headers;
            const rows = this.currentData.tables[0].rows;

            rows.forEach(row => {
                const obj = {};
                headers.forEach((header, index) => {
                    obj[header] = row[index] || '';
                });
                jsonlString += JSON.stringify(obj) + '\n';
            });
        } else if (Array.isArray(this.currentData)) {
            // Already in array format, convert each object to JSONL
            this.currentData.forEach(obj => {
                jsonlString += JSON.stringify(obj) + '\n';
            });
        } else {
            // Single object, convert to JSONL
            jsonlString = JSON.stringify(this.currentData) + '\n';
        }

        const blob = new Blob([jsonlString], { type: 'application/x-jsonlines' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        // Ensure .jsonl extension
        let fileName = this.currentFileName || 'data.jsonl';
        if (!fileName.endsWith('.jsonl')) {
            fileName = fileName.replace(/\.[^/.]+$/, '') + '.jsonl';
        }
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showStatus('saved', `File JSONL ${fileName} berhasil didownload`);
    }

    markAsModified() {
        this.isModified = true;
        this.updateUI();
        this.showStatus('modified', 'Data telah dimodifikasi');
    }

    updateUI() {
        const saveBtn = document.getElementById('saveBtn');
        const downloadDropdown = document.getElementById('downloadDropdown');
        const exportCsvBtn = document.getElementById('exportCsvBtn');
        const actionButtons = document.getElementById('actionButtons');

        const hasData = this.currentData !== null;

        saveBtn.disabled = !hasData;
        downloadDropdown.disabled = !hasData;
        exportCsvBtn.disabled = !hasData;
        actionButtons.style.display = hasData ? 'block' : 'none';

        // Update file info
        const fileInfo = document.getElementById('fileInfo');
        if (hasData) {
            let rowCount = 0;

            // Get row count based on data structure
            if (this.currentData.tables && this.currentData.tables[0]) {
                rowCount = this.currentData.tables[0].rows?.length || 0;
            } else if (Array.isArray(this.currentData)) {
                rowCount = this.currentData.length;
            }

            fileInfo.textContent = `${this.currentFileName} (${this.fileType.toUpperCase()}) - ${rowCount} publikasi`;
        } else {
            fileInfo.textContent = 'Belum ada file dimuat';
        }
    }

    filterPublications() {
        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const yearFilter = document.getElementById('yearFilter')?.value || '';

        if (!this.currentData) return;

        const publications = document.querySelectorAll('.publication-item');
        let visibleCount = 0;

        publications.forEach((pub, index) => {
            let searchContent = '';

            // Get data based on structure
            if (this.currentData.tables && this.currentData.tables[0]) {
                // MTE USK format
                const row = this.currentData.tables[0].rows[index];
                if (!row) return;
                searchContent = row.map(cell => {
                    if (typeof cell === 'object' && cell !== null && cell.text) {
                        return cell.text;
                    }
                    return cell || '';
                }).join(' ').toLowerCase();
            } else if (Array.isArray(this.currentData)) {
                // Array format (JSONL)
                const obj = this.currentData[index];
                if (!obj) return;
                searchContent = Object.values(obj).map(value => {
                    if (typeof value === 'object' && value !== null && value.text) {
                        return value.text;
                    }
                    return value || '';
                }).join(' ').toLowerCase();
            }

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
