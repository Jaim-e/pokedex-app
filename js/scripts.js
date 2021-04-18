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
      console.log(pokemon + " does not exists");
    }
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("custom-button");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    //Creating a function to add the event listener to the button:
    addEvLiToButton(button, pokemon);
  }
  function addEvLiToButton(button, pokemon) {
    //Adding an event listener to the variable "button":
    button.addEventListener("click", function(event){
    showDetails(pokemon);
    })
  }
  //Creating a function that display the data from a pokemon when its button is clicked:
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    search: search,
    addListItem: addListItem
  };
})();

pokemonRepository.add({ name: "Pikachu", height: 0.4, type: ["electric"] });

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});

Object.keys(pokemonRepository.getAll()).forEach(function(property) {
  console.log(property + ": " + typeof(pokemonRepository.getAll()[property]));
});

pokemonRepository.search("Pikachu");
