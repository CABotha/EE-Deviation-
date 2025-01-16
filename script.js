document.getElementById('ee-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const formData = {
      purpose: document.getElementById('purpose').value,
      procedure: document.getElementById('procedure').value,
      reason: document.getElementById('reason').value,
      date: document.getElementById('date').value,
    };
  
    fetch('https://script.google.com/macros/s/AKfycbyUtDjf3VOiOpzsvDQbG1ERcYxMjJrIHsJl6Z2Tgpm23aFaAl_aedkM7DP4E4IkvrSc/exec', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
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
        console.error('Fetch Error:', error);
        alert('Error submitting the form! Check the console for more details.');
      });
  });
  