let pokemonList = [
  { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
  { name: "Charmander", height: 0.6, types: ["fire"] },
  { name: "Squirtle", height: 0.5, types: ["water"] }
];

let text = " ";
for (let i = 0; i < pokemonList.length; i++) {
  text = " " + pokemonList[i].name + " (Height: " + pokemonList[i].height + "m)";
  if (pokemonList[i].height >= 0.7) {
    document.write(text + " - Wow, that's big!" + "<br/>");
  } else {
    document.write(text + "<br/>");
    }
}
