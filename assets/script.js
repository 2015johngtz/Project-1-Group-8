const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const zipCode = searchInput.value.trim();
  if (zipCode !== '') {
    const url = `https://crime-data-by-zipcode-api.p.rapidapi.com/crime_data?zip=${zipCode}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'da0c78ec3fmshc1b51465e907877p1fba6cjsna9f869b31242',
        'X-RapidAPI-Host': 'crime-data-by-zipcode-api.p.rapidapi.com'
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
