export async function fetchTypeData() {
  try {
    const res = await fetch('https://pokeapi.co/api/v2/type/');
    const data = await res.json();

    return data.results.map((type) => {
      // Extract the ID from the URL
      const id = type.url.split('/')[6];

      // Default to an empty string or fallback image if the image URL isn't available
      let imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${id}.png`;

      // If the image is not found, set a fallback image
      if (!imageUrl) {
        imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/${id}.png`; // *Fallback image*
      } else {
        imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iv/platinum/${id}.png`; // **LAST Fallback image**
      }

      return {
        id,
        name: type.name,
        imageUrl,
      };
    });
  } catch (error) {
    console.error('Error fetching types:', error);
    return [];
  }
}

