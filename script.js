document.addEventListener('DOMContentLoaded', function() {
    // Initialize form with one candidate and one signatory
    initializeForm();

    // Add event listeners
    document.getElementById('add-candidate').addEventListener('click', addCandidate);
    document.getElementById('add-signatory').addEventListener('click', addSignatory);
    document.getElementById('export-excel').addEventListener('click', exportToExcel);
    document.getElementById('export-pdf').addEventListener('click', exportToPDF);
});

// Initialize with one candidate and one signatory
function initializeForm() {
    addCandidate();
    addSignatory();
}

function addCandidate() {
    const container = document.getElementById('candidates-container');
    const candidateCount = container.children.length + 1;
    const candidateSection = document.createElement('div');
    candidateSection.className = 'candidate-section';
    candidateSection.setAttribute('data-candidate-number', candidateCount);
    candidateSection.innerHTML = `
        <h4 style="color: #1e3a5f; margin-bottom: 15px;">Candidate ${candidateCount}</h4>
        <label for="qualifications-${candidateCount}">7.1 Qualifications:</label>
        <textarea id="qualifications-${candidateCount}"></textarea>

        <label for="prior-learning-${candidateCount}">7.2 Prior learning:</label>
        <textarea id="prior-learning-${candidateCount}"></textarea>

        <label for="relevant-experience-${candidateCount}">7.3 Relevant experience:</label>
        <textarea id="relevant-experience-${candidateCount}"></textarea>

        <label for="competency-time-${candidateCount}">7.4 How long would it take for the candidate to acquire the competencies?</label>
        <select id="competency-time-${candidateCount}">
            <option value="">Select timeframe</option>
            <option value="1">1 Month</option>
            <option value="2">2 Months</option>
            <option value="3">3 Months</option>
            <option value="4">4 Months</option>
            <option value="5">5 Months</option>
            <option value="6">6 Months</option>
            <option value="7">7 Months</option>
            <option value="8">8 Months</option>
            <option value="9">9 Months</option>
            <option value="10">10 Months</option>
            <option value="11">11 Months</option>
            <option value="12">12 Months</option>
            <option value="more">More than 12 Months</option>
            <option value="not-reasonable">Not within a reasonable time period</option>
        </select>

        <label for="candidate-name-${candidateCount}">Candidate Description/Name:</label>
        <input type="text" id="candidate-name-${candidateCount}" />

        ${candidateCount > 1 ? `<button type="button" class="remove-button" onclick="removeCandidate(this)">Remove Candidate</button>` : ''}
    `;
    container.appendChild(candidateSection);
}

function removeCandidate(button) {
    button.closest('.candidate-section').remove();
    renumberCandidates();
}

function renumberCandidates() {
    const container = document.getElementById('candidates-container');
    const sections = container.querySelectorAll('.candidate-section');
    sections.forEach((section, index) => {
        const candidateNum = index + 1;
        section.setAttribute('data-candidate-number', candidateNum);
        const h4 = section.querySelector('h4');
        if (h4) h4.textContent = `Candidate ${candidateNum}`;
    });
}

function addSignatory() {
    const container = document.getElementById('signatories-container');
    const signatoryCount = container.children.length + 1;
    const signatorySection = document.createElement('div');
    signatorySection.className = 'candidate-section';
    signatorySection.setAttribute('data-signatory-number', signatoryCount);
    signatorySection.innerHTML = `
        <h4 style="color: #1e3a5f; margin-bottom: 15px;">Signatory ${signatoryCount}</h4>
        <label for="position-title-${signatoryCount}">Position Title:</label>
        <input type="text" id="position-title-${signatoryCount}">

        <label for="signatory-name-${signatoryCount}">Name:</label>
        <input type="text" id="signatory-name-${signatoryCount}">

        ${signatoryCount > 1 ? `<button type="button" class="remove-button" onclick="removeSignatory(this)">Remove Signatory</button>` : ''}
    `;
    container.appendChild(signatorySection);
}

function removeSignatory(button) {
    button.closest('.candidate-section').remove();
    renumberSignatories();
}

function renumberSignatories() {
    const container = document.getElementById('signatories-container');
    const sections = container.querySelectorAll('.candidate-section');
    sections.forEach((section, index) => {
        const signatoryNum = index + 1;
        section.setAttribute('data-signatory-number', signatoryNum);
        const h4 = section.querySelector('h4');
        if (h4) h4.textContent = `Signatory ${signatoryNum}`;
    });
}

// Get current date formatted as YYYY-MM-DD
function getFormattedDate() {
    return new Date().toISOString().split('T')[0];
}

// Collect all form data including dynamic candidates and signatories
function getFormData() {
    const formData = {
        "1. Date of Completion": document.getElementById('date-completion').value || '-',
        "2. Department/Division": document.getElementById('department').value || '-',
        "3. Job Title": document.getElementById('job-title').value || '-',
        "4. Occupational Level": document.getElementById('occupational-level').value || '-',
        "5.1 Requires Designated Person": document.getElementById('requires-designated').value || '-',
        "5.4.1 Highest Priority Target Group": document.getElementById('priority-highest').value || '-',
        "5.4.2 Second Priority Target Group": document.getElementById('priority-second').value || '-',
        "5.4.3 Third Priority Target Group": document.getElementById('priority-third').value || '-',
        "6. Aligned to Highest Priority": document.getElementById('aligned-highest').value || '-',
        "6.3 Preferred Candidate Group": document.getElementById('preferred-candidate-group').value || '-'
    };

    // Collect all candidates
    const candidatesContainer = document.getElementById('candidates-container');
    const candidateSections = candidatesContainer.querySelectorAll('.candidate-section');
    
    candidateSections.forEach((section, index) => {
        const candidateNum = index + 1;
        const prefix = `Candidate ${candidateNum}`;
        
        formData[`${prefix} - Name/Description`] = document.getElementById(`candidate-name-${candidateNum}`)?.value || '-';
        formData[`${prefix} - 7.1 Qualifications`] = document.getElementById(`qualifications-${candidateNum}`)?.value || '-';
        formData[`${prefix} - 7.2 Prior Learning`] = document.getElementById(`prior-learning-${candidateNum}`)?.value || '-';
        formData[`${prefix} - 7.3 Relevant Experience`] = document.getElementById(`relevant-experience-${candidateNum}`)?.value || '-';
        formData[`${prefix} - 7.4 Time to Acquire Competencies`] = document.getElementById(`competency-time-${candidateNum}`)?.value || '-';
    });

    // Evidence section
    formData["8.1 Job Profile"] = document.getElementById('job-profile').value || '-';
    formData["8.2 Advertising Channels"] = document.getElementById('advertising-channels').value || '-';
    formData["8.3 Response Numbers"] = document.getElementById('response-numbers').value || '-';
    formData["8.4.1 Shortlist Demographics"] = document.getElementById('shortlist-demographics').value || '-';
    formData["8.4.2 Non-selection Reason"] = document.getElementById('non-selection-reason').value || '-';

    // Collect all signatories
    const signatoriesContainer = document.getElementById('signatories-container');
    const signatorySections = signatoriesContainer.querySelectorAll('.candidate-section');
    
    signatorySections.forEach((section, index) => {
        const signatoryNum = index + 1;
        const prefix = `Signatory ${signatoryNum}`;
        
        formData[`${prefix} - Position Title`] = document.getElementById(`position-title-${signatoryNum}`)?.value || '-';
        formData[`${prefix} - Name`] = document.getElementById(`signatory-name-${signatoryNum}`)?.value || '-';
    });

    return formData;
}

// Excel Export Function
function exportToExcel() {
    try {
        const formData = getFormData();
        
        // Create worksheet data in vertical format (Field | Value)
        const wsData = [];
        
        // Add header row
        wsData.push(['Field', 'Value']);
        
        // Add all data rows
        Object.entries(formData).forEach(([key, value]) => {
            wsData.push([key, value]);
        });

        // Create workbook
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(wsData);

        // Set column widths
        ws['!cols'] = [
            { wch: 50 },  // Field column
            { wch: 80 }   // Value column
        ];

        // Style the header row
        const headerStyle = {
            font: { 
                bold: true,
                color: { rgb: "FFFFFF" }
            },
            fill: { 
                fgColor: { rgb: "1E3A5F" }
            },
            alignment: { 
                wrapText: true, 
                vertical: "top",
                horizontal: "left"
            }
        };

        // Apply header style to first row
        if (ws['A1']) ws['A1'].s = headerStyle;
        if (ws['B1']) ws['B1'].s = headerStyle;

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(wb, ws, "EE Deviation Record");

        // Generate filename and save
        const fileName = `EE_Deviation_Record_${getFormattedDate()}.xlsx`;
        XLSX.writeFile(wb, fileName);

        alert('Excel file has been generated successfully!');
    } catch (error) {
        console.error('Excel export error:', error);
        alert('Error exporting to Excel. Please try again.');
    }
}

// PDF Export Function
function exportToPDF() {
    try {
        const formData = getFormData();
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Set document properties
        doc.setProperties({
            title: 'Employment Equity Deviation Record',
            subject: 'EE Deviation Record',
            author: 'Global Business Solutions',
            keywords: 'employment equity, deviation record',
            creator: 'DEEVIATE System'
        });

        // Add title
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text('Employment Equity Deviation Record', 105, 15, { align: 'center' });
        
        // Add date
        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text(`Generated: ${getFormattedDate()}`, 105, 25, { align: 'center' });

        // Prepare table data
        const tableData = Object.entries(formData).map(([key, value]) => {
            return [key, value];
        });

        // Add table with better formatting
        doc.autoTable({
            startY: 30,
            head: [['Field', 'Value']],
            body: tableData,
            headStyles: {
                fillColor: [30, 58, 95],
                textColor: 255,
                fontSize: 11,
                fontStyle: 'bold',
                cellPadding: 4
            },
            bodyStyles: {
                fontSize: 9,
                cellPadding: 3,
                valign: 'top'
            },
            columnStyles: {
                0: { cellWidth: 70, fontStyle: 'bold' },
                1: { cellWidth: 'auto' }
            },
            margin: { top: 30, right: 15, bottom: 20, left: 15 },
            theme: 'grid',
            tableWidth: 'auto',
            styles: {
                overflow: 'linebreak',
                cellWidth: 'wrap'
            },
            didDrawPage: function(data) {
                // Add footer on each page
                doc.setFontSize(8);
                doc.setFont(undefined, 'normal');
                doc.text('Global Business Solutions - Employment Equity Deviation Record', 
                    data.settings.margin.left,
                    doc.internal.pageSize.height - 10);
                doc.text(`Page ${data.pageCount}`, 
                    doc.internal.pageSize.width - 20,
                    doc.internal.pageSize.height - 10);
            }
        });

        // Generate filename and save
        const fileName = `EE_Deviation_Record_${getFormattedDate()}.pdf`;
        doc.save(fileName);

        alert('PDF file has been generated successfully!');
    } catch (error) {
        console.error('PDF export error:', error);
        alert('Error exporting to PDF. Please try again.');
    }
}
