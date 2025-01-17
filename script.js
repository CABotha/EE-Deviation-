document.getElementById('ee-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Capture form data
  const formData = {
      "Date of Completion": document.getElementById('date-completion').value,
      "Department or Division": document.getElementById('department').value,
      "Job Title and Job Profile": document.getElementById('job-title').value,
      "Occupational Level": document.getElementById('occupational-level').value,
      "Urgency Level": document.getElementById('urgency-level').value,
      "Position Type": document.getElementById('position-type').value,
      "Position Requires Designated Person": document.getElementById('targeted-position').value,
      "Targeted Sub-Race and Gender Groups (Highest Priority)": document.getElementById('priority-highest').value,
      "Targeted Sub-Race and Gender Groups (Next Highest)": document.getElementById('priority-next-highest').value,
      "Targeted Sub-Race and Gender Groups (Third Highest)": document.getElementById('priority-third-highest').value,
      "Preferred Candidate Aligned": document.getElementById('preferred-alignment').value,
      "Qualifications": document.getElementById('qualifications').value,
      "Prior Learning": document.getElementById('prior-learning').value,
      "Relevant Experience": document.getElementById('experience').value,
      "Acquirable Competencies": document.getElementById('competencies').value,
      "Job Profile": document.getElementById('job-profile').value,
      "Advertising Channels": document.getElementById('advertising-channels').value,
      "Response Numbers": document.getElementById('response-numbers').value,
      "Recruiting Line Manager": document.getElementById('recruiting-manager').value,
      "Senior Manager Responsible for EE": document.getElementById('senior-manager').value,
      "CEO or Designated Appointee": document.getElementById('ceo').value,
  };

  // Convert to CSV format
  const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(formData).join(",") + "\n" +
      Object.values(formData)
          .map(value => `"${value}"`) // Handle values with commas
          .join(",");

  // Trigger download
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'Employment_Equity_Deviation_Record.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
