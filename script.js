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
                    title: "Candidate Assessment",
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
        
        // Process each section
        structuredData.sections.forEach(section => {
            // Add basic fields
            if (section.fields) {
                section.fields.forEach(field => {
                    flatData[field.label] = field.value;
                });
            }
            
            // Add competency time entries
            if (section.competencyTimeEntries) {
                section.competencyTimeEntries.forEach((entry, index) => {
                    flatData[`${entry.label} Time to Acquire Competencies`] = entry.time;
                    flatData[`${entry.label} Description`] = entry.description;
                });
            }
            
            // Add signoff entries
            if (section.signoffEntries) {
                section.signoffEntries.forEach((entry, index) => {
                    flatData[`${entry.label} Position`] = entry.position;
                    flatData[`${entry.label} Name`] = entry.name;
                });
            }
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
            
            // Create a worksheet with all data in a structured format
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
                
                // Add competency time entries
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
            
            // Create worksheet
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
            
            // Add main worksheet to workbook
            XLSX.utils.book_append_sheet(wb, mainWs, "EE Deviation Record");
            
            // Generate summary worksheet with just the base information
            const summaryData = [['Field', 'Value']];
            
            // Flatten all basic fields for the summary
            structuredData.sections.forEach(section => {
                if (section.fields) {
                    section.fields.forEach(field => {
                        summaryData.push([field.label, field.value]);
                    });
                }
            });
            
            // Create summary worksheet
            const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
            
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
            
            // Set column widths for summary sheet
            summaryWs['!cols'] = columnWidths;
            
            // Add summary worksheet to workbook
            XLSX.utils.book_append_sheet(wb, summaryWs, "Summary");
            
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

            // Define styles
            const styles = {
                title: { fontSize: 16, fontStyle: 'bold', textColor: [46, 90, 171] },
                date: { fontSize: 10, textColor: [102, 102, 102] },
                sectionTitle: { fontSize: 12, fontStyle: 'bold', textColor: [255, 255, 255], fillColor: [46, 90, 171] },
                fieldLabel: { fontSize: 10, fontStyle: 'bold' },
                fieldValue: { fontSize: 10 },
                pageFooter: { fontSize: 8, textColor: [102, 102, 102] }
            };

            // Start position
            let yPos = 20;
            const margin = 15;
            const pageWidth = doc.internal.pageSize.width;
            const contentWidth = pageWidth - (margin * 2);

            // Helper function to add page number footer
            function addFooter() {
                doc.setFontSize(styles.pageFooter.fontSize);
                doc.setTextColor(...styles.pageFooter.textColor);
                doc.text('Global Business Solutions - Employment Equity Deviation Record', 
                    margin, doc.internal.pageSize.height - 10);
                doc.text(`Page ${doc.internal.getNumberOfPages()}`, 
                    pageWidth - margin - 15, doc.internal.pageSize.height - 10);
            }

            // Helper function to check if we need a new page
            function checkNewPage(heightNeeded) {
                const currentPage = doc.internal.getNumberOfPages();
                if (yPos + heightNeeded > doc.internal.pageSize.height - 20) {
                    addFooter();
                    doc.addPage();
                    yPos = 20;
                    return true;
                }
                return false;
            }

            // Add title
            doc.setFontSize(styles.title.fontSize);
            doc.setFont(undefined, styles.title.fontStyle);
            doc.setTextColor(...styles.title.textColor);
            doc.text(structuredData.documentInfo.title, pageWidth / 2, yPos, { align: 'center' });
            yPos += 10;

            // Add date
            doc.setFontSize(styles.date.fontSize);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(...styles.date.textColor);
            doc.text(`Generated: ${structuredData.documentInfo.generatedDate}`, pageWidth / 2, yPos, { align: 'center' });
            yPos += 15;

            // Process each section
            structuredData.sections.forEach((section, sectionIndex) => {
                // Check if we need a new page for the section
                checkNewPage(40);  // Estimate height for section header + first few fields

                // Add section header with background
                doc.setFillColor(...styles.sectionTitle.fillColor);
                doc.rect(margin, yPos - 5, contentWidth, 10, 'F');
                doc.setTextColor(...styles.sectionTitle.textColor);
                doc.setFontSize(styles.sectionTitle.fontSize);
                doc.setFont(undefined, styles.sectionTitle.fontStyle);
                doc.text(section.title, margin + 5, yPos, { align: 'left' });
                yPos += 10;

                // Add basic fields
                if (section.fields) {
                    section.fields.forEach(field => {
                        // Format long text values
                        let valueLines = [];
                        if (field.value.length > 80) {
                            // Split long values into multiple lines for readability
                            const chunks = field.value.match(/.{1,80}(?:\s|$)/g);
                            if (chunks) valueLines = chunks;
                            else valueLines = [field.value];
                        } else {
                            valueLines = [field.value];
                        }

                        // Check if we need a new page
                        const fieldHeight = 5 + (valueLines.length * 5);
                        checkNewPage(fieldHeight);

                        // Add field label
                        doc.setTextColor(0, 0, 0);
                        doc.setFontSize(styles.fieldLabel.fontSize);
                        doc.setFont(undefined, styles.fieldLabel.fontStyle);
                        doc.text(field.label, margin, yPos);
                        yPos += 5;

                        // Add field value
                        doc.setFontSize(styles.fieldValue.fontSize);
                        doc.setFont(undefined, 'normal');
                        valueLines.forEach(line => {
                            doc.text(line, margin + 5, yPos);
                            yPos += 5;
                        });

                        yPos += 2; // Add a little space after each field
                    });
                }

                // Add competency time entries
                if (section.competencyTimeEntries) {
                    section.competencyTimeEntries.forEach((entry, index) => {
                        // Check if we need a new page
                        checkNewPage(25);

                        // Add entry header
                        doc.setFontSize(styles.fieldLabel.fontSize);
                        doc.setFont(undefined, styles.fieldLabel.fontStyle);
                        doc.text(entry.label, margin, yPos);
                        yPos += 5;

                        // Time to Acquire
                        doc.setFontSize(styles.fieldLabel.fontSize);
                        doc.setFont(undefined, 'normal');
                        doc.text(`Time to Acquire Competencies: ${entry.time}`, margin + 5, yPos);
                        yPos += 5;

                        // Description
                        let descLines = [];
                        if (entry.description.length > 80) {
                            const chunks = entry.description.match(/.{1,80}(?:\s|$)/g);
                            if (chunks) descLines = chunks;
                            else descLines = [entry.description];
                        } else {
                            descLines = [entry.description];
                        }

                        doc.text(`Candidate Description/Name:`, margin + 5, yPos);
                        yPos += 5;
                        
                        descLines.forEach(line => {
                            doc.text(line, margin + 10, yPos);
                            yPos += 5;
                        });

                        yPos += 2; // Add a little space after each entry
                    });
                }

                // Add signoff entries
                if (section.signoffEntries) {
                    section.signoffEntries.forEach((entry, index) => {
                        // Check if we need a new page
                        checkNewPage(20);

                        // Add entry header
                        doc.setFontSize(styles.fieldLabel.fontSize);
                        doc.setFont(undefined, styles.fieldLabel.fontStyle);
                        doc.text(entry.label, margin, yPos);
                        yPos += 5;

                        // Position
                        doc.setFontSize(styles.fieldLabel.fontSize);
                        doc.setFont(undefined, 'normal');
                        doc.text(`Position: ${entry.position}`, margin + 5, yPos);
                        yPos += 5;

                        // Name
                        doc.text(`Name: ${entry.name}`, margin + 5, yPos);
                        yPos += 5;

                        yPos += 2; // Add a little space after each entry
                    });
                }

                yPos += 5; // Add space after each section
            });

            // Add footer on the last page
            addFooter();

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