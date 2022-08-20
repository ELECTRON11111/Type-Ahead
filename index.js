const suggestions = document.querySelector('.suggestions');
const search = document.querySelector('.search');
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
let cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities = [...data])
    .catch(err => console.log(err));

function findMatches(input) {
    const wordToMatch = new RegExp(input, 'gi');
    return cities.filter(place => {
       const isMatch = `${place.city} ${place.state}`.match(wordToMatch) !== null; 
       if (isMatch )  return place;
    });
}

function displayMatches(){
    const matches = findMatches(this.value);
    console.log(matches);

    suggestions.innerHTML = matches.map(match => {
        return `<li>
        <span class='name'>${match.city}, ${match.state}</span>
        <span class='population'>${match.population}</span>
      </li>`;
    }).join('');
}

search.addEventListener('keyup', displayMatches);