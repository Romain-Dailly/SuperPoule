let characters = []; // to get ALL API Characters
let pseudo = ""; // to Store Player Pseudo
let characterName = ""; // to store Character Name from API
let characterImage = ""; // to store character Image from API


/*Get characters and map only name and picture*/
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


// choose a character randomly
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
        <p class="card-text">${pseudo}</p>
        <button>PLAY</button>
      </div>    
    </div>
    `  
  })     
}

// store pseudo
function getPseudo() {
  console.log(document.getElementById("myPseudo").value);
  pseudo = document.getElementById("myPseudo").value;
  document.getElementById('pseudo').innerHTML = `ready to play ${pseudo} ?`;     
}



