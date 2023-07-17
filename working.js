
// local storage needs done still






var searchForm = document.getElementById('searchForm');
var searchInput = document.getElementById('searchInput');
var resultsContainer = document.getElementById('results');
var zillowContainer = document.getElementById('zillow')

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  var zipCode = searchInput.value.trim();
  if (zipCode !== '') {
    var crimeDataUrl = `https://crime-data-by-zipcode-api.p.rapidapi.com/crime_data?zip=${zipCode}`;
    var zillowDataUrl = `https://zillow-base1.p.rapidapi.com/WebAPIs/zillow/search?location=${zipCode}&page=1&sort_by=Homes_For_You`;
    var crimeDataOptions = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'da0c78ec3fmshc1b51465e907877p1fba6cjsna9f869b31242',
        'X-RapidAPI-Host': 'crime-data-by-zipcode-api.p.rapidapi.com'
      }
    };
    var zillowDataOptions = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'af1056a4e5msh34f0784edc75082p12e317jsn60856b7a51a9',
        'X-RapidAPI-Host': 'zillow-base1.p.rapidapi.com'
      }
    };
    try {
      var [crimeDataResponse, zillowDataResponse] = await Promise.all([
        fetch(crimeDataUrl, crimeDataOptions),
        fetch(zillowDataUrl, zillowDataOptions)
      ]);
      var crimeDataResult = await crimeDataResponse.json();
      var zillowDataResult = await zillowDataResponse.json();
      console.log(zillowDataResult.searchResultsData[0])
      displayResults(crimeDataResult, zillowDataResult);
    } catch (error) {
      console.error(error);
    }
  }
});
function displayResults(crimeDataResult, zillowDataResult) {
  resultsContainer.innerHTML = '';
  console.log(crimeDataResult);
  // console.log(zillowDataResults.address);
  // var crimeDataElement = document.createElement('div');
  // crimeDataElement.textContent = 'Crime Data: ' + JSON.stringify(crimeDataResult.Overall.Fact,);
  // resultsContainer.appendChild(crimeDataElement);
  var resultElement = document.createElement('li');
  resultElement.textContent = ' Did You Know ? ' + JSON.stringify(crimeDataResult.Overall.Fact + ' ' +
    + ' ' + crimeDataResult.Overall["Risk Detail"] + ' ' + ' Crime Grade' + ' ' + crimeDataResult.Overall["Overall Crime Grade"]);
  // ', Address: ' + zillowDataResult.searchResultsData[i].address;
  resultsContainer.appendChild(resultElement);
  for (let i = 0; i < zillowDataResult.searchResultsData.length; i++) {
    var resultZillowElement = document.createElement('li');
    resultZillowElement.textContent = ' For Sale Near You ' + JSON.stringify(zillowDataResult.searchResultsData[i].address + ' ' + zillowDataResult.searchResultsData[i].price);
    zillowContainer.appendChild(resultZillowElement);
  }
}


//TODO LOCAL STORAGE

// LOCAL STORAGE VARIABLES

