const button = document.querySelector("#button");
const canvas = document.querySelector("#confetti");

const jsConfetti = new JSConfetti();

button.addEventListener("click", () => {
  jsConfetti.addConfetti().then(() => jsConfetti.addConfetti());
});

// Function to show a tab
function showTab(tabName) {
  var tabcontent = document.getElementsByClassName("tabContent");
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  var tablinks = document.getElementsByClassName("tab");
  for (var i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  document.getElementById(tabName + "Tab").className += " active";
}

// Function to check if the number(s) sum to 7
function checkDigits(digits, tabName) {
  var sum = digits.reduce(function (a, b) {
    return parseInt(a) + parseInt(b);
  }, 0);

  if (sum === 7) {
    showCongratulations("", tabName);
    jsConfetti.addConfetti(); // Add confetti on correct input
  } else {
    showAlert("Try again!", tabName);
    showAlert("hint:You might be out of trend.", tabName);
  }
}

// Function to show congratulations message
function showCongratulations(message, tabName) {
  var tab = document.getElementById(tabName);
  tab.innerHTML =
    '<div class="animate__animated animate__zoomIn">' +
    "You Guessed It Correct!<br>" +
    message +
    " Thala for a reason 💖" +
    '<br> <img src="./Thala-Gif.gif" alt="Thala-Gif" height="200" width="200"> ';
  jsConfetti.addConfetti(); // Add confetti on correct input

  var sound = document.getElementById("success-sound");
  sound.play();

  setTimeout(function () {
    tab.innerHTML = "";
    setupTabContent(tabName);
  }, 10000); // Display the message for 10 seconds
}

// Function to show alert message
function showAlert(message, tabName) {
  var tab = document.getElementById(tabName);
  tab.innerHTML =
    '<div class="animate__animated animate__shakeX">' + message + "</div>";
  setTimeout(function () {
    tab.innerHTML = "";
    setupTabContent(tabName);
  }, 2000); // Display the alert for 2 seconds
}

// Setup tab content after the congratulations or alert message
function setupTabContent(tabName) {
  if (tabName === "oneDigit") {
    document.getElementById(tabName).innerHTML =
      '<input type="text" id="singleDigit" placeholder="Type the Lucky number">' +
      '<button onclick="checkOneDigit()">Submit</button>';
  } else if (tabName === "twoDigits") {
    document.getElementById(tabName).innerHTML =
      '<input type="text" id="firstDigit" placeholder="First number">' +
      '<input type="text" id="secondDigit" placeholder="Second number">' +
      '<button onclick="checkTwoDigits()">Submit</button>';
  } else if (tabName === "threeDigits") {
    document.getElementById(tabName).innerHTML =
      '<input type="text" id="digitOne" placeholder="First number">' +
      '<input type="text" id="digitTwo" placeholder="Second number">' +
      '<input type="text" id="digitThree" placeholder="Third number">' +
      '<button onclick="checkThreeDigits()">Submit</button>';
  } else if (tabName === "anyWord") {
    document.getElementById(tabName).innerHTML =
      '<input type="text" id="word" placeholder="Type the Lucky word">' +
      '<button onclick="checkWord()">Submit</button>';
  }
}

// Event listeners for the submit buttons
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("oneDigitTab").addEventListener("click", function () {
    showTab("oneDigit");
  });
  document
    .getElementById("twoDigitsTab")
    .addEventListener("click", function () {
      showTab("twoDigits");
    });
  document
    .getElementById("threeDigitsTab")
    .addEventListener("click", function () {
      showTab("threeDigits");
    });
  document.getElementById("anyWordTab").addEventListener("click", function () {
    showTab("anyWord");
  });

  setupTabContent("oneDigit");
  setupTabContent("twoDigits");
  setupTabContent("threeDigits");
  setupTabContent("anyWord");
});

// Functions to check digits on submit
function checkOneDigit() {
  var digit = document.getElementById("singleDigit").value;
  checkDigits([digit], "oneDigit");
}

function checkTwoDigits() {
  var firstDigit = document.getElementById("firstDigit").value;
  var secondDigit = document.getElementById("secondDigit").value;
  checkDigits([firstDigit, secondDigit], "twoDigits");
}

function checkThreeDigits() {
  var digitOne = document.getElementById("digitOne").value;
  var digitTwo = document.getElementById("digitTwo").value;
  var digitThree = document.getElementById("digitThree").value;
  checkDigits([digitOne, digitTwo, digitThree], "threeDigits");
}

function checkWord() {
  var word = document.getElementById("word").value;
  var flag = 0;
  if (isNaN(word)) {
    flag += word.length;
  } else {
    for (let i = 0; i < word.length; i++) {
      flag += parseInt(word.charAt(i));
    }
  }

  if (flag === 7) {
    showCongratulations(word, "anyWord");
    jsConfetti.addConfetti(); // Add confetti on correct input
  } else {
    showAlert("Not the lucky number", "anyWord");
  }
}
