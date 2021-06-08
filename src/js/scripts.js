let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";

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

  function search(pokemon) {
    if (pokemonList.find(item =>item.name === pokemon)) {
      console.log(pokemonList.filter(item => item.name.includes(pokemon)));
    } else {
      console.log(pokemon + " does not exists");
    }
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-dark", "btn-block", "my-2", "custom-button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModalCenter");
    addListenerToButton(button, pokemon);
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  function addListenerToButton (button, pokemon) {
    button.addEventListener("click", function() {
      loadDetails(pokemon).then(function () {
        showModal(pokemon);
      });
    });
  }

  // This function creats elements and adds them to the modal
  function showModal ({name, height, types, imageUrl}) {
    let modalTitle = document.querySelector(".modal-title");
    let modalBody = document.querySelector(".modal-body");

    //Use this to empty HTML of modal everytime before it is called
    modalTitle.innerHTML = "";
    modalBody.innerHTML = "";

    let nameElement = document.createElement ("h2");
    nameElement.innerText = name;

    let hightElement = document.createElement("p");
    hightElement.innerText = "Height: " + height/10 + "  meters";

    let typeElement = document.createElement("p");
    typeElement.innerText = "Type(s): " + types;

    let imgElement = document.createElement("img");
    imgElement.classList.add("modal-img");
    imgElement.style.width = "50%";
    imgElement.src = imageUrl;

    modalTitle.appendChild(nameElement);
    modalBody.appendChild(hightElement);
    modalBody.appendChild(typeElement);
    modalBody.appendChild(imgElement);
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
            detailsUrl: item.url,
//            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
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
        let types = [];
        details.types.forEach(function(detailsType) {
          types.push(detailsType.type.name)
        });
        item.types = types.join(", ");
      }).catch(function (e) {
          hideLoadingMessage();
          console.error(e);
        });
  }
  // Search Bar in the Top Navigation Bar
  function searchBar () {
    let searchBar = document.getElementById("searchBar");

    searchBar.addEventListener("keyup", (e) => {
      let searchString = e.target.value.toUpperCase();
      let pokemonOnHTML = document.querySelectorAll(".list-group-item");

      pokemonOnHTML.forEach((searchedPokemon) => {
        if(searchedPokemon.innerText.indexOf(searchString) > -1) {
          searchedPokemon.style.display = "";
        } else {
          searchedPokemon.style.display = "none";
          }
      });
    });
  }

  return {
    add: add,
    getAll: getAll,
    search: search,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    searchBar: searchBar
  };
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

pokemonRepository.searchBar();
