document.getElementById('ee-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission behavior

  // Collect form data into a structured object
  const formData = {
      purpose: document.getElementById('purpose').value,
      procedure: document.getElementById('procedure').value,
      reason: document.getElementById('reason').value,
      dateOfCompletion: document.getElementById('date-completion').value,
      department: document.getElementById('department').value,
      jobTitle: document.getElementById('job-title').value,
      occupationalLevel: document.getElementById('occupational-level').value,
      urgencyLevel: document.getElementById('urgency-level').value,
      positionType: document.getElementById('position-type').value,
      targetedPriority: {
          highest: document.getElementById('priority-highest').value,
          nextHighest: document.getElementById('priority-next-highest').value,
          thirdHighest: document.getElementById('priority-third-highest').value,
      },
      preferredAlignment: document.getElementById('preferred-alignment').value,
      assessment: {
          qualifications: document.getElementById('qualifications').value,
          priorLearning: document.getElementById('prior-learning').value,
          relevantExperience: document.getElementById('experience').value,
          acquirableCompetencies: document.getElementById('competencies').value,
      },
      evidence: {
          jobProfile: document.getElementById('job-profile').value,
          advertisingChannels: document.getElementById('advertising-channels').value,
          responseNumbers: document.getElementById('response-numbers').value,
          shortlistDemographics: document.getElementById('shortlist-demographics').value,
          reasonsForNotSelectingHighest: document.getElementById('reasons-not-selected').value,
      },
      signOff: {
          recruitingManager: document.getElementById('recruiting-manager').value,
          seniorManager: document.getElementById('senior-manager').value,
          ceo: document.getElementById('ceo').value,
      },
  };

  // Convert the JSON data to a string
  const jsonData = JSON.stringify(formData, null, 4);

  // Create a Blob for the JSON data
  const blob = new Blob([jsonData], { type: 'application/json;charset=utf-8;' });

  // Create a link to download the JSON file
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'EE_Deviation_Record.json');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  alert('JSON file exported successfully!');
});
