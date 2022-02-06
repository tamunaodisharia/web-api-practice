import { Movie, Country } from "./interfaces";

export function getMovie(title: string): Promise<void | Movie | undefined> {
  return fetch(`http://www.omdbapi.com/?t=${title}&apikey=998dccd0`)
    .then(async (response) => {
      if (response.ok) {
        let data = await response.json();
        if (data.Response === "False") {
          alert("Movie not found. \n Try another one.");
          throw new Error("Movie not found.");
        } else {
          let returnValue: Movie = {
            Title: data.Title,
            Actors: data.Actors,
            Country: data.Country,
            Year: data.Year,
            Runtime: data.Runtime,
          };
          return returnValue;
        }
      } else {
        console.log("error");
      }
    })
    .catch((er) => console.log(er));
}
export function getCountry(name: string) {
  return fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    .then(async (response) => {
      if (response.ok) {
        let data = await response.json();
        let returnValue: Country = {
          name: data[0].name.common,
          population: data[0].population,
          currency: Object.keys(data[0].currencies)[0],
          flag: data[0].flags.png,
        };
        return returnValue;
      }
    })
    .catch((er) => console.log(er));
}
