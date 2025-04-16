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

    // Collect form data
    function getFormData() {
        // Get all competency time entries
        const competencyTimeEntries = Array.from(document.querySelectorAll('.competency-time-section')).map((section, index) => {
            const timeSelect = section.querySelector(`.competency-time`);
            const description = section.querySelector(`.candidate-description`);
            return {
                time: timeSelect ? timeSelect.value || '-' : '-',
                description: description ? description.value || '-' : '-'
            };
        });

        // Get all signoff entries
        const signoffEntries = Array.from(document.querySelectorAll('.signoff-section')).map((section, index) => {
            const position = section.querySelector(`.signoff-position`);
            const name = section.querySelector(`.signoff-name`);
            return {
                position: position ? position.value || '-' : '-',
                name: name ? name.value || '-' : '-'
            };
        });

        const formData = {
            "1. Date of Completion": document.getElementById('date-completion').value || '-',
            "2. Department/Division": document.getElementById('department').value || '-',
            "3. Job Title": document.getElementById('job-title').value || '-',
            "4. Occupational Level": document.getElementById('occupational-level').value || '-',
            "5. Urgency Level": document.getElementById('urgency-level').value || '-',
            "6. Position Type": document.getElementById('position-type').value || '-',
            "7.1 Requires Designated Person": document.getElementById('requires-designated').value || '-',
            "7.4.1 Highest Priority Target Group": document.getElementById('priority-highest').value || '-',
            "7.4.2 Next Priority Target Group": document.getElementById('priority-next').value || '-',
            "7.4.3 Third Priority Target Group": document.getElementById('priority-third').value || '-',
            "8. Aligned to Highest Priority": document.getElementById('aligned-highest').value || '-',
            "8.3 Preferred Candidate Group": document.getElementById('preferred-candidate-group').value || '-',
            "9.1 Qualifications": document.getElementById('qualifications').value || '-',
            "9.2 Prior Learning": document.getElementById('prior-learning').value || '-',
            "9.3 Relevant Experience": document.getElementById('relevant-experience').value || '-',
            "10.1 Job Profile": document.getElementById('job-profile').value || '-',
            "10.2 Advertising Channels": document.getElementById('advertising-channels').value || '-',
            "10.3 Response Numbers": document.getElementById('response-numbers').value || '-',
            "10.4.1 Shortlist Demographics": document.getElementById('shortlist-demographics').value || '-',
            "10.4.2 Non-selection Reason": document.getElementById('non-selection-reason').value || '-'
        };

        // Add competency time entries to form data
        competencyTimeEntries.forEach((entry, index) => {
            formData[`9.4 Candidate ${index+1} Time to Acquire Competencies`] = entry.time;
            formData[`9.4 Candidate ${index+1} Description`] = entry.description;
        });

        // Add signoff entries to form data
        signoffEntries.forEach((entry, index) => {
            formData[`Sign-off ${index+1} Position`] = entry.position;
            formData[`Sign-off ${index+1} Name`] = entry.name;
        });

        return formData;
    }

    // Excel Export Function
    function exportToExcel() {
        try {
            const formData = getFormData();
            
            // Create worksheet data
            const wsData = [
                Object.keys(formData),    // Headers
                Object.values(formData)   // Data row
            ];

            // Create workbook
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(wsData);

            // Set column widths
            const cols = Object.keys(formData).map(() => ({ wch: 50 }));
            ws['!cols'] = cols;

            // Style headers
            const range = XLSX.utils.decode_range(ws['!ref']);
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const address = XLSX.utils.encode_cell({ r: 0, c: C });
                if (!ws[address]) continue;
                
                ws[address].s = {
                    font: { 
                        bold: true,
                        color: { rgb: "FFFFFF" }
                    },
                    fill: { 
                        fgColor: { rgb: "2E5AAB" }
                    },
                    alignment: { 
                        wrapText: true, 
                        vertical: "top",
                        horizontal: "left"
                    }
                };
            }

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
                creator: 'EE Form System'
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
                // Handle long text by splitting into multiple lines if needed
                const processedValue = value.length > 100 ? 
                    value.match(/.{1,100}(?:\s|$)/g).join('\n') : value;
                return [key, processedValue];
            });

            // Add table
            doc.autoTable({
                startY: 30,
                head: [['Field', 'Value']],
                body: tableData,
                headStyles: {
                    fillColor: [46, 90, 171],
                    textColor: 255,
                    fontSize: 12,
                    fontStyle: 'bold',
                    cellPadding: 3
                },
                bodyStyles: {
                    fontSize: 10,
                    cellPadding: 3
                },
                columnStyles: {
                    0: { cellWidth: 80 },
                    1: { cellWidth: 'auto' }
                },
                margin: { top: 30, right: 15, bottom: 20, left: 15 },
                theme: 'grid',
                tableWidth: 'auto',
                didDrawPage: function(data) {
                    // Add footer on each page
                    doc.setFontSize(8);
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