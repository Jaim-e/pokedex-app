let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Squirtle", height: 0.5, type: ["water"] },
    { name: "Arcanine", height: 1.9, type: ["fire"] },
    { name: "Metapod", height: 0.7, type: ["bug"] }
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
  function search(pokemon) {
    if (pokemonList.find(item =>item.name === pokemon)) {
      console.log(pokemonList.filter(item => item.name.includes(pokemon)));
    } else {
      console.log(pokemon + ' does not exists');
    }
  }
  return {
    add: add,
    getAll: getAll,
    search: search
  };
})();

pokemonRepository.add({ name: "Pikachu", height: 0.4, type: ["electric"] });

pokemonRepository.getAll().forEach(function(item) {
  text = item.name + " is a Pokémon of '" + item.type + "' type and is " + item.height + " m tall";
  if (item.height > 1.5) {
    document.write("<p>" + text + " - Wow, that's big!" + "<p/>");
  } else if (item.height <= 0.4) {
    document.write("<p>" + text + " - Well... at least it's cute!" + "<p/>");
  } else {
    document.write("<p>" + text + "<p/>");
    }
});

Object.keys(pokemonRepository.getAll()).forEach(function(property) {
  console.log(property + ': ' + typeof(pokemonRepository.getAll()[property]));
});

pokemonRepository.search("Pikachu");
