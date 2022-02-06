import { getMovie, getCountry } from "./API";
import { Movie, Country } from "./interfaces";
export async function displaySecondComponent() {
  const inputs = getInput(); //gets values from inputs
  if (inputs.length < 3) {
    return;
  }
  let getMovies: Promise<void | Movie | undefined>[] = [];
  inputs.forEach((movie) => getMovies.push(getMovie(movie)));
  let movieResults = await Promise.all(getMovies); //fetch results
  if (movieResults.includes(undefined)) {
    //if fetch couldn't get any movies, stop function
    return;
  }
  const length: number = calculateLength(movieResults); //calculate length

  let countriesSet: Set<string> = new Set();
  movieResults.forEach((movie) => {
    const splitCountries = movie?.Country.split(", ");
    countriesSet.add(...splitCountries);
  });
  const countries: string[] = Array.from(countriesSet); //array of countries
  let getCountries: Promise<void | Country | undefined>[] = [];
  countries.forEach((country) => getCountries.push(getCountry(country)));
  let countryResults = await Promise.all(getCountries); //fetch results
  const population = calculatePopulation(countryResults); //calculating population

  if (document.getElementById("information")) {
    document.getElementById("information")?.remove();
  } //check if element is already rendered
  const html = `  <div id="information">
    <p> Length: ${length} minutes</p>
    <p> Population: ${population}</p>
    </div>`;
  document
    .getElementById("secondComponent")
    ?.insertAdjacentHTML("beforeend", html);
}
function getInput(): string[] {
  let inputs: string[] = [];
  //check all values, if they're not empty add them to array
  let input1 = <HTMLInputElement>document.getElementById("input2");
  let input2 = <HTMLInputElement>document.getElementById("input3");
  let input3 = <HTMLInputElement>document.getElementById("input4");
  if (input1.value !== "") {
    inputs.push(input1.value);
  }
  if (input2.value !== "") {
    inputs.push(input2.value);
  }
  if (input3.value !== "") {
    inputs.push(input3.value);
  }
  if (inputs.length < 3) {
    alert("Fill in all inputs, please.");
  }
  return inputs;
}

function calculateLength(movies: (void | Movie | undefined)[]): number {
  let lengths: number[] = [];
  movies.forEach((movie) => {
    lengths.push(parseInt(movie?.Runtime));
  }); //extract numbers from string
  let length = lengths.reduce((acc, cur) => acc + Number(cur), 0); //add all numbers
  return length;
}
function calculatePopulation(
  countries: (void | Country | undefined)[]
): number {
  let population: number = countries.reduce(
    (acc, curr) => acc + Number(curr?.population),
    0
  ); //add population
  return population;
}
