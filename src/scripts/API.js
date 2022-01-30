export function getMovie(title) {
  return fetch(`http://www.omdbapi.com/?t=${title}&apikey=998dccd0`)
    .then(async (response) => {
      if (response.ok) {
        let data = await response.json();
        if (data.Response === "False") {
          alert("Movie not found. \n Try another one.");
          throw new Error("Movie not found.");
        } else {
          return data;
        }
      } else {
        console.log("error");
      }
    })
    .catch((er) => console.log(er));
}
export function getCountry(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("error");
      }
    })
    .catch(() => alert("error"));
}
