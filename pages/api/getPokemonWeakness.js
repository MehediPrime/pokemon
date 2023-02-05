export async function getPokemonWeakness(name) {
  if (name) {
    const url = `https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const extractedData = data.pokemon.find(
        (item) => item.name.toLowerCase() === name.toLowerCase()
      ).weaknesses;
      return extractedData;
    } catch (error) {
      return false;
    }
  }
}
