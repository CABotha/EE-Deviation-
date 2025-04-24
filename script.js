document.addEventListener('DOMContentLoaded', function() {
    // Initialize form elements
    const form = document.getElementById('ee-form');
    const excelBtn = document.getElementById('export-excel');
    const pdfBtn = document.getElementById('export-pdf');
    const addCompetencyBtn = document.getElementById('add-competency-field');
    const addSignoffBtn = document.getElementById('add-signoff-field');
    let competencyCounter = 1; // Start at 1 because we already have 0
    let signoffCounter = 1; // Start at 1 because we already have 0

    // Add another competency time field
    addCompetencyBtn.addEventListener('click', function() {
        const container = document.getElementById('competency-time-container');
        const newSection = document.createElement('div');
        newSection.className = 'competency-time-section';
        
        newSection.innerHTML = `
            <label for="competency-time-${competencyCounter}">9.4 How long would it take for the candidate to acquire the competencies?</label>
            <select id="competency-time-${competencyCounter}" class="competency-time" required>
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
            
            <label for="candidate-description-${competencyCounter}">Candidate Description/Name:</label>
            <input type="text" id="candidate-description-${competencyCounter}" class="candidate-description">
            
            <button type="button" class="remove-field-btn">Remove</button>
        `;
        
        container.appendChild(newSection);
        competencyCounter++;
        
        // Add event listener to the new remove button
        newSection.querySelector('.remove-field-btn').addEventListener('click', function() {
            newSection.remove();
        });
    });
    
    // Add another signoff field
    addSignoffBtn.addEventListener('click', function() {
        const container = document.getElementById('signoff-container');
        const newSection = document.createElement('div');
        newSection.className = 'signoff-section';
        
        newSection.innerHTML = `
            <label for="signoff-position-${signoffCounter}">Position Title:</label>
            <input type="text" id="signoff-position-${signoffCounter}" class="signoff-position">
            
            <label for="signoff-name-${signoffCounter}">Name:</label>
            <input type="text" id="signoff-name-${signoffCounter}" class="signoff-name">
            
            <button type="button" class="remove-field-btn">Remove</button>
        `;
        
        container.appendChild(newSection);
        signoffCounter++;
        
        // Add event listener to the new remove button
        newSection.querySelector('.remove-field-btn').addEventListener('click', function() {
            newSection.remove();
        });
    });

    // Get current date formatted as YYYY-MM-DD
    function getFormattedDate() {
        return new Date().toISOString().split('T')[0];
    }

    // Collect form data in a structured way
    function getStructuredFormData() {
        // Get all competency time entries
        const competencyTimeEntries = Array.from(document.querySelectorAll('.competency-time-section')).map((section, index) => {
            const timeSelect = section.querySelector('.competency-time');
            const description = section.querySelector('.candidate-description');
            return {
                time: timeSelect ? timeSelect.value || '-' : '-',
                description: description ? description.value || '-' : '-'
            };
        });

        // Get all signoff entries
        const signoffEntries = Array.from(document.querySelectorAll('.signoff-section')).map((section, index) => {
            const position = section.querySelector('.signoff-position');
            const name = section.querySelector('.signoff-name');
            return {
                position: position ? position.value || '-' : '-',
                name: name ? name.value || '-' : '-'
            };
        });

        // Structure data by sections
        return {
            documentInfo: {
                title: "Employment Equity Deviation Record",
                generatedDate: getFormattedDate()
            },
            sections: [
                {
                    title: "Basic Information",
                    fields: [
                        { label: "1. Date of Completion", value: document.getElementById('date-completion').value || '-' },
                        { label: "2. Department/Division", value: document.getElementById('department').value || '-' },
                        { label: "3. Job Title", value: document.getElementById('job-title').value || '-' },
                        { label: "4. Occupational Level", value: document.getElementById('occupational-level').value || '-' },
                        { label: "5. Urgency Level", value: document.getElementById('urgency-level').value || '-' },
                        { label: "6. Position Type", value: document.getElementById('position-type').value || '-' }
                    ]
                },
                {
                    title: "Employment Equity Plan Information",
                    fields: [
                        { label: "7.1 Requires Designated Person", value: document.getElementById('requires-designated').value || '-' },
                        { label: "7.4.1 Highest Priority Target Group", value: document.getElementById('priority-highest').value || '-' },
                        { label: "7.4.2 Next Priority Target Group", value: document.getElementById('priority-next').value || '-' },
                        { label: "7.4.3 Third Priority Target Group", value: document.getElementById('priority-third').value || '-' },
                        { label: "8. Aligned to Highest Priority", value: document.getElementById('aligned-highest').value || '-' },
                        { label: "8.3 Preferred Candidate Group", value: document.getElementById('preferred-candidate-group').value || '-' }
                    ]
                },
                {
                    title: "Candidate Assessment and Justification",
                    fields: [
                        { label: "9.1 Qualifications", value: document.getElementById('qualifications').value || '-' },
                        { label: "9.2 Prior Learning", value: document.getElementById('prior-learning').value || '-' },
                        { label: "9.3 Relevant Experience", value: document.getElementById('relevant-experience').value || '-' }
                    ],
                    competencyTimeEntries: competencyTimeEntries.map((entry, index) => ({
                        label: `9.4 Candidate ${index+1}`,
                        time: entry.time,
                        description: entry.description
                    }))
                },
                {
                    title: "Evidence Record",
                    fields: [
                        { label: "10.1 Job Profile", value: document.getElementById('job-profile').value || '-' },
                        { label: "10.2 Advertising Channels", value: document.getElementById('advertising-channels').value || '-' },
                        { label: "10.3 Response Numbers", value: document.getElementById('response-numbers').value || '-' },
                        { label: "10.4.1 Shortlist Demographics", value: document.getElementById('shortlist-demographics').value || '-' },
                        { label: "10.4.2 Non-selection Reason", value: document.getElementById('non-selection-reason').value || '-' }
                    ]
                },
                {
                    title: "Sign-off",
                    signoffEntries: signoffEntries.map((entry, index) => ({
                        label: `Sign-off ${index+1}`,
                        position: entry.position,
                        name: entry.name
                    }))
                }
            ]
        };
    }

    // Convert structured data to flat format (for backward compatibility)
    function flattenFormData(structuredData) {
        const flatData = {};
        
        // First collect all fields in the correct order
        const orderedFields = [];
        
        // Process each section and maintain proper ordering
        structuredData.sections.forEach(section => {
            // Add basic fields
            if (section.fields) {
                section.fields.forEach(field => {
                    orderedFields.push({ key: field.label, value: field.value });
                });
            }
            
            // Add competency time entries immediately after section 9.3 if this is the candidate assessment section
            if (section.competencyTimeEntries && section.title.includes("Candidate Assessment")) {
                section.competencyTimeEntries.forEach((entry, index) => {
                    orderedFields.push({ key: `${entry.label} Time to Acquire Competencies`, value: entry.time });
                    orderedFields.push({ key: `${entry.label} Description`, value: entry.description });
                });
            }
        });
        
        // Add signoff entries at the end
        const signoffSection = structuredData.sections.find(section => section.title === "Sign-off");
        if (signoffSection && signoffSection.signoffEntries) {
            signoffSection.signoffEntries.forEach((entry, index) => {
                orderedFields.push({ key: `${entry.label} Position`, value: entry.position });
                orderedFields.push({ key: `${entry.label} Name`, value: entry.name });
            });
        }
        
        // Convert ordered fields to flat data
        orderedFields.forEach(item => {
            flatData[item.key] = item.value;
        });
        
        return flatData;
    }

    // Helper function for Excel styling
    function getCellStyle(type) {
        const styles = {
            header: {
                font: { bold: true, color: { rgb: "FFFFFF" } },
                fill: { fgColor: { rgb: "2E5AAB" } },
                alignment: { wrapText: true, vertical: "top", horizontal: "center" }
            },
            sectionHeader: {
                font: { bold: true, color: { rgb: "FFFFFF" } },
                fill: { fgColor: { rgb: "4472C4" } },
                alignment: { wrapText: true, vertical: "top", horizontal: "left" }
            },
            label: {
                font: { bold: true },
                fill: { fgColor: { rgb: "E6EFF9" } },
                alignment: { wrapText: true, vertical: "top", horizontal: "left" }
            },
            value: {
                alignment: { wrapText: true, vertical: "top", horizontal: "left" }
            }
        };
        
        return styles[type] || {};
    }

    // Improved Excel Export Function
    function exportToExcel() {
        try {
            const structuredData = getStructuredFormData();
            const wb = XLSX.utils.book_new();
            
            // Define column widths
            const columnWidths = [
                { wch: 40 }, // Label column
                { wch: 60 }  // Value column
            ];
            
            // Create worksheet for summary view (flat table format)
            const flatData = flattenFormData(structuredData);
            const summaryData = [['Field', 'Value']];
            
            // Add all fields in the flattened data (which preserves proper ordering)
            Object.entries(flatData).forEach(([key, value]) => {
                summaryData.push([key, value]);
            });
            
            // Create summary worksheet
            const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
            summaryWs['!cols'] = columnWidths;
            
            // Apply styles to summary sheet
            const summaryRange = XLSX.utils.decode_range(summaryWs['!ref']);
            for (let R = summaryRange.s.r; R <= summaryRange.e.r; ++R) {
                for (let C = summaryRange.s.c; C <= summaryRange.e.c; ++C) {
                    const address = XLSX.utils.encode_cell({ r: R, c: C });
                    if (!summaryWs[address]) continue;
                    
                    if (R === 0) {
                        // Header row
                        summaryWs[address].s = getCellStyle('header');
                    } else if (C === 0) {
                        // Label column
                        summaryWs[address].s = getCellStyle('label');
                    } else {
                        // Value column
                        summaryWs[address].s = getCellStyle('value');
                    }
                }
            }
            
            // Add summary worksheet as the first sheet (most important view)
            XLSX.utils.book_append_sheet(wb, summaryWs, "EE Deviation Record");
            
            // Create a detailed worksheet with all data in a structured format
            const mainWsData = [];
            
            // Add title
            mainWsData.push([structuredData.documentInfo.title, `Generated: ${structuredData.documentInfo.generatedDate}`]);
            mainWsData.push([]);  // Empty row
            
            // Process each section
            structuredData.sections.forEach(section => {
                // Add section header
                mainWsData.push([section.title, '']);
                
                // Add basic fields
                if (section.fields) {
                    section.fields.forEach(field => {
                        mainWsData.push([field.label, field.value]);
                    });
                }
                
                // Add competency time entries immediately after the basic fields in the candidate section
                if (section.competencyTimeEntries) {
                    section.competencyTimeEntries.forEach(entry => {
                        mainWsData.push([`${entry.label}`, '']);
                        mainWsData.push(['Time to Acquire Competencies', entry.time]);
                        mainWsData.push(['Candidate Description/Name', entry.description]);
                    });
                }
                
                // Add signoff entries
                if (section.signoffEntries) {
                    section.signoffEntries.forEach(entry => {
                        mainWsData.push([`${entry.label}`, '']);
                        mainWsData.push(['Position', entry.position]);
                        mainWsData.push(['Name', entry.name]);
                    });
                }
                
                // Add an empty row after each section except the last one
                mainWsData.push([]);
            });
            
            // Create detailed worksheet
            const mainWs = XLSX.utils.aoa_to_sheet(mainWsData);
            
            // Set column widths
            mainWs['!cols'] = columnWidths;
            
            // Apply styles to the main worksheet
            const range = XLSX.utils.decode_range(mainWs['!ref']);
            
            // Track section row indices
            const sectionRows = [];
            let currentRow = 0;
            
            // Title row
            const titleAddress = XLSX.utils.encode_cell({ r: currentRow, c: 0 });
            if (mainWs[titleAddress]) {
                mainWs[titleAddress].s = {
                    font: { bold: true, sz: 14, color: { rgb: "2E5AAB" } },
                    alignment: { horizontal: "left" }
                };
            }
            currentRow += 2;  // Skip the empty row
            
            // Find section rows
            structuredData.sections.forEach(section => {
                sectionRows.push(currentRow);
                
                // Skip fields
                if (section.fields) {
                    currentRow += section.fields.length;
                }
                
                // Skip competency entries (3 rows per entry)
                if (section.competencyTimeEntries) {
                    currentRow += section.competencyTimeEntries.length * 3;
                }
                
                // Skip signoff entries (3 rows per entry)
                if (section.signoffEntries) {
                    currentRow += section.signoffEntries.length * 3;
                }
                
                // Skip empty row at end of section
                currentRow += 1;
            });
            
            // Apply styles
            for (let R = range.s.r; R <= range.e.r; ++R) {
                for (let C = range.s.c; C <= range.e.c; ++C) {
                    const address = XLSX.utils.encode_cell({ r: R, c: C });
                    if (!mainWs[address]) continue;
                    
                    // Apply styles based on row type
                    if (sectionRows.includes(R)) {
                        // Section header
                        mainWs[address].s = getCellStyle('sectionHeader');
                    } else if (C === 0 && R > 1) {
                        // Label cells (except title and section headers)
                        const isSectionRow = sectionRows.includes(R);
                        const isSubLabelRow = C === 0 && mainWs[address].v && 
                                            (mainWs[address].v === 'Time to Acquire Competencies' || 
                                             mainWs[address].v === 'Candidate Description/Name' ||
                                             mainWs[address].v === 'Position' ||
                                             mainWs[address].v === 'Name');
                        
                        if (!isSectionRow) {
                            // Apply label style with indentation for sub-labels
                            mainWs[address].s = {
                                ...getCellStyle('label'),
                                alignment: {
                                    ...getCellStyle('label').alignment,
                                    indent: isSubLabelRow ? 2 : 0
                                }
                            };
                        }
                    } else if (C === 1 && R > 1) {
                        // Value cells
                        mainWs[address].s = getCellStyle('value');
                    }
                }
            }
            
            // Add detailed worksheet as the second sheet
            XLSX.utils.book_append_sheet(wb, mainWs, "Detailed View");
            
            // Generate filename and save
            const fileName = `EE_Deviation_Record_${getFormattedDate()}.xlsx`;
            XLSX.writeFile(wb, fileName);

            alert('Excel file has been generated successfully!');
        } catch (error) {
            console.error('Excel export error:', error);
            alert('Error exporting to Excel. Please try again.');
        }
    }

    // Improved PDF Export Function
    function exportToPDF() {
        try {
            const structuredData = getStructuredFormData();
            const flatData = flattenFormData(structuredData); // Get properly ordered data
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Set document properties
            doc.setProperties({
                title: 'Employment Equity Deviation Record',
                subject: 'EE Deviation Record',
                author: 'Global Business Solutions',
                keywords: 'employment equity, deviation record',
                creator: 'EE Form System'
            });

            // Add title
            doc.setFontSize(16);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(46, 90, 171);
            doc.text('Employment Equity Deviation Record', 105, 15, { align: 'center' });
            
            // Add date
            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(102, 102, 102);
            doc.text(`Generated: ${getFormattedDate()}`, 105, 25, { align: 'center' });

            // Create a clean table with properly ordered data
            const tableData = Object.entries(flatData).map(([key, value]) => {
                // Process long text by breaking into multiple lines if needed
                let processedValue = value;
                if (typeof value === 'string' && value.length > 80) {
                    processedValue = value.match(/.{1,80}(?:\s|$)/g).join('\n');
                }
                return [key, processedValue];
            });

            // Add table with improved styling
            doc.autoTable({
                startY: 30,
                head: [['Field', 'Value']],
                body: tableData,
                headStyles: {
                    fillColor: [46, 90, 171],
                    textColor: 255,
                    fontSize: 12,
                    fontStyle: 'bold',
                    cellPadding: 5
                },
                bodyStyles: {
                    fontSize: 10,
                    cellPadding: 5
                },
                alternateRowStyles: {
                    fillColor: [240, 245, 255]
                },
                columnStyles: {
                    0: { 
                        cellWidth: 80,
                        fontStyle: 'bold',
                        fillColor: [230, 239, 249]
                    },
                    1: { 
                        cellWidth: 'auto' 
                    }
                },
                margin: { top: 30, right: 15, bottom: 20, left: 15 },
                theme: 'grid',
                tableWidth: 'auto',
                didDrawPage: function(data) {
                    // Add footer on each page
                    doc.setFontSize(8);
                    doc.setTextColor(102, 102, 102);
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

    // Add event listeners
    excelBtn.addEventListener('click', exportToExcel);
    pdfBtn.addEventListener('click', exportToPDF);

    // Prevent form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
    });
});