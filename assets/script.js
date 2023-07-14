





const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const url2 = `https://crime-data-by-zipcode-api.p.rapidapi.com/crime_data?zip=94109`;

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




fetch('https://crime-data-by-zipcode-api.p.rapidapi.com/crime_data?zip=94109', {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'f9b4c84174msh8852b12314d057ep131096jsn6e0e230da9c4',
    'X-RapidAPI-Host': 'crime-data-by-zipcode-api.p.rapidapi.com'
  },
  // credentials: 'same-origin',
  // redirect: 'follow',
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });


fetch('https://airbnb-listings.p.rapidapi.com/v2/getadmins?countrycode=IT&admin1=07&admin2=RM&admin3=058091&admin4=05809101', {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'f9b4c84174msh8852b12314d057ep131096jsn6e0e230da9c4',
    'X-RapidAPI-Host': 'airbnb-listings.p.rapidapi.com'
  },
  // credentials: 'same-origin',
  // redirect: 'follow',
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
