document.getElementById('ee-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Collect form data
  const formData = {
      purpose: document.getElementById('purpose').value || "",
      procedure: document.getElementById('procedure').value || "",
      reason: document.getElementById('reason').value || "",
      dateOfCompletion: document.getElementById('date-completion').value || "",
      department: document.getElementById('department').value || "",
      jobTitle: document.getElementById('job-title').value || "",
      occupationalLevel: document.getElementById('occupational-level').value || "",
      urgencyLevel: document.getElementById('urgency-level').value || "",
      positionType: document.getElementById('position-type').value || "",
      priorityHighest: document.getElementById('priority-highest').value || "",
      priorityNextHighest: document.getElementById('priority-next-highest').value || "",
      priorityThirdHighest: document.getElementById('priority-third-highest').value || "",
      preferredAlignment: document.getElementById('preferred-alignment').value || "",
      qualifications: document.getElementById('qualifications').value || "",
      priorLearning: document.getElementById('prior-learning').value || "",
      relevantExperience: document.getElementById('experience').value || "",
      acquirableCompetencies: document.getElementById('competencies').value || "",
      jobProfile: document.getElementById('job-profile').value || "",
      advertisingChannels: document.getElementById('advertising-channels').value || "",
      responseNumbers: document.getElementById('response-numbers').value || "",
      shortlistDemographics: document.getElementById('shortlist-demographics').value || "",
      reasonsNotSelected: document.getElementById('reasons-not-selected').value || "",
      recruitingManager: document.getElementById('recruiting-manager').value || "",
      seniorManager: document.getElementById('senior-manager').value || "",
      ceo: document.getElementById('ceo').value || ""
  };

  // Convert form data to CSV format
  const csvHeader = 'Purpose,Procedure,Reason,Date of Completion,Department,Job Title,Occupational Level,Urgency Level,Position Type,Priority (Highest),Priority (Next Highest),Priority (Third Highest),Preferred Alignment,Qualifications,Prior Learning,Relevant Experience,Acquirable Competencies,Job Profile,Advertising Channels,Response Numbers,Shortlist Demographics,Reasons Not Selected,Recruiting Manager,Senior Manager,CEO\n';
  const csvRow = `${formData.purpose},${formData.procedure},${formData.reason},${formData.dateOfCompletion},${formData.department},${formData.jobTitle},${formData.occupationalLevel},${formData.urgencyLevel},${formData.positionType},${formData.priorityHighest},${formData.priorityNextHighest},${formData.priorityThirdHighest},${formData.preferredAlignment},${formData.qualifications},${formData.priorLearning},${formData.relevantExperience},${formData.acquirableCompetencies},${formData.jobProfile},${formData.advertisingChannels},${formData.responseNumbers},${formData.shortlistDemographics},${formData.reasonsNotSelected},${formData.recruitingManager},${formData.seniorManager},${formData.ceo}\n`;

  const csvContent = csvHeader + csvRow;

  // Create a Blob for the CSV data
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Create a link to download the CSV file
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'EE_Deviation_Record.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  alert('CSV file exported successfully!');
});
