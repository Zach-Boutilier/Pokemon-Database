'use server';

// This function fetches all Pokémon up to ID 1025 and returns their names.
export async function fetchBasePokemonNames() {
  const basePokemonIds = Array.from({ length: 1025 }, (_, i) => i + 1); // IDs 1 to 1025
  
  const fetchPromises = basePokemonIds.map((id) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())
  );

  try {
    // Wait for all fetches to complete
    const basePokemonData = await Promise.all(fetchPromises);

    // Extract and return the names of the base Pokémon
    return new Set(basePokemonData.map((item) => item.name));
  } catch (error) {
    console.error('Error fetching base Pokémon names:', error);
    return new Set();
  }
}

// This function fetches Pokémon from offset=1025 and filters for mega/gmax and forms
export async function fetchFilteredPokemon() {
  const baseNamesSet = await fetchBasePokemonNames(); // Get base names

  // Fetch Pokémon with forms from offset=1025
  const fetchPromises = [];
  for (let i = 1025; i <= 1302; i++) {
    fetchPromises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) => res.json()));
  }

  try {
    // Wait for all fetches to complete
    const allFetchedData = await Promise.all(fetchPromises);

    // Filter out Pokémon with 'mega' or 'gmax' in their name, or those that match base forms
    const filteredPokemon = allFetchedData.filter((item) => {
      const name = item.name;
      return (
        name.includes('mega') ||
        name.includes('gmax') ||
        baseNamesSet.has(name.split('-')[0]) // Match base form (e.g., 'pikachu' from 'pikachu-rock-star')
      );
    });

    // Return filtered Pokémon data with necessary properties
    return filteredPokemon.map((item) => ({
      id: item.id,
      name: item.name,
      sprite: item.sprites.front_default,
      height: ((item.height / 10) * 3.281).toFixed(1), // Convert height to feet
      weight: ((item.weight / 10) * 2.205).toFixed(1), // Convert weight to pounds
    }));
  } catch (error) {
    console.error('Error fetching filtered Pokémon:', error);
    return [];
  }
}