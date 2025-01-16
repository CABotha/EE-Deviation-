document.getElementById('ee-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Collect form data
    const formData = {
      purpose: document.getElementById('purpose').value,
      procedure: document.getElementById('procedure').value,
      reason: document.getElementById('reason').value,
      date: document.getElementById('date').value,
    };
  
    // Send data to the Google Apps Script Web App
    fetch('https://script.google.com/macros/s/AKfycbw3IatJrEWPWrELomTZk-fvqw58_mqnjwfVSYbTiFiKHVv82-oQpiLKrfeKeA7HGkn3/exec', {
      method: 'POST', // HTTP POST request
      body: JSON.stringify(formData), // Send the form data as JSON
      headers: { 'Content-Type': 'application/json' }, // Specify JSON content type
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        if (data.result === 'success') {
          alert('Form submitted successfully!');
          document.getElementById('ee-form').reset(); // Reset the form
        } else {
          alert(`Error: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error('Error:', error); // Log any errors
        alert('Error submitting the form! Check the console for more details.');
      });
  });
  