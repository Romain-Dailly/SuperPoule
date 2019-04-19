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
  `<a class="character-card " onclick="setCharacter('${characters[i].image}','${characters[i].name}')">
    <div class="card mr-2" style="width: 7rem;">
      <img class="card-img-top img-fluid"src="${characters[i].image}">     
      <div class="card-body">
      <p class="card-text">${characters[i].name}</p>
      </div>
    </div>
  </a>`;
  };
}

// function to transfert variables
// function transfertVariables (myString) {
//   window.location.href = "playGame.html" + myString;
// }
// function to set selected character
const setCharacter = (image, name)=>{
  characterName = name;
  characterImage = image;
  let modal= document.getElementById('Modal');
  let character= document.getElementById('character');
  character.innerHTML = `
    <div class="card m-2 col-1.5 "onclick="{setCharacter()}" "style="width: 7rem">
      <img class="card-img-top img-fluid"src="${characterImage}">     
      <div class="card-body">
        <p class="card-text">${characterName}</p>
      </div>
    </div>`;
  modal.innerHTML = `
  <div class="card m-2 col-1.5 "onclick="{setCharacter()}" "style="width: 7rem">
    <img class="card-img-top img-fluid"src="${characterImage}">     
    <div class="card-body">
      <p class="card-text">${characterName}</p>
    </div>
  </div>` ;   
}

// store pseudo
function getPseudo() {
  pseudo = document.getElementById("myPseudo").value;
  document.getElementById('Modal').innerHTML = `
  <h2 class="mt-5">Prêt à t'éclater ${pseudo}? avec ${characterName}?</h2>
  <br><img src="${characterImage}"class="img-modal"alt="imgmodal"><br>
  <a href="./playGame.html"><button type="button" class="btn btn-dark btn-lg m-3">PLAY</button></a>`;     
}

// choose a character randomly
const GetRandomCharacter=()=> {
  fetch("http://easteregg.wildcodeschool.fr/api/characters/random")
  .then(response => response.json())
  .then(response => {
    characterName = response.name;
    characterImage = response.image;
    setCharacter(characterImage, characterName)
  })     
}

//sounds
function JouerSon() {
  let sound = document.getElementById("beep");
  let sound2= document.getElementById("zic");
  sound.play()
  .then(sound2.play());
}


