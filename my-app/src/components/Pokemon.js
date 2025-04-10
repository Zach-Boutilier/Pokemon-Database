`use server`;

export const generationRanges = {
  1: [1, 151],
  2: [152, 251],
  3: [252, 386],
  4: [387, 493],
  5: [494, 649],
  6: [650, 721],
  7: [722, 809],
  8: [810, 905],
  9: [906, 1025],
  10: [10001, 10277],
  //10: [10001, 10032],
  //11: [10033, 10079],
  //12: [10080, 10085],
  //13: [10086, 10090],
  //14: [10091, 10194],
  //15: [10195, 10228],
};

export async function fetchPokemonByGeneration(gen = 1) {
  const [startId, endId] = generationRanges[gen] || generationRanges[1];
  
  // Generate a list of fetch promises for all Pokémon in the selected generation
  const fetchPromises = [];
  for (let i = startId; i <= endId && 10277; i++) {
    fetchPromises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => res.json()));
  }

  try {
    // Wait for all fetches to complete in parallel
    const data = await Promise.all(fetchPromises);

    // Map over the data to transform it into the desired format
    return data.map((item) => ({
      id: (item.id),
      name: item.name,
      sprite: item.sprites.front_default,
      height: ((item.height / 10) * 3.281).toFixed(1), // in feet
      weight: ((item.weight / 10) * 2.205).toFixed(1), // in pounds
    }));
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
}