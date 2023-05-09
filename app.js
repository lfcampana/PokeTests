const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromisses = () => Array(150).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const pokemonPromisses = generatePokemonPromisses()

const generateHtml = pokemons => pokemons.reduce((acc, { name , id, types }) => {
    const typesPokemon = types.map(typeInfo => typeInfo.type.name)
    console.log(types[0].type.name)
    acc += `
 <li class="card ${types[0].type.name}"> 
    <img class="card-image ${types[0]}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${name}" />
     <h2 class="card-title">${id}.${name}</h2>
     <p class="card-subtitle">${typesPokemon.join(" | ")}</p>
 </li>
    `
    return acc;
}, '')

const insertPokemonIntoHtml = pokemons => document.querySelector("[data-js='pokedex'").innerHTML = pokemons;

Promise.all(pokemonPromisses)
    .then(generateHtml)
    .then(insertPokemonIntoHtml)  