const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromisses = () => Array(150).fill().map((_, index) => 
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const pokemonPromisses = generatePokemonPromisses()

const generateHtml = pokemons => pokemons.reduce((acc, { name , id, types }) => {
    const typesPokemon = types.map(typeInfo => typeInfo.type.name)
    acc += `
 <li class="card ${types[0]}"> 
    <img class="card-image ${types[0]}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" alt="${name}" />
     <h2 class="card-title">${id}.${name}</h2>
     <p class="card-subtitle">${typesPokemon.join(" | ")}</p>
 </li>
    `
    return acc;
}, '')

const insertPokemonIntoHtml = pokemons => document.querySelector("[data-js='pokedex'").innerHTML = pokemons;
var allPokemons;
filterPokemonByType = param => {
            
            document.querySelector("[data-js='pokedex'").innerHTML  = "";
            const filtrados = allPokemons
                    .filter(item => item.types.length > 1 )
                    .filter(i => i.types[0].type.name == param || i.types[1].type.name == param  )

            // allPokemons
            // .filter(item => item.types.length == 1 )
            // .filter(i => i.types[0].type.name == param )
            

            console.log(filtrados);
            filtrados.length > 0 ? 
                insertPokemonIntoHtml(generateHtml(filtrados)) :  
                insertPokemonIntoHtml(generateHtml(allPokemons))           
}


Promise.all(pokemonPromisses)
    .then(response => allPokemons = response)
    .then(generateHtml)
    .then(insertPokemonIntoHtml)   