import { getMovie, getCountry } from "./API.js";

const currentYear = new Date().getFullYear(); // get current year

export async function displayFirstComponent() {
  const title = document.getElementById("input1").value; //get movie title from input
  const movie = await getMovie(title);
  if (movie == undefined) {
    //if fetch couldn't get the movie, stop function
    return;
  }
  if (document.getElementById("div1")) {
    document.getElementById("div1").remove();
  } //check if information was already rendered, remove it
  document
    .getElementById("firstComponent")
    .insertAdjacentHTML("beforeend", `<div id="div1"></div>`); //render a new div

  let actorsArray = movie.Actors.split(", ");
  let actorNames = [];
  actorsArray.forEach((x) => actorNames.push(x.split(" ")[0]));
  let names = actorNames.toString(); // actor names in string
  let countries = movie.Country.split(", ");
  let getCountries = [];
  countries.forEach((country) => getCountries.push(getCountry(country)));
  let results = await Promise.all(getCountries); //fetch results
  displayCountries(results); //display country information
  const html = `  <div>
    <p> Released: ${currentYear - movie.Year} years ago.</p>
    <p>Actors: ${names}</p>
    <p>Countries:</p>
    </div>`;
  document.getElementById("div1").insertAdjacentHTML("afterbegin", html);
}

function displayCountries(countries) {
  const div = document.getElementById("div1");
  countries.forEach((country) => {
    const name = country[0].name.common;
    const currency = Object.keys(country[0].currencies)[0];
    const flag = country[0].flags.png;
    const html = `  <div id="countries">
        <p>Name: ${name}</p>
        <p>Currency: ${currency}</p>
        <p class="flag">Flag: </p><img src=${flag}>
        </div>`;
    div.insertAdjacentHTML("beforeend", html);
  });
}
