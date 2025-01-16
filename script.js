document.getElementById('ee-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const formData = {
      purpose: document.getElementById('purpose').value,
      procedure: document.getElementById('procedure').value,
      reason: document.getElementById('reason').value,
      date: document.getElementById('date').value,
    };
  
    fetch('https://script.google.com/macros/s/AKfycbxD2nHdIY3N8H4QnyWvIEzZyJX5lgSu_rEPGDEqLJ4ZwwM0fqbOFtXiYAai_TC19tkL/exec', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Form submitted successfully!');
        document.getElementById('ee-form').reset();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error submitting the form!');
      });
  });
