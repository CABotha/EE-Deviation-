document.getElementById('ee-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Collect form data
  const formData = {
      "Date of Completion": document.getElementById('date-completion').value,
      Department: document.getElementById('department').value,
      "Job Title": document.getElementById('job-title').value,
      "Occupational Level": document.getElementById('occupational-level').value,
      "Urgency Level": document.getElementById('urgency-level').value,
      "Position Type": document.getElementById('position-type').value,
      "Priority (Highest)": document.getElementById('priority-highest').value,
      "Priority (Next Highest)": document.getElementById('priority-next-highest').value,
      "Priority (Third Highest)": document.getElementById('priority-third-highest').value,
      "Preferred Alignment": document.getElementById('preferred-alignment').value,
      Qualifications: document.getElementById('qualifications').value,
      "Prior Learning": document.getElementById('prior-learning').value,
      "Relevant Experience": document.getElementById('experience').value,
      "Acquirable Competencies": document.getElementById('competencies').value,
      "Job Profile": document.getElementById('job-profile').value,
      "Advertising Channels": document.getElementById('advertising-channels').value,
      "Response Numbers": document.getElementById('response-numbers').value,
      "Shortlist Demographics": document.getElementById('shortlist-demographics').value,
      "Reasons Not Selected": document.getElementById('reasons-not-selected').value,
      "Recruiting Manager": document.getElementById('recruiting-manager').value,
      "Senior Manager": document.getElementById('senior-manager').value,
      CEO: document.getElementById('ceo').value,
  };

  // Convert to CSV and trigger download
  const csvData = createCSV(formData);
  downloadCSV(csvData, 'Employment_Equity_Deviation_Record.csv');
});

// Function to create CSV from data
function createCSV(data) {
  const keys = Object.keys(data); // Extract column headers
  const values = Object.values(data); // Extract row data

  let csv = keys.join(',') + '\n'; // Add headers as the first line
  csv += values.map(value => `"${value.replace(/"/g, '""')}"`).join(','); // Escape double quotes and add values

  return csv;
}

// Function to trigger CSV download
function downloadCSV(csvContent, filename) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
