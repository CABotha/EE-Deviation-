document.getElementById('ee-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Collect form data
  const formData = {
      dateCompletion: document.getElementById('date-completion').value,
      department: document.getElementById('department').value,
      jobTitle: document.getElementById('job-title').value,
      occupationalLevel: document.getElementById('occupational-level').value,
      urgencyLevel: document.getElementById('urgency-level').value,
      positionType: document.getElementById('position-type').value,
      priorityHighest: document.getElementById('priority-highest').value,
      priorityNextHighest: document.getElementById('priority-next-highest').value,
      priorityThirdHighest: document.getElementById('priority-third-highest').value,
      preferredAlignment: document.getElementById('preferred-alignment').value,
      qualifications: document.getElementById('qualifications').value,
      priorLearning: document.getElementById('prior-learning').value,
      experience: document.getElementById('experience').value,
      competencies: document.getElementById('competencies').value,
      jobProfile: document.getElementById('job-profile').value,
      advertisingChannels: document.getElementById('advertising-channels').value,
      responseNumbers: document.getElementById('response-numbers').value,
      shortlistDemographics: document.getElementById('shortlist-demographics').value,
      reasonsNotSelected: document.getElementById('reasons-not-selected').value,
      recruitingManager: document.getElementById('recruiting-manager').value,
      seniorManager: document.getElementById('senior-manager').value,
      ceo: document.getElementById('ceo').value,
  };

  // Convert to CSV and trigger download
  const csvData = createCSV(formData);
  downloadCSV(csvData, 'Employment_Equity_Deviation_Record.csv');
});

// Function to create CSV from data
function createCSV(data) {
  const keys = Object.keys(data);
  const values = Object.values(data);

  let csv = keys.join(',') + '\n'; // Add headers
  csv += values.map(value => `"${value}"`).join(','); // Add values

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
