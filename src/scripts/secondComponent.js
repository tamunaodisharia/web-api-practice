import { getMovie, getCountry } from "./API.js";

export async function displaySecondComponent() {
  const inputs = getInput(); //gets values from inputs
  if (inputs.length < 3) {
    return;
  }
  let getMovies = [];
  inputs.forEach((movie) => getMovies.push(getMovie(movie)));
  let movieResults = await Promise.all(getMovies); //fetch results
  if (movieResults.includes(undefined)) {
    //if fetch couldn't get any movies, stop function
    return;
  }
  const length = calculateLength(movieResults); //calculate length

  let countriesSet = new Set();
  movieResults.forEach((movie) => {
    let splitCountries = movie.Country.split(", ");
    countriesSet.add(...splitCountries);
  });
  const countries = Array.from(countriesSet); //array of countries

  let getCountries = [];
  countries.forEach((country) => getCountries.push(getCountry(country)));
  let countryResults = await Promise.all(getCountries); //fetch results
  const population = calculatePopulation(countryResults); //calculating population

  if (document.getElementById("information")) {
    document.getElementById("information").remove();
  } //check if element is already rendered
  const html = `  <div id="information">
    <p> Length: ${length} minutes</p>
    <p> Population: ${population}</p>
    </div>`;
  document
    .getElementById("secondComponent")
    .insertAdjacentHTML("beforeend", html);
}
function getInput() {
  let inputs = [];
  //check all values, if they're not empty add them to array
  if (document.getElementById("input2").value !== "") {
    inputs.push(document.getElementById("input2").value);
  }
  if (document.getElementById("input3").value !== "") {
    inputs.push(document.getElementById("input3").value);
  }
  if (document.getElementById("input4").value !== "") {
    inputs.push(document.getElementById("input4").value);
  }
  if (inputs.length < 3) {
    alert("Fill in all inputs, please.");
  }
  return inputs;
}

function calculateLength(movies) {
  let lengths = [];
  movies.forEach((movie) => {
    lengths.push(movie.Runtime.match(/(\d+)/)[0]);
  }); //extract numbers from string
  let length = lengths.reduce((acc, cur) => acc + Number(cur), 0); //add all numbers
  return length;
}
function calculatePopulation(countries) {
  let population = countries.reduce((acc, curr) => acc + curr[0].population, 0); //add population
  return population;
}
