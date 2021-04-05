let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Squirtle", height: 0.5, type: ["water"] },
    { name: "Metapod", height: 0.7, type: ["bug"] },
    { name: "Arcanine", height: 1.9, type: ["fire"] }
  ];

  function add(item) {
    if (
      typeof item === "object" &&
      "name" in item &&
      "height" in item &&
      "type" in item
    ) {
    pokemonList.push(item);
    } else {
      console.log("The type of data entered is incorrect.")
    }
  }
  function getAll() {
    return pokemonList;
  }
  return {
    add: add,
    getAll: getAll
  };
})();

pokemonRepository.add({ name: "Pikachu", height: 0.4, type: ["electric"] });

pokemonRepository.getAll().forEach(function(item) {
  text = item.name + " is a Pokémon of '" + item.type + "' type and is " + item.height + " m tall";
  if (item.height > 1.5) {
    document.write("<p>" + text + " - Wow, that's big!" + "<p/>");
  } if (item.height <= 0.4) {
    document.write("<p>" + text + " - Well... at least it's cute!" + "<p/>");
  } else {
    document.write("<p>" + text + "<p/>");
    }
});

Object.keys(pokemonRepository.getAll()).forEach(function(property) {
  console.log(property + ': ' + typeof(pokemonRepository.getAll()[property]));
});
