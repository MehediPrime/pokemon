export async function getPokemonDetail(name) {
  if (name) {
    const gqlQuery = `query pokemon($name:String!){
  pokemon(name: $name){
    id
    name
    height
    weight
    abilities{
      ability{
        name
      }
    }
    types{
      type {
        name
      }
    }
    stats{
      base_stat
      stat{
        name
      }
    }
    abilities{
      ability{
        name
      }
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
      return data.data.pokemon;
    } catch (error) {
      return false;
    }
  }
}
