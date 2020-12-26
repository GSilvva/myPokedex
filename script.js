const fetchPokemon = () => {

    // Código síncrono - Código que esperar uma ação ser executada para executar alguma outra
    // Código assíncrono - Código que é executado de forma sincronizada, bloco após bloco, mas sim, de acordo com as execuções / Pode iniciar um processo agora e terminar posteriormente, após a execução de outra função

    // AJAX - Asynchronous JavaScript and XML

    // Promise - Objeto que representa o sucesso ou falha de operação assíncrona (Requisião)

    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemonPromises = [];

    for (let i = 1; i <= 150; i++) {
        pokemonPromises.push(
            fetch(getPokemonUrl(i))
            .then(response => response.json())
        );
    }


    Promise.all(pokemonPromises)
        .then(pokemons => {
            // console.log(pokemons);

            // Reduz em um único valor
            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {

                const types = pokemon.types.map(typeInfo => typeInfo.type.name);
                accumulator += `
                    <li class="card ${types[0]}">
                        <img class="card-image ${types[0]}" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
                        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                        <p class="card-subtitle">${types.join(" | ")}</p>
                    </li>
                `;

                return accumulator;

            }, "");

            const ul = document.querySelector('[data-js="pokedex"]');
            ul.innerHTML = lisPokemons;

            // console.log(lisPokemons);
        });

}
fetchPokemon();