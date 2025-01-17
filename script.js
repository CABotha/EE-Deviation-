document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('ee-form');
  
  form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      try {
          // Get all form fields with exact headings
          const formData = {
              "1. Date of completion of this document": document.getElementById('date-completion').value,
              "2. Department or division in which the position will work": document.getElementById('department').value,
              "3. Job title of the position": document.getElementById('job-title').value,
              "4. Occupational level of the said position": document.getElementById('occupational-level').value,
              "5. Urgency level for new appointment - date and reasons as well as absolute last date that vacancy can be filled": document.getElementById('urgency-level').value,
              "6. New position or replacement position": document.getElementById('position-type').value,
              "7.1 Is the position being considered one that requires a specific designated person to make progress toward and/or achieve the targets?": document.getElementById('requires-designated').value,
              "7.4.1 Highest Priority Target Group": document.getElementById('priority-highest').value,
              "7.4.2 Next Highest Priority Target Group": document.getElementById('priority-next').value,
              "7.4.3 Third Highest Priority Target Group": document.getElementById('priority-third').value,
              "8. Is the preferred candidate for the position aligned to the highest priority sub-race and gender group?": document.getElementById('aligned-highest').value,
              "8.3 What is the sub-race and gender group of the preferred candidate": document.getElementById('preferred-candidate-group').value,
              "Justification for not appointing from the targeted group": "",  // Section header
              "9.1 Qualifications": document.getElementById('qualifications').value,
              "9.2 Prior learning": document.getElementById('prior-learning').value,
              "9.3 Relevant experience": document.getElementById('relevant-experience').value,
              "9.4 How long would it take for the candidate to acquire the competencies?": document.getElementById('competency-time').value,
              "Evidence": "",  // Section header
              "10.1 The job profile": document.getElementById('job-profile').value,
              "10.2 The channels in which it was advertised": document.getElementById('advertising-channels').value,
              "10.3 The core response numbers": document.getElementById('response-numbers').value,
              "10.4.1 The sub-race, gender and disability demographics of the short-listed candidates": document.getElementById('shortlist-demographics').value,
              "10.4.2 The primary reason(s) why the highest priority candidate was not selected": document.getElementById('non-selection-reason').value,
              "11.1 Recruiting line manager": document.getElementById('recruiting-manager').value,
              "11.2 Senior manager responsible for EE": document.getElementById('senior-manager').value,
              "11.3 CEO or their designated appointee": document.getElementById('ceo').value
          };

          // Create worksheet data
          const wsData = [
              Object.keys(formData),    // Headers
              Object.values(formData)   // Data row
          ];

          // Create a new workbook
          const wb = XLSX.utils.book_new();
          
          // Convert data to worksheet format
          const ws = XLSX.utils.aoa_to_sheet(wsData);

          // Set column widths
          const cols = Object.keys(formData).map(() => ({ wch: 50 })); // Increased width for longer headers
          ws['!cols'] = cols;

          // Style the headers
          const range = XLSX.utils.decode_range(ws['!ref']);
          for (let C = range.s.c; C <= range.e.c; ++C) {
              const address = XLSX.utils.encode_cell({ r: 0, c: C });
              if (!ws[address]) continue;
              
              // Check if this is a section header
              const headerText = Object.keys(formData)[C];
              const isSectionHeader = headerText === "Justification for not appointing from the targeted group" || 
                                   headerText === "Evidence";
              
              ws[address].s = {
                  font: { 
                      bold: true, 
                      color: { rgb: isSectionHeader ? "0000FF" : "000000" } // Blue for section headers
                  },
                  fill: { 
                      fgColor: { rgb: isSectionHeader ? "E6E6FA" : "CCCCCC" } // Light purple for section headers
                  },
                  alignment: { 
                      wrapText: true, 
                      vertical: "top",
                      horizontal: "left"
                  }
              };
          }

          // Add the worksheet to the workbook
          XLSX.utils.book_append_sheet(wb, ws, "EE Deviation Record");

          // Generate filename with current date
          const today = new Date().toISOString().split('T')[0];
          const fileName = `EE_Deviation_Record_${today}.xlsx`;

          // Save the file
          XLSX.writeFile(wb, fileName);

          // Show success message
          alert('Form data has been exported to Excel successfully!');
          
      } catch (error) {
          console.error('Export error:', error);
          alert('There was an error exporting to Excel. Please try again.');
      }
  });
});