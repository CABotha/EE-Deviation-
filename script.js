document.addEventListener('DOMContentLoaded', function() {
    // Initialize form elements
    const form = document.getElementById('ee-form');
    const excelBtn = document.getElementById('export-excel');
    const pdfBtn = document.getElementById('export-pdf');

    // Get current date formatted as YYYY-MM-DD
    function getFormattedDate() {
        return new Date().toISOString().split('T')[0];
    }

    // Collect form data
    function getFormData() {
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
            "9.4 Time to Acquire Competencies": document.getElementById('competency-time').value || '-',
            "10.1 Job Profile": document.getElementById('job-profile').value || '-',
            "10.2 Advertising Channels": document.getElementById('advertising-channels').value || '-',
            "10.3 Response Numbers": document.getElementById('response-numbers').value || '-',
            "10.4.1 Shortlist Demographics": document.getElementById('shortlist-demographics').value || '-',
            "10.4.2 Non-selection Reason": document.getElementById('non-selection-reason').value || '-',
            "11.1 Recruiting Manager": document.getElementById('recruiting-manager').value || '-',
            "11.2 Senior EE Manager": document.getElementById('senior-manager').value || '-',
            "11.3 CEO/Appointee": document.getElementById('ceo').value || '-'
        };

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