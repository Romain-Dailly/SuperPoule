// Get the two button and the modal div elements. 
// Then create two event listeners — one for each button:
// When the #open-modal button is clicked, the modal should be shown, by manipulating its display style property (initially set to none in the CSS).
// Conversely, when the #close-modal button is clicked, the modal should be hidden.



const openButton = document.getElementById('open-modal');
const myModal = document.getElementById('modal');
const closeButton = document.getElementById('close-modal');
openButton.addEventListener('click',() => {myModal.style.display = "block";})
closeButton.addEventListener('click',() => {myModal.style.display = "none";})


var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("&");
for (var i = 0; i < queries.length; i++)
{
  document.write(queries[i] + "<br>");
}
var playerPseudo=queries[0];
var playerImage=queries[1];
// console.log(playerImage);
// console.log(playerPseudo);

//get current Url to reload with same name and image of player
// var currentLocation = window.location;

// function image() {
//   let playerImage=queries[1];
//   return playerImage;
// }
// let element = document.getElementById('playerImage');
// element.innerHTML = `<img src="${image()}" />`;     

function pseudo() {
  let playerPseudo=queries[0];
  return playerPseudo;
}
let element = document.getElementById('playerPseudo');
element.innerHTML = `${pseudo()}`;     

