const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const zipCode = searchInput.value.trim();
  if (zipCode !== '') {
    const url = `https://zillow-base1.p.rapidapi.com/WebAPIs/zillow/search?location=${zipCode}&page=1&sort_by=Homes_For_You`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'af1056a4e5msh34f0784edc75082p12e317jsn60856b7a51a9',
            'X-RapidAPI-Host': 'zillow-base1.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      displayResults(result);
    } catch (error) {
      console.error(error);
    }
  }
});

function displayResults(result) {
  // Clear previous results
  resultsContainer.innerHTML = '';

  // Create a new result element and append it to the results container
  const resultElement = document.createElement('div');
  resultElement.textContent = JSON.stringify(result);
  resultsContainer.appendChild(resultElement);
}
