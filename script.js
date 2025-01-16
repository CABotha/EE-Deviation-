document.getElementById('ee-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission
  
    const formData = {
      purpose: document.getElementById('purpose').value,
      procedure: document.getElementById('procedure').value,
      reason: document.getElementById('reason').value,
      date: document.getElementById('date').value,
    };
  
    fetch('https://script.google.com/macros/library/d/1Eh2arpDLGNKPWRJVWWFEt_wET4EwDrquVkWJz512jCuaYZ5LUe5eGfum/4', {
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
  