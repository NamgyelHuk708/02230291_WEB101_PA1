function  showPokemonModal(pokemonId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const modalContent = createModalContent(data);
        const modalEl = document.getElementById('pokemon-modal');
        modalEl.innerHTML = modalContent;
  
        // Add event listener to close the modal
        modalEl.addEventListener('click', (event) => {
          if (event.target.classList.contains('pokemon-modal')) {
            modalEl.innerHTML = '';
          }
        });
  
        // Display the modal (you can use your preferred method here)
        // For example, using CSS to toggle visibility:
        modalEl.style.display = 'block';
      })
      .catch(error => {
        console.error(error);
        // Handle errors, such as displaying an error message in the modal
      });
  }
  
  function createModalContent(pokemon) {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');
    const types = pokemon.types.map(type => type.type.name).join(', ');
    const img = pokemon.sprites.front_default;
    const stats = pokemon.stats.map(stat => {
      return `<li>${stat.stat.name.toUpperCase()}: ${stat.base_stat}</li>`;
    }).join('');
  
    return `
      <div class="pokemon-modal-content">
        <img src="${img}" alt="${name}">
        <h2>${name} (#${id})</h2>
        <p>Type: ${types}</p>
        <ul class="stats">
          ${stats}
        </ul>
      </div>
    `;
  }
  console.log