// fetch =   Function used for making HTTP requests to fetch resources.
//           (JSON style data, images, files)
//           Simplifies asynchromous data fetching in JavaScript and
//           used for interacting with APIs to retrieve and send
//           data asynchronously over the web.
//           fetch(url, {options})



// fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
//     .then(response => {
//         if (!response.ok) {
//             throw new Error("Could not fetch resource");
//         } return response.json();
//     })
//     .then(data => console.log(data.name))
//     .catch(error => console.error(error));



// fetchData();

async function fetchData(): Promise<void> {
    try {
        const pokemonName = (document.getElementById("pokemonName") as HTMLInputElement).value.toLowerCase();
        const response: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        
        const data = await response.json() as { sprites: { front_default: string } };
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite") as HTMLImageElement;
    
        imgElement.src  = pokemonSprite;
        imgElement.style.display = "block";

    } catch (error) {
        console.error(error);
    }
}