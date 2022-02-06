import { getMovie, getCountry } from "./API";
import { Movie, Country } from "./interfaces";
const currentYear: number = new Date().getFullYear(); // get current year

export async function displayFirstComponent() {
  const title: string = (<HTMLInputElement>document.getElementById("input1"))
    .value; //get movie title from input
  const movie: void | Movie | undefined = await getMovie(title);
  if (movie == undefined) {
    //if fetch couldn't get the movie, stop function
    return;
  }
  if (document.getElementById("div1")) {
    document.getElementById("div1")?.remove();
  } //check if information was already rendered, remove it
  document
    .getElementById("firstComponent")
    ?.insertAdjacentHTML("beforeend", `<div id="div1"></div>`); //render a new div

  let actorsArray: string[] = movie.Actors.split(", ");
  let actorNames: string[] = [];
  actorsArray.forEach((x) => actorNames.push(x.split(" ")[0]));
  let names: string = actorNames.toString(); // actor names in string
  let countries: string[] = movie.Country.split(", ");
  let getCountries: Promise<void | Country | undefined>[] = [];
  countries.forEach((country) => getCountries.push(getCountry(country)));
  let results = await Promise.all(getCountries); //fetch results
  displayCountries(results); //display country information
  const html = `  <div>
    <p> Released: ${currentYear - Number(movie.Year)} years ago.</p>
    <p>Actors: ${names}</p>
    <p>Countries:</p>
    </div>`;
  document.getElementById("div1")?.insertAdjacentHTML("afterbegin", html);
}

function displayCountries(countries: (void | Country | undefined)[]): void {
  const div = document.getElementById("div1");
  countries.forEach((country) => {
    const name: string = country.name;
    const currency: string = country.currency;
    const flag: string = country.flag;
    const html = `  <div id="countries">
        <p>Name: ${name}</p>
        <p>Currency: ${currency}</p>
        <p class="flag">Flag: </p><img src=${flag}>
        </div>`;
    div?.insertAdjacentHTML("beforeend", html);
  });
}
