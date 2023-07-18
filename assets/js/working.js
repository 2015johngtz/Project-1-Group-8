
var searchForm = document.getElementById('searchForm');
var searchInput = document.getElementById('searchInput');
var resultsContainer = document.getElementById('results');
var zillowContainer = document.getElementById('listing-info');
var searchedZipCodes = [];
var searchedZipCodes = retrieveSearchedZipCodes();

searchForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  var zipCode = searchInput.value.trim();
  if (zipCode !== '') {
    searchedZipCodes.push(zipCode);
    savedZipCodes();
    displaySearchedZipCodes();

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

  var resultElement = document.createElement('li');
  resultElement.textContent = ' Did You Know ? ' + JSON.stringify(crimeDataResult.Overall.Fact + ' ' +
    + ' ' + crimeDataResult.Overall["Risk Detail"] + ' ' + ' Crime Grade' + ' ' + crimeDataResult.Overall["Overall Crime Grade"]);
    resultsContainer.appendChild(resultElement);
    zillowContainer.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    var resultZillowElement = document.createElement('div');
    resultZillowElement.classList.add("result")
    resultZillowElement.innerHTML = `
    <div class="results-card card my-4 mx-1 column">
  <div class="card-image image is-3by2">
    <figure>
      <img src=${zillowDataResult.searchResultsData[i].imgSrc} alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
    <div class="media-content">
    <p class="title is-4">${zillowDataResult.searchResultsData[i].address}</p>
    <p class="subtitle is-6">${zillowDataResult.searchResultsData[i].price}</p>
    </div>
    </div>

    <div class="content">
      <a href=${zillowDataResult.searchResultsData[i].detailUrl}><button class="button is-info" >Zillow</button></a>
      <br>
    </div>
  </div>
</div>` 
    // resultZillowElement.textContent = ' For Sale Near You ' + JSON.stringify( + ' ' + zillowDataResult.searchResultsData[i].price);
    zillowContainer.appendChild(resultZillowElement);
  }
  console.log(crimeDataResult.Overall)

}
// Functions to store and receive our saved zipcodes into local storage and then display them on our page
function savedZipCodes() {
  localStorage.setItem('Searched ZipCodes', JSON.stringify(searchedZipCodes));
}

function retrieveSearchedZipCodes() {
  var savedZipCodes = localStorage.getItem('searchedZipCodes');
  if (savedZipCodes) {
    return JSON.parse(savedZipCodes);
  }
  return [];
}
function displaySearchedZipCodes() {
  var zipCodesContainer = document.getElementById('zipCodes');
  zipCodesContainer.innerHTML = '';
  searchedZipCodes.forEach(function (zipCode) {
    var zipCodeElement = document.createElement('li');
    zipCodeElement.setAttribute("class", "zipblock")
    zipCodeElement.textContent = zipCode;
    zipCodesContainer.appendChild(zipCodeElement);
    zipCodeElement.classList.add("cursor-point")
    zipCodeElement.addEventListener("click", async function(event){
      var zipCode = event.target.textContent;
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
    })

  });
}
var searchedZipCodes = retrieveSearchedZipCodes();
displaySearchedZipCodes();

    // <div class="media-left">
    //   <figure class="image is-48x48">
    //     <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
    //   </figure>
    // </div>

