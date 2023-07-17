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

      const crimeDataSubset = [];
      if (crimeDataResult.Overall) {
        for (let i = 0; i < 10 && i < crimeDataResult.Overall.length; i++) {
          const data = crimeDataResult.Overall[i];
          const crimeDataItem = {
            fact: data.Fact,
            riskDetail: data["Risk Detail"],
            overallGrade: data["Overall Crime Grade"]
          };
          crimeDataSubset.push(crimeDataItem);
        }
      }

      const zillowDataSubset = zillowDataResult.searchResultsData.slice(0, 10).map(data => ({
        address: data.address,
        detailUrl: data.detailUrl
      }));

      displayResults(crimeDataSubset, zillowDataSubset);
    } catch (error) {
      console.error(error);
    }
  }
});

function displayResults(crimeData, zillowData) {
  // Clear previous results
  resultsContainer.innerHTML = '';

  // Display crime data results
  const crimeDataElement = document.createElement('div');
  crimeDataElement.textContent = 'Crime Data: ';
  crimeData.forEach(data => {
    const crimeDataItem = document.createElement('div');
    crimeDataItem.textContent = `Fact: ${data.fact}, Risk Detail: ${data.riskDetail}, Overall Grade: ${data.overallGrade}`;
    crimeDataElement.appendChild(crimeDataItem);
  });
  resultsContainer.appendChild(crimeDataElement);

  // Display Zillow data results
  const zillowDataElement = document.createElement('div');
  zillowDataElement.textContent = 'Zillow Data: ';
  zillowData.forEach(data => {
    const zillowDataItem = document.createElement('div');
    zillowDataItem.textContent = `Address: ${data.address}, Detail URL: ${data.detailUrl}`;
    zillowDataElement.appendChild(zillowDataItem);
  });
  resultsContainer.appendChild(zillowDataElement);
}
