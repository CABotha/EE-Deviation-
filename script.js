document.getElementById('ee-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Collect form data
  const formData = {
      "Date of Completion": document.getElementById('date-completion').value,
      "Department": document.getElementById('department').value,
      "Job Title": document.getElementById('job-title').value,
      "Occupational Level": document.getElementById('occupational-level').value,
      "Urgency Level": document.getElementById('urgency-level').value,
      "Position Type": document.getElementById('position-type').value,
      "Reasons Not Selected": document.getElementById('reason-not-selected').value,
      "Recruiting Manager": document.getElementById('recruiting-manager').value,
      "Senior Manager": document.getElementById('senior-manager').value,
      "CEO": document.getElementById('ceo').value
  };

  // Create CSV content
  const headers = Object.keys(formData);
  const values = Object.values(formData);
  const csvContent = [headers.join(','), values.join(',')].join('\n');

  // Create download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'EE-Deviation-Record.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
