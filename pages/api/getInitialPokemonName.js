export const getInitialPokemonName = async () => {
  const gqlQuery = `query pokemons($limit: Int, $offset: Int) {
  pokemons(limit: $limit, offset: $offset) {
    results {
      url
      name
      artwork
    }
  }
}`;

  const gqlVariables = {
    limit: 10,
    offset: 0,
  };
  try {
    const response = await fetch("https://graphql-pokeapi.graphcdn.app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: gqlQuery,
        variables: gqlVariables,
      }),
    });
    const data = await response.json();
    const names = data.data.pokemons.results.slice(0, 10);
    return names;
  } catch (error) {
    return -1;
  }
};
