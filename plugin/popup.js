// popup.js
document.getElementById('fetchData').addEventListener('click', async () => {
  // Define the API endpoint on your localhost server
  const apiUrl = 'http://localhost:1234/v1/chat/completions';

  // Prepare the data to be sent in the request body
  const requestData = {
    messages: [
      { role: 'system', content: 'be helpful.' },
      { role: 'user', content: 'haiku how you do' },
    ],
    temperature: 0.2,
    max_tokens: 50,
    stream: false,
  };

  try {
    // Make the fetch request to your localhost server
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    // Check if the request was successful (status code 200)
    if (response.ok) {
      // Parse the JSON response
      const responseData = await response.json();

      // Access the desired data from the response
      const result = responseData.choices[0].message;
      const content = responseData.choices[0].message.content;
      // Do something with the result (e.g., show it in an alert)
      alert(content);

  const resultPageContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Result Page</title>
  </head>
  <body>
    <div>${content}</div>
  </body>
  </html>
`;

   // Create a new Blob containing the HTML content
const blob = new Blob([resultPageContent], { type: 'text/html' });

// Create a data URL from the Blob
const resultPageUrl = URL.createObjectURL(blob);

// Open the result page in a new tab/window
window.open(resultPageUrl, '_blank');


    } else {
      // Handle errors
      alert('Error fetching data. Check your server.');
    }
  } catch (error) {
    // Handle network or other errors
    console.error('Error:', error);
    alert('Error fetching data. Check your network connection.');
  }
});
