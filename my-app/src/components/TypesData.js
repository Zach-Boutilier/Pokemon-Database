export async function fetchTypeDetails(typeId) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${typeId}`);
    const data = await res.json();

    const Super_effective = data.damage_relations.double_damage_to.map((item) => item.name);
    const Weak_to = data.damage_relations.double_damage_from.map((item) => item.name);
    const Not_very_effective = data.damage_relations.half_damage_to.map((item) => item.name);
    const Resists = data.damage_relations.half_damage_from.map((item) => item.name);
    const No_effect = data.damage_relations.no_damage_to.map((item) => item.name);
    const Immune_to = data.damage_relations.no_damage_from.map((item) => item.name);

    // Fetching the sprite URL for the type (generation-viii/sword-shield is the right path)
    let imageUrl = data.sprites["generation-viii"]?.["sword-shield"]?.name_icon; // Accessing the image URL
      
    // If the image URL is not found, use a fallback image
    if (!imageUrl) {
      imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/${typeId}.png`; // *Fallback image*
    }
    
    // If the image URL still isn't found (e.g., in some cases), fallback to another default image
    const imageCheck = await fetch(imageUrl);
    if (!imageCheck.ok) {
      imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iv/platinum/${typeId}.png`; //**LAST Fallback image**
    }

    return {
      name: data.name,
      imageUrl,
      Super_effective,
      Weak_to,
      Not_very_effective,
      Resists,
      No_effect,
      Immune_to,
    };
  } catch (error) {
    console.error('Error fetching type details:', error);
    return null;
  }
}