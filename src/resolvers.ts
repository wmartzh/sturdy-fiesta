import data from './data.js';

export default {
  Query: {
    async pokemon(_, { id }) {
      return data.find((pokemon) => pokemon.id === id);
    },
    async pokemons() {
      return data;
    },
  },
  Mutation: {
    async addPokemon(_, { name, type }) {
      const id = data.length + 1;
      const newPokemon = {
        id,
        name,
        type,
      };
      data.push(newPokemon as any);
      return newPokemon;
    },

    async addPokemonStats(_, {input}, context) {
      const {id,... baseStats} = input;

      const pokemonIndex = data.findIndex((pokemon) => pokemon.id === id);
      if (pokemonIndex === -1) {
        throw new Error('Pokemon not found');
      }
    
      data[pokemonIndex]['baseStats'] = baseStats;
      return data[pokemonIndex];

    },

    async removePokemon(_, { id }) {
      const pokemonIndex = data.findIndex((pokemon) => pokemon.id === id);
      if (pokemonIndex === -1) {
        throw new Error('Pokemon not found');
      }
      const removedPokemon = data.splice(pokemonIndex, 1);
      return removedPokemon[0];
    },
  },
};
