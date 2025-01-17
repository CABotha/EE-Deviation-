document.getElementById('ee-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Get all form fields
  const formData = {
      "Date_of_Completion": document.getElementById('date-completion').value,
      "Department_or_Division": document.getElementById('department').value,
      "Job_Title_and_Profile": document.getElementById('job-title').value,
      "Occupational_Level": document.getElementById('occupational-level').value,
      "Urgency_Level": document.getElementById('urgency-level').value,
      "Position_Type": document.getElementById('position-type').value,
      "Position_Requires_Designated_Person": document.getElementById('targeted-position').value,
      "Highest_Priority_Group": document.getElementById('priority-highest').value,
      "Next_Highest_Priority_Group": document.getElementById('priority-next-highest').value,
      "Third_Highest_Priority_Group": document.getElementById('priority-third-highest').value,
      "Preferred_Candidate_Aligned": document.getElementById('preferred-alignment').value,
      "Justifiable_Reason": document.getElementById('justifiable-reasons').value,
      "Job_Profile": document.getElementById('job-profile').value.replace(/,/g, ';').replace(/\n/g, ' '),
      "Advertising_Channels": document.getElementById('advertising-channels').value.replace(/,/g, ';').replace(/\n/g, ' '),
      "Response_Numbers": document.getElementById('response-numbers').value.replace(/,/g, ';').replace(/\n/g, ' '),
      "Recruiting_Line_Manager": document.getElementById('recruiting-manager').value,
      "Senior_Manager_EE": document.getElementById('senior-manager').value,
      "CEO_or_Appointee": document.getElementById('ceo').value
  };

  // Create CSV headers and data rows
  const headers = Object.keys(formData);
  const dataRow = Object.values(formData).map(value => {
      // Properly escape and quote values
      const escaped = value.toString().replace(/"/g, '""');
      return `"${escaped}"`;
  });

  // Combine headers and data into CSV string
  const csvContent = [
      headers.join(','),
      dataRow.join(',')
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  // Handle different browsers
  if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, 'Employment_Equity_Deviation_Record.csv');
  } else {
      // Other browsers
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute('download', 'Employment_Equity_Deviation_Record.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  }

  // Optional: Show success message
  alert('Form data has been exported to CSV successfully!');
});