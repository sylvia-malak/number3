
const serverURL = 'https://api.textrazor.com';
const apiKey = '651443c03284dde6b9952ef98a423e586f8b4758e347e0d63ec84203';
const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  // Get the text or URL from the input field
  const formText = document.getElementById('name').value;

  // Check if the input is valid
  if (formText) {
    if (isValidURL(formText)) {
      // If it's a valid URL, send it to the server
      sendURLToServer(formText);
    } else {
      // If it's text, send it for analysis
      sendTextToServer(formText);
    }
  } else {
    alert('Please enter some text or a URL to analyze');
  }
}

// Function to send URL to TextRazor server (POST request)
function sendURLToServer(url) {
  fetch(serverURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-textrazor-key': apiKey // Add API Key to the header
    },
    body: JSON.stringify({
      url: url,
      extractors: ['entities', 'topics', 'sentiment'], // Customize what you want to extract
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Server response:', data);
      updateUI(data);
    })
    .catch((error) => console.error('Error:', error));
}

// Function to send text data to the server (POST request)
function sendTextToServer(text) {
  fetch(serverURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-textrazor-key': apiKey // Add API Key to the header
    },
    body: JSON.stringify({
      text: text,
      extractors: ['entities', 'topics', 'sentiment'], // Customize what you want to extract
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Server response:', data);
      updateUI(data);
    })
    .catch((error) => console.error('Error:', error));
}

// Function to update the UI with the results
function updateUI(data) {
  const resultsDiv = document.getElementById('results');

  // Check if the response contains the required data
  if (data.response && data.response.entities) {
    const entities = data.response.entities.map(entity => `<p>${entity.type}: ${entity.text}</p>`).join('');
    resultsDiv.innerHTML = `
      <h3>Entities Extracted:</h3>
      ${entities}
    `;
  } else {
    resultsDiv.innerHTML = `<p>Error: ${data.error || 'No entities found'}</p>`;
  }
}

// Function to validate if the input is a URL
function isValidURL(string) {
  const res = string.match(/(http|https):\/\/[^\s/$.?#].[^\s]*/);
  return res !== null;
}



});
