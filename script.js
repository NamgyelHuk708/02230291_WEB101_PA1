const poke_container = document.getElementById("poke-container");
const pokemon_count = 150;
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

const main_types = Object.keys(colors);

const searchInput = document.getElementById("search-pokemon");
const searchBtn = document.querySelector("#search-section button");
const resetBtn = document.getElementById("reset-btn");

searchInput.addEventListener("keyup", (e) => {
  // Only trigger fetchPokemon when Enter key is pressed
  if (e.key === "Enter") {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
      fetchPokemon(searchTerm);
    }
  }
});

searchBtn.addEventListener("click", () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  if (searchTerm) {
    fetchPokemon(searchTerm);
  }
});

resetBtn.addEventListener("click", () => {
  clearPokemonContainer(); // Clear existing Pokemon
  fetchPokemons(); // Load all Pokemon again
  searchInput.value = ""; // Clear search input
});

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");
  pokemonEl.id = `pokemon-${pokemon.id}`; // Add ID for easier targeting

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, "0");

  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const color = colors[type];
  const pokeImg = pokemon.sprites.front_default;

  pokemonEl.style.backgroundColor = color;

  const pokemonInnerHTML = `
    <div class="img-container">
      <img src="${pokeImg}" alt="">
    </div>
    <div class="info">
      <span class="number">#${id}</span>
      <h3 class="name">${name}</h3>
      <small class="type">Type: <span>${type}</span> </small>
    </div>
  `;

  pokemonEl.innerHTML = pokemonInnerHTML;

  poke_container.appendChild(pokemonEl);
};

const clearPokemonContainer = () => {
  const pokeContainer = document.getElementById("poke-container");
  pokeContainer.innerHTML = "";
};

const fetchPokemon = async (searchTerm) => {
  if (!searchTerm) {
    // Load all Pokemon if no search term is provided
    for (let i = 1; i <= pokemon_count; i++) {
      await getPokemon(i);
    }
    return;
  }

  const url = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Pokemon not found");
    }
    const data = await res.json();
    clearPokemonContainer(); // Clear existing Pokemon before displaying search result
    createPokemonCard(data);
  } catch (error) {
    console.error(error.message);
    // Handle search errors (e.g., display an error message)
  }
};

fetchPokemons();

// Add event listener for click on Pokemon cards
// Add event listener for click on Pokemon cards
// Add event listener for click on Pokemon cards
poke_container.addEventListener("click", (event) => {
  const clickedEl = event.target;
  if (clickedEl.classList.contains("pokemon")) {
    const pokemonId = clickedEl.id.split("-")[1];
    window.location.href = `pokemon-details.html?id=${pokemonId}`; // Redirect to new page with Pokemon details
  }
});


