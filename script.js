document.getElementById('ee-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get all form fields
  const formData = {
      "1. Date of Completion": document.getElementById('date-completion').value,
      "2. Department/Division": document.getElementById('department').value,
      "3. Job Title and Profile": document.getElementById('job-title').value,
      "4. Occupational Level": document.getElementById('occupational-level').value,
      "5. Urgency Level": document.getElementById('urgency-level').value,
      "6. Position Type": document.getElementById('position-type').value,
      "7.1 Requires Designated Person": document.getElementById('requires-designated').value,
      "7.4.1 Highest Priority Group": document.getElementById('priority-highest').value,
      "7.4.2 Next Highest Priority": document.getElementById('priority-next').value,
      "7.4.3 Third Highest Priority": document.getElementById('priority-third').value,
      "8. Aligned to Highest Priority": document.getElementById('aligned-highest').value,
      "9.1 Qualifications": document.getElementById('qualifications').value,
      "9.2 Prior Learning": document.getElementById('prior-learning').value,
      "9.3 Relevant Experience": document.getElementById('relevant-experience').value,
      "9.4 Time to Acquire Competencies": document.getElementById('competency-time').value,
      "10.1 Job Profile": document.getElementById('job-profile').value,
      "10.2 Advertising Channels": document.getElementById('advertising-channels').value,
      "10.3 Response Numbers": document.getElementById('response-numbers').value,
      "10.4.1 Shortlist Demographics": document.getElementById('shortlist-demographics').value,
      "10.4.2 Non-selection Reason": document.getElementById('non-selection-reason').value,
      "11.1 Recruiting Manager": document.getElementById('recruiting-manager').value,
      "11.2 Senior Manager EE": document.getElementById('senior-manager').value,
      "11.3 CEO or Appointee": document.getElementById('ceo').value
  };

  // Create worksheet data
  const wsData = [
      Object.keys(formData),    // Headers
      Object.values(formData)   // Data row
  ];

  // Create a new workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "EE Deviation Record");

  // Set column widths
  const cols = Object.keys(formData).map(() => ({ wch: 30 })); // Increased width for better readability
  ws['!cols'] = cols;

  // Apply styling to headers
  const range = XLSX.utils.decode_range(ws['!ref']);
  for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!ws[address]) continue;
      ws[address].s = {
          font: { bold: true },
          fill: { fgColor: { rgb: "CCCCCC" } },
          alignment: { wrapText: true, vertical: "top" }
      };
  }

  // Get current date for filename
  const date = new Date().toISOString().split('T')[0];
  
  // Save the file
  XLSX.writeFile(wb, `EE_Deviation_Record_${date}.xlsx`);

  // Show success message
  alert('Form data has been exported to Excel successfully!');
});