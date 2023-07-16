const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  const zipCode = searchInput.value.trim();
  if (zipCode !== '') {
    const crimeDataUrl = `https://crime-data-by-zipcode-api.p.rapidapi.com/crime_data?zip=${zipCode}`;
    const zillowDataUrl = `https://zillow-base1.p.rapidapi.com/WebAPIs/zillow/search?location=${zipCode}&page=1&sort_by=Homes_For_You`;

    const crimeDataOptions = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'da0c78ec3fmshc1b51465e907877p1fba6cjsna9f869b31242',
        'X-RapidAPI-Host': 'crime-data-by-zipcode-api.p.rapidapi.com'
      }
    };

    const zillowDataOptions = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'af1056a4e5msh34f0784edc75082p12e317jsn60856b7a51a9',
        'X-RapidAPI-Host': 'zillow-base1.p.rapidapi.com'
      }
    };

    try {
      const [crimeDataResponse, zillowDataResponse] = await Promise.all([
        fetch(crimeDataUrl, crimeDataOptions),
        fetch(zillowDataUrl, zillowDataOptions)
      ]);

      const crimeDataResult = await crimeDataResponse.json();
      const zillowDataResult = await zillowDataResponse.json();

      console.log(crimeDataResult.Overall.Fact);
      console.log(zillowDataResult.searchResultsData);

      displayResults(crimeDataResult, zillowDataResult);
    } catch (error) {
      console.error(error);
    }
  }
  
});



function displayResults(crimeData, zillowData) {
  // Clear previous results
  resultsContainer.innerHTML = '';

  // Create a new result element for crime data and append it to the results container
  const crimeDataElement = document.createElement('div');
  crimeDataElement.textContent = 'Crime Data: ' + JSON.stringify(crimeData);
  resultsContainer.appendChild(crimeDataElement);

  // Create a new result element for zillow data and append it to the results container
  const zillowDataElement = document.createElement('div');
  zillowDataElement.textContent = 'Zillow Data: ' + JSON.stringify(zillowData);
  resultsContainer.appendChild(zillowDataElement);
}
