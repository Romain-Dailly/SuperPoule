// Get the two button and the modal div elements. 
// Then create two event listeners — one for each button:
// When the #open-modal button is clicked, the modal should be shown, by manipulating its display style property (initially set to none in the CSS).
// Conversely, when the #close-modal button is clicked, the modal should be hidden.



const openButton = document.getElementById('open-modal');
const myModal = document.getElementById('modal');
const closeButton = document.getElementById('close-modal');
openButton.addEventListener('click',() => {myModal.style.display = "block";})
closeButton.addEventListener('click',() => {myModal.style.display = "none";})



