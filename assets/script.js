const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const zipCode = searchInput.value.trim();
  if (zipCode !== '') {
    const url = `https://crime-data-by-zipcode-api.p.rapidapi.com/crime_data?zip=${78572}`;
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
      // Process and display the crime rate result
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
});

// test