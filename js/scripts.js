let pokemonList = [
  { name: "Squirtle", height: 0.5, type: ["Water"] },
  { name: "Caterpie", height: 0.3, type: ["Bug"] },
  { name: "Arcanine", height: 1.9, type: ["Fire"] }
];

pokemonList.forEach(function(pokemon) {
  text = pokemon.name + " is a '" + pokemon.type + "' type Pokémon and " + pokemon.height + " m tall";
  if (pokemon.height > 1.5) {
    document.write("<p>" + text + " - Wow, that's big!" + "<p/>");
  } else {
    document.write("<p>" + text + "<p/>");
    }
});
