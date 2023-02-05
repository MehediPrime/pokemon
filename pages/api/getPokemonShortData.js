export async function getPokemonShortData(name) {
  const gqlQuery = `query pokemon($name:String!){
  pokemon(name: $name){
    id
    name
    sprites{
      front_default
    }
    types{
      type{name}
    }
  }
}`;

  const gqlVariables = {
    name: name,
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
    return data.data;
  } catch (error) {
    return -1;
  }
}
