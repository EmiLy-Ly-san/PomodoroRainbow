//VARIABLES
let timerView = document.querySelector(".timerView");
//Buttons
let buttonsBar = document.querySelector(".buttonsBar");
let playButton = document.querySelector(".buttonPlay");
let stopButton = document.querySelector(".buttonStop");
let pauseButton = document.querySelector(".buttonPause");
let breakSessionButton = document.querySelector(".breakSession");
let WorkSessionButton = document.querySelector(".workSession");
/*//workRainbow
let workLimeRainbow = document.querySelector(".lime");
let workPeachRainbow = document.querySelector(".peach");
let workCorailRainbow = document.querySelector(".corail");
let workRoseRainbow = document.querySelector(".rose");
let workPurpleRainbow = document.querySelector(".purple");
//breakRainbow
let breakRainbow = document.querySelector(".breakRainbow");
let breakBlueRainbow = document.querySelector(".blue");
let breakSkyBlueRainbow = document.querySelector(".skyBlue");
let breakLightBlueRainbow = document.querySelector(".lightBlue");
let breakGreenRainbow = document.querySelector(".green");
let breakLimeGreenRainbow = document.querySelector(".limeGreen");*/
let sessionTime;
let timeCalled;
let minutes = 25;
let secondes = "00";
let interval;

let alarmAudio = new Audio("alarms/Voicy_Star Wars Main Theme (Full).mp3");
let stopAlarmButton = document.querySelector(".stopAlarmButton");

//THEMES//
class Theme {
  constructor(themeConfig) {
    this.ringSound = themeConfig.ringSound;
    this.ringPicture = themeConfig.ringPicture;
  }
}

const starWarsConfig = {
  ringSound: "alarms/Voicy_Star Wars Main Theme (Full).mp3",
  ringPicture: "images/icons8-soldat-d'assaut.svg",
};

const strangerThingsConfig = {
  ringSound: "alarms/Voicy_stranger things beat.mp3",
  ringPicture: "images/icons8-maxine-mayfield.svg",
};

const animalCrossingConfig = {
  ringSound: "alarms/Voicy_Animal Crossing New Horizons Theme music.mp3",
  ringPicture: "images/Bluebear_NH_Villager_Icon.png",
};

const themeCollection = {
  starWars: new Theme(starWarsConfig),
  strangerThings: new Theme(strangerThingsConfig),
  animalCrossing: new Theme(animalCrossingConfig),
};

let themeButtons = document.querySelectorAll("button[data-themeColors]");
let themeUserChoice;

function setTheme() {
  //GENERALS COLORS

  [...themeButtons].forEach(function (themeButton) {
    themeButton.addEventListener("click", () => {
      themeUserChoice = themeCollection[themeButton.id];
      console.log(themeUserChoice);
      const currentButtonThemeColors =
        themeButton.getAttribute("data-themeColors");
      const newBodyThemeClassName = `themeColors-${currentButtonThemeColors}`;
      document.body.classList = ""; //NEED TO LEARN REGEXP TO FIX IT BETTER
      document.body.classList.add(newBodyThemeClassName);

      //ALARM SETTING
      alarmAudio = new Audio(`${themeUserChoice.ringSound}`);
      document
        .querySelector(".iconAlarm")
        .setAttribute("src", `${themeUserChoice.ringPicture}`);
    });
  });
}

//STYLE AND CONTENT PRESET
setTimeInTimerView(minutes, secondes);
WorkSessionButtonAvailable();
breakSessionButtonAvailable();
stopAlarmButtonHidden();
setTheme();

//containerAlarm.style.display = "none";

// FUNCTION INTERACTIVITY
/******RAINBOWS*/
/*function workRainbowInitalColor() {
  workLimeRainbow.style.background = "#FBF8CC";
  workPeachRainbow.style.background = "#FDE4CF";
  workCorailRainbow.style.background = "#FFCFD2";
  workRoseRainbow.style.background = "#F1C0E8";
  workPurpleRainbow.style.background = "#CFBAF0";
}

function workRainbowPink() {
  workLimeRainbow.style.background = "var(--shadowColor)";
  workPeachRainbow.style.background = "var(--shadowColor)";
  workCorailRainbow.style.background = "var(--shadowColor)";
  workRoseRainbow.style.background = "var(--shadowColor)";
  workPurpleRainbow.style.background = "var(--shadowColor)";
}

function breakRainbowInitialColor() {
  breakBlueRainbow.style.background = "#A3C4F3";
  breakSkyBlueRainbow.style.background = "#90DBF4";
  breakLightBlueRainbow.style.background = "#8EECF5";
  breakGreenRainbow.style.background = "#98F5E1";
  breakLimeGreenRainbow.style.background = "#B9FBC0";
}

function breakRainbowPink() {
  breakBlueRainbow.style.background = "var(--shadowColor)";
  breakSkyBlueRainbow.style.background = "var(--shadowColor)";
  breakLightBlueRainbow.style.background = "var(--shadowColor)";
  breakGreenRainbow.style.background = "var(--shadowColor)";
  breakLimeGreenRainbow.style.background = "var(--shadowColor)";
}*/

/*****BUTTONSBAR*/
function buttonsBarHidden() {
  buttonsBar.classList.add("hidden");
}

function buttonsBarVisible() {
  buttonsBar.classList.remove("hidden");
}

/******PLAYBUTTON*/
function playButtonAvailable() {
  playButton.addEventListener("click", startSession);
  playButton.classList.remove("disabled");
}

function playButtonDisabled() {
  playButton.classList.add("disabled");
}

/******PAUSEBUTTON*/
function pauseButtonAvailable() {
  pauseButton.addEventListener("click", pause);
  pauseButton.classList.remove("disabled");
}

function pauseButtonDisabled() {
  pauseButton.classList.add("disabled");
}

/******STOPBUTTON*/
function stopButtonAvailable() {
  stopButton.addEventListener("click", stop);
  stopButton.classList.remove("disabled");
}

function stopButtonDisabled() {
  stopButton.classList.add("disabled");
}

/******WORKSESSIONBUTTON*/
function WorkSessionButtonAvailable() {
  WorkSessionButton.addEventListener("click", onclickNewWorkSession);
  WorkSessionButton.classList.remove("disabled");
  WorkSessionButton.classList.remove("hidden");
}

function WorkSessionButtonDisabled() {
  WorkSessionButton.classList.add("disabled");
}

/******BREAKSESSIONBUTTON*/
function breakSessionButtonAvailable() {
  breakSessionButton.addEventListener("click", onclickBreakCallButton);
  breakSessionButton.classList.remove("disabled");
  breakSessionButton.classList.remove("hidden");
}

function breakSessionButtonDisabled() {
  breakSessionButton.classList.add("disabled");
}

/******ANIMATION ICON ALARM */
const iconAlarm = document.querySelector(".iconAlarm");
const containerAlarm = document.querySelector(".containerAlarm");

function animateIconAlarm() {
  iconAlarm.classList.add("animationRotation");
  containerAlarm.classList.add("doubleBorder");
}

function dontAnimateIconAlarm() {
  iconAlarm.classList.remove("animationRotation");
  containerAlarm.classList.remove("doubleBorder");
}

/******AUDIO ALARM*/
function ringAlarm() {
  alarmAudio.loop = true;
  alarmAudio.play();
}

function stopAlarmButtonHidden() {
  stopAlarmButton.classList.add("hidden");
}

function stopAlarmButtonVisible() {
  stopAlarmButton.addEventListener("click", stopAlarm);
  stopAlarmButton.classList.remove("hidden");
}

function stopAlarm() {
  alarmAudio.pause();
  alarmAudio.loop = false;
  stopAlarmButtonHidden();
  timerView.textContent = `New session ?`;
  WorkSessionButtonAvailable();
  breakSessionButtonAvailable();
  dontAnimateIconAlarm();
}

////FUNCTIONS GENERAL

function transformTimeAsADate(sessionTime) {
  timeAsADate = new Date(sessionTime);
  minutes = timeAsADate.getMinutes();
  secondes = timeAsADate.getSeconds();
}

function onclickNewWorkSession() {
  timeCalled = 25 * 60 * 1000;
  sessionTime = timeCalled;
  transformTimeAsADate(sessionTime);
  setTimeInTimerView(minutes, secondes);
  startSession();
  buttonsBarVisible();
  WorkSessionButtonDisabled();
  breakSessionButtonAvailable();
  playButtonDisabled();
  pauseButtonAvailable();
  stopButtonAvailable();
}

function onclickBreakCallButton() {
  timeCalled = 5 * 1000;
  sessionTime = timeCalled;
  transformTimeAsADate(sessionTime);
  setTimeInTimerView(minutes, secondes);
  startSession();
  buttonsBarVisible();
  breakSessionButtonDisabled();
  WorkSessionButtonAvailable();
  playButtonDisabled();
  pauseButtonAvailable();
  stopButtonAvailable();
}

function setTimeInTimerView(minutes, secondes) {
  timerView.textContent = `${minutes} mn : ${
    secondes == 0 ? "00" : secondes
  } s`;
}

function startSession() {
  document.body.classList.remove("pom-stop");
  document.body.classList.remove("pom-pause");
  document.body.classList.add("pom-play");
  clearInterval(interval);
  interval = setInterval(countDown, 1000);
  playButtonAvailable();
  pauseButtonAvailable();
  stopButtonAvailable();
}

function countDown() {
  sessionTime = sessionTime - 1000;
  transformTimeAsADate(sessionTime);
  minutes = timeAsADate.getMinutes();
  secondes = timeAsADate.getSeconds();
  timerView.textContent = `${minutes} mn : ${secondes} s`;
  if (sessionTime < 0) {
    clearInterval(interval);
    buttonsBarHidden();
    timerView.textContent = `Time out`;
    WorkSessionButton.classList.add("hidden");
    breakSessionButton.classList.add("hidden");
    ringAlarm();
    animateIconAlarm();
    stopAlarmButtonVisible();
  }
}

function stop() {
  document.body.classList.remove("pom-play");
  document.body.classList.remove("pom-pause");
  document.body.classList.add("pom-stop");
  clearInterval(interval);
  sessionTime = timeCalled;
  transformTimeAsADate(sessionTime);
  setTimeInTimerView(minutes, secondes);
  stopButtonDisabled();
  playButtonAvailable();
  pauseButtonDisabled();
}

function pause() {
  document.body.classList.remove("pom-stop");
  document.body.classList.remove("pom-play");
  document.body.classList.add("pom-pause");
  clearInterval(interval);
  pauseButtonDisabled();
  stopButtonDisabled();
  playButtonAvailable();
}
