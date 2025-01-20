document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ee-form');
    
    // Initialize form validation and handling
    initializeForm();
    
    form.addEventListener('submit', handleFormSubmit);
});

function initializeForm() {
    // Add any additional initialization logic here
    const requiresDesignatedSelect = document.getElementById('requires-designated');
    const alignedHighestSelect = document.getElementById('aligned-highest');
    
    // Add change event listeners for conditional fields
    requiresDesignatedSelect.addEventListener('change', handleRequiresDesignatedChange);
    alignedHighestSelect.addEventListener('change', handleAlignedHighestChange);
}

function handleRequiresDesignatedChange(event) {
    const value = event.target.value;
    const subsequentFields = document.querySelectorAll('.ee-subsequent-fields');
    
    subsequentFields.forEach(field => {
        field.style.display = value === 'Yes' ? 'block' : 'none';
    });
}

function handleAlignedHighestChange(event) {
    const value = event.target.value;
    const justificationSection = document.querySelector('.justification-section');
    
    if (justificationSection) {
        justificationSection.style.display = value === 'No' ? 'block' : 'none';
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    try {
        const formData = collectFormData();
        exportToExcel(formData);
        showSuccessMessage();
    } catch (error) {
        console.error('Form submission error:', error);
        showErrorMessage();
    }
}

function collectFormData() {
    return {
        // Audit and Record Questions
        "1. Date of completion of this document": getValue('date-completion'),
        "2. Department or division in which the position will work": getValue('department'),
        "3. Job title of the position": getValue('job-title'),
        "4. Occupational level of the said position": getValue('occupational-level'),
        "5. Urgency level for new appointment": getValue('urgency-level'),
        "6. New position or replacement position": getValue('position-type'),
        
        // EE Plan Questions
        "7.1 Is the position being considered one that requires a specific designated person": getValue('requires-designated'),
        "7.4.1 Highest Priority Target Group": getValue('priority-highest'),
        "7.4.2 Next Highest Priority Target Group": getValue('priority-next'),
        "7.4.3 Third Highest Priority Target Group": getValue('priority-third'),
        "8. Is the preferred candidate aligned to highest priority": getValue('aligned-highest'),
        "8.3 What is the sub-race and gender group of the preferred candidate": getValue('preferred-candidate-group'),
        
        // Candidate Assessment
        "9.1 Qualifications": getValue('qualifications'),
        "9.2 Prior learning": getValue('prior-learning'),
        "9.3 Relevant experience": getValue('relevant-experience'),
        "9.4 Time to acquire competencies": getValue('competency-time'),
        
        // Evidence Record
        "10.1 The job profile": getValue('job-profile'),
        "10.2 The channels in which it was advertised": getValue('advertising-channels'),
        "10.3 The core response numbers": getValue('response-numbers'),
        "10.4.1 The sub-race, gender and disability demographics": getValue('shortlist-demographics'),
        "10.4.2 The primary reason why the highest priority candidate was not selected": getValue('non-selection-reason'),
        
        // Sign-off
        "11.1 Recruiting line manager": getValue('recruiting-manager'),
        "11.2 Senior manager responsible for EE": getValue('senior-manager'),
        "11.3 CEO or their designated appointee": getValue('ceo')
    };
}

function getValue(elementId) {
    const element = document.getElementById(elementId);
    return element ? element.value : '';
}

function exportToExcel(formData) {
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const wsData = [
        Object.keys(formData),    // Headers
        Object.values(formData)   // Data
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    
    // Style configuration
    const styles = {
        headerStyle: {
            font: { bold: true, color: { rgb: "000000" } },
            fill: { fgColor: { rgb: "CCCCCC" } },
            alignment: { 
                wrapText: true,
                vertical: "top",
                horizontal: "left"
            }
        },
        sectionHeaderStyle: {
            font: { bold: true, color: { rgb: "0000FF" } },
            fill: { fgColor: { rgb: "E6E6FA" } },
            alignment: { 
                wrapText: true,
                vertical: "top",
                horizontal: "left"
            }
        }
    };

    // Apply styles and column widths
    applyWorksheetStyling(ws, styles);
    
    // Add worksheet to workbook and save
    XLSX.utils.book_append_sheet(wb, ws, "EE Deviation Record");
    
    // Generate filename with current date
    const fileName = generateFileName();
    XLSX.writeFile(wb, fileName);
}

function applyWorksheetStyling(ws, styles) {
    // Set column widths
    ws['!cols'] = Array(Object.keys(ws).length).fill({ wch: 50 });
    
    // Apply header styles
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let C = range.s.c; C <= range.e.c; ++C) {
        const address = XLSX.utils.encode_cell({ r: 0, c: C });
        if (!ws[address]) continue;
        
        // Check if this is a section header
        const cellValue = ws[address].v;
        const isSectionHeader = cellValue.startsWith('Section:');
        
        ws[address].s = isSectionHeader ? styles.sectionHeaderStyle : styles.headerStyle;
    }
}

function generateFileName() {
    const date = new Date().toISOString().split('T')[0];
    return `EE_Deviation_Record_${date}.xlsx`;
}

function showSuccessMessage() {
    alert('Form data has been successfully exported to Excel!');
}

function showErrorMessage() {
    alert('There was an error exporting the form data. Please try again or contact support.');
}