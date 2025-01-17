document.getElementById('ee-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get all form fields
  const formData = {
      "Date of Completion": document.getElementById('date-completion').value,
      "Department or Division": document.getElementById('department').value,
      "Job Title and Profile": document.getElementById('job-title').value,
      "Occupational Level": document.getElementById('occupational-level').value,
      "Urgency Level": document.getElementById('urgency-level').value,
      "Position Type": document.getElementById('position-type').value,
      "Position Requires Designated Person": document.getElementById('targeted-position').value,
      "Highest Priority Group": document.getElementById('priority-highest').value,
      "Next Highest Priority Group": document.getElementById('priority-next-highest').value,
      "Third Highest Priority Group": document.getElementById('priority-third-highest').value,
      "Preferred Candidate Aligned": document.getElementById('preferred-alignment').value,
      "Justifiable Reason": document.getElementById('justifiable-reasons').value,
      "Job Profile": document.getElementById('job-profile').value,
      "Advertising Channels": document.getElementById('advertising-channels').value,
      "Response Numbers": document.getElementById('response-numbers').value,
      "Recruiting Line Manager": document.getElementById('recruiting-manager').value,
      "Senior Manager EE": document.getElementById('senior-manager').value,
      "CEO or Appointee": document.getElementById('ceo').value
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
  const cols = Object.keys(formData).map(() => ({ wch: 20 })); // Set width of 20 for all columns
  ws['!cols'] = cols;

  // Apply some basic styling
  const range = XLSX.utils.decode_range(ws['!ref']);
  for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!ws[address]) continue;
      ws[address].s = {
          font: { bold: true },
          fill: { fgColor: { rgb: "CCCCCC" } }
      };
  }

  // Get current date for filename
  const date = new Date().toISOString().split('T')[0];
  
  // Save the file
  XLSX.writeFile(wb, `EE_Deviation_Record_${date}.xlsx`);

  // Show success message
  alert('Form data has been exported to Excel successfully!');
});