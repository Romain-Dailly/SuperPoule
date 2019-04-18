
/*Get characters and map only name and picture*/
let characters = [];
fetch("http://easteregg.wildcodeschool.fr/api/characters")
  .then(response => response.json())
  .then(response => {
    characters = response.map((character, i) => {      
      return character = {image: character.image, name: character.name}
      })
      })
  .then(() => {
    img()
  })

/*Display characters in characters div*/
const img = () =>{
// console.log(characters)
const listOfCharacters = document.getElementById("showCharacters")
for (let i = 0; i < 6; i++) {
  listOfCharacters.innerHTML += 
  `<a hover="cursor:pointer">
    <div class="card mr-2" style="width: 7rem;">
      <img class="card-img-top img-fluid"src="${characters[i].image}">     
      <div class="card-body">
      <p class="card-text">${characters[i].name}</p>
      </div>
  </div></a>`;
  };
}

// store pseudo
let pseudo = "";
function getPseudo() {
  pseudo = document.getElementById("myPseudo").value;
  document.getElementById('pseudo').innerHTML = `ready to play ${pseudo} ?`;     
}

// choose a character randomly
let characterName = "";
let characterImage = "";
function GetRandomCharacter() {
  fetch("http://easteregg.wildcodeschool.fr/api/characters/random")
  .then(response => response.json())
  .then(response => {
    characterName = response.name;
    characterImage = response.image;
    document.getElementById('character').innerHTML = `
    <div class="card mr-2" style="width: 10rem;height: 13rem;">
      <img class="card-img-top img-fluid"src="${characterImage}">     
      <div class="card-body">
        <p class="card-text">${characterName}</p>
      </div>
    </div>`  
  })     
}




