const wordsEl = document.getElementById("words");
const textAreaEl = document.getElementById("text");
const scoreEl = document.querySelector(".score");
const charCountEl = document.getElementById("char");
const timerEl = document.querySelector(".timer");
const myArray = [
   "Discover interesting projects and people to populate your personal news feed.",
   "All people are bad",
   "food",
   "Jonas",
   "girl",
   "boys",
   "My friend is called Bertin",
   "I like playing football",
   "today is Sunday",
   "Rwanda is the small country but with a big mind",
   "Students normally like eating posho",
];
let currentIndex = 0;
let startTime = 60; // Initial time in seconds
let timerInterval;
let continueTimer = false;

function updateTimer() {
   const minutes = Math.floor(startTime / 60);
   const seconds = startTime % 60;
   const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
   timerEl.textContent = `Time Remaining: ${formattedTime}`;

   if (startTime <= 0) {
      clearInterval(timerInterval);
      timerEl.textContent = "Time's up!";
      const continueGame = confirm("Time's up! Do you want to continue?");
      if (continueGame) {
         startTime = 60; // Reset the timer
         continueTimer = true;
         displayNextWord();
      } else {
         continueTimer = false;
      }
   }
   startTime--;
}

function displayNextWord() {
   if (currentIndex < myArray.length) {
      wordsEl.textContent = myArray[currentIndex];
      currentIndex++;
   } else {
      wordsEl.textContent = "All words completed!";
   }
}

function calculateWordsPerMinute() {
   const typedText = textAreaEl.value;
   const wordsTyped = typedText.trim().split(/\s+/).length;

   if (wordsTyped > 0 && continueTimer) {
      const wordsPerMinute = Math.round(
         (wordsTyped / 60) * (60 / (60 - startTime))
      );
      scoreEl.textContent = `TOTAL: ${wordsPerMinute} words per minute`;
   } else {
      scoreEl.textContent = "Please type some words and continue the timer.";
   }
}

textAreaEl.addEventListener("input", () => {
   const typedText = textAreaEl.value;
   charCountEl.textContent = typedText.length;

   // Check if the typed text matches the current displayed word
   const currentWord = myArray[currentIndex - 1].toLowerCase(); // Convert to lowercase for case insensitivity
   if (typedText.trim().toLowerCase() === currentWord) {
      displayNextWord();
      textAreaEl.value = ""; // Clear the textarea for the next word
   }
});

document
   .querySelector(".viewtotal")
   .addEventListener("click", calculateWordsPerMinute);

// Initialize timer
updateTimer();
timerInterval = setInterval(updateTimer, 1000);

// Display the first word
displayNextWord();
