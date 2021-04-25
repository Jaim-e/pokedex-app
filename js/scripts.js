let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function showLoadingMessage() {
    let div = document.querySelector(".loadingMessage");
    let message = document.createElement("p");
    message.innerText = "Please wait, loading data...";
    message.classList.add("remove");
    div.appendChild(message);
  }

  function hideLoadingMessage() {
    let removableMessage = document.querySelector(".remove");
    document.querySelector(".loadingMessage").removeChild(removableMessage);
  }

  function add(item) {
    if (
      typeof item === "object" &&
      "name" in item &&
      "detailsUrl" in item
    ) {
    pokemonList.push(item);
    } else {
      console.log("The type of data entered is incorrect.")
    }
  }

  function getAll() {
    return pokemonList;
  }

/*  function search(pokemon) {
    if (pokemonList.find(item =>item.name === pokemon)) {
      console.log(pokemonList.filter(item => item.name.includes(pokemon)));
    } else {
      console.log(pokemon + " does not exists");
    }
  }   */

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
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  function loadList() {
    showLoadingMessage ();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
        hideLoadingMessage();
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
          hideLoadingMessage();
          console.error(e);
        })
  }

  function loadDetails(item) {
    showLoadingMessage ();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
        hideLoadingMessage();
        // Now we add the details to the item:
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
          hideLoadingMessage();
          console.error(e);
        });
  }

  return {
    add: add,
    getAll: getAll,
/*  search: search,   */
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
