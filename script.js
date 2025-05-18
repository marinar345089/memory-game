const cards = document.querySelectorAll(".card");
const refreshBtn = document.querySelector(".refresh__btn");
const timerScore = document.querySelector(".score__time-value");
const flipsScore = document.querySelector(".score__flips-value");

let cardOne = null;
let cardTwo = null;
let disableDeck = false;
let matchedCards = 0;
let flips = 0;
let seconds = 60;
let timer = null;

shuffleCards();

function flipCard(event) {
  const card = event.target;
  if (card !== cardOne && disableDeck === false) {
    card.classList.add("flip");
    updateFlips();
    if (!cardOne) {
      cardOne = card;
      return;
    } else {
      cardTwo = card;
      disableDeck = true;
    }
    let cardOneImg = cardOne.querySelector(".card__img").src;
    let cardTwoImg = cardTwo.querySelector(".card__img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
  console.log(cardOne, cardTwo);
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCards++;
    if (matchedCards === 8) {
      setTimeout(() => {
        alert("You win!");
        shuffleCards();
      }, 400);
    }
    cardOne.onclick = null;
    cardTwo.onclick = null;
    cardOne = null;
    cardTwo = null;
    disableDeck = false;
    console.log("Match");
  } else {
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = null;
      cardTwo = null;
      disableDeck = false;
    }, 1200);
    console.log("Doesn't match");
  }
}

function shuffleCards() {
  cardOne = null;
  cardTwo = null;
  disableDeck = false;
  matchedCards = 0;
  flips = 0;
  flipsScore.innerHTML = flips;
  seconds = 60;
  timerScore.innerHTML = seconds;
  let array = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  array.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, index) => {
    card.classList.remove("flip");
    let cardImg = card.querySelector(".card__img");
    cardImg.src = `./img/img-${array[index]}.png`;
    card.onclick = flipCard;
  });
  startTimer();
}

refreshBtn.onclick = shuffleCards;

function updateFlips() {
  flips++;
  flipsScore.innerHTML = flips;
}

function startTimer() {
  clearInterval(timer);
  timerScore.innerHTML = seconds;
  timer = setInterval(() => {
    seconds--;
    timerScore.innerHTML = seconds;
    if (seconds <= 0) {
      clearInterval(timer);
      setTimeout(() => {
        alert("Time is out!");
        shuffleCards();
      }, 1000);
    }
  }, 1000);
}
