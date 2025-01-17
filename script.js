document.getElementById('ee-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = {
    'date-completion': document.getElementById('date-completion').value,
    'department': document.getElementById('department').value,
    'job-title': document.getElementById('job-title').value,
    'occupational-level': document.getElementById('occupational-level').value,
    'urgency-level': document.getElementById('urgency-level').value,
    'position-type': document.getElementById('position-type').value,
    'priority-highest': document.getElementById('priority-highest').value,
    'priority-next-highest': document.getElementById('priority-next-highest').value,
    'priority-third-highest': document.getElementById('priority-third-highest').value,
    'preferred-alignment': document.getElementById('preferred-alignment').value,
    'qualifications': document.getElementById('qualifications').value,
    'prior-learning': document.getElementById('prior-learning').value,
    'experience': document.getElementById('experience').value,
    'competencies': document.getElementById('competencies').value,
    'job-profile': document.getElementById('job-profile').value,
    'advertising-channels': document.getElementById('advertising-channels').value,
    'response-numbers': document.getElementById('response-numbers').value,
    'shortlist-demographics': document.getElementById('shortlist-demographics').value,
    'reasons-not-selected': document.getElementById('reasons-not-selected').value,
    'recruiting-manager': document.getElementById('recruiting-manager').value,
    'senior-manager': document.getElementById('senior-manager').value,
    'ceo': document.getElementById('ceo').value,
  };

  fetch('https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.result === 'success') {
        alert('Form submitted successfully!');
        document.getElementById('ee-form').reset();
      } else {
        alert(`Error: ${data.message}`);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error submitting the form! Check the console for more details.');
    });
});
