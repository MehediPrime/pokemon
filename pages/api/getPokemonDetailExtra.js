export async function getPokemonDetailExtra(name) {
  if (name) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      return false;
    }
  }
}
