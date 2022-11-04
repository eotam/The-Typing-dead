const startBtn = document.querySelector("#start")
let Q = document.querySelector("#Q")
let judge = document.querySelector("#judge")
let time = document.querySelector("#time")
const returnBtn = document.querySelectorAll(".return")
let startTime
let stopTime = 0
let timeOutID


let level1 = document.querySelector("#level1")
let level2 = document.querySelector("#level2")
let level3 = document.querySelector("#level3")

let inputText = document.querySelector("#inputText")

let enemyHP
let myHP

let timeLimit
let intervalID


startBtn.addEventListener('click', function () {
  gameStart()
})


level1.addEventListener('click', function () {

  mondai()

  enemyHP = 5
  myHP = 100
  timeLimit = 100
  document.querySelector("#my").textContent = myHP
  document.querySelector("#enemy").textContent = enemyHP
  document.querySelector("#timeLimit").textContent = timeLimit

  judge.textContent = ""
  inputText.value = ""

  level()
  startTime = Date.now();
  displayTime()

  intervalID = setInterval(countDown, 1000)

  window.document.onkeydown = function (e) {

    if (e.key === 'Enter') {
      
      if (inputText.value == Q.textContent) {
        hit()
        mondai()
        timeLimit = 100
        console.log("hit処理完了")
        if (enemyHP == 0) {
          clearTimeout(timeOutID);
          gameClear()
        }


      } else {

        damage()

        if (myHP == 0) {
          clearTimeout(timeOutID);
          gameOver()
        }

      }
    }
  }

})


level2.addEventListener('click', function () {

  mondai()
  enemyHP = 10
  myHP = 50
  timeLimit = 60
  document.querySelector("#timeLimit").textContent = timeLimit
  document.querySelector("#my").textContent = myHP
  document.querySelector("#enemy").textContent = enemyHP

  judge.textContent = ""
  inputText.value = ""

  level()
  startTime = Date.now();
  displayTime()

  intervalID = setInterval(countDown, 1000)

  window.document.onkeydown = function (e) {
    if (e.key === 'Enter') {


      if (inputText.value == Q.textContent) {
        hit()
        mondai()
        timeLimit = 60

        if (enemyHP == 0) {
          clearTimeout(timeOutID);
          gameClear()
        }


      } else {

        damage()

        if (myHP == 0) {
          clearTimeout(timeOutID);
          gameOver()
        }

      }
    }
  }

})

level3.addEventListener('click', function () {

  mondai()

  enemyHP = 15
  myHP = 30
  timeLimit = 30
  document.querySelector("#my").textContent = myHP
  document.querySelector("#enemy").textContent = enemyHP

  judge.textContent = ""
  inputText.value = ""

  level()
  startTime = Date.now();
  displayTime()

  intervalID = setInterval(countDown, 1000)


  window.document.onkeydown = function (e) {
    if (e.key === 'Enter') {


      if (inputText.value == Q.textContent) {
        mondai()
        hit()
        timeLimit = 30

        if (enemyHP == 0) {
          clearTimeout(timeOutID);
          gameClear()
        }


      } else {

        damage()

        if (myHP == 0) {
          clearTimeout(timeOutID);
          gameOver()
        }

      }
    }
  }

})




returnBtn.forEach(function (e) {
  e.addEventListener("click", function () {
    returnTop()
  })
})

function displayTime() {
  const currentTime = new Date(Date.now() - startTime + stopTime);
  const m = String(currentTime.getMinutes()).padStart(2, '0');
  const s = String(currentTime.getSeconds()).padStart(2, '0');
  const ms = String(currentTime.getMilliseconds()).padStart(3, '0');

  time.textContent = `${m}:${s}.${ms}`;
  timeOutID = setTimeout(displayTime, 10);
}

function damage() {
  myHP = myHP - 10
  document.querySelector("#my").textContent = myHP
  judge.textContent = "不正解"
}

function hit() {
  enemyHP = enemyHP - 1
  document.querySelector("#enemy").textContent = enemyHP
  judge.textContent = "正解!"
  inputText.value = ""
}

function gameStart() {
  let startView = document.querySelector("#startView")
  startView.style.display = "none"

  let levelSelect = document.querySelector("#levelSelect")
  levelSelect.style.display = "flex"
}

function level() {
  let levelSelect = document.querySelector("#levelSelect")
  levelSelect.style.display = "none"
  let mainView = document.querySelector("main")
  mainView.style.display = "flex"
}

function gameClear() {
  let mainView = document.querySelector("main")
  mainView.style.display = "none"
  let clear = document.querySelector("#clear")
  clear.style.display = "flex"
}

function gameOver() {
  let mainView = document.querySelector("main")
  mainView.style.display = "none"
  let over = document.querySelector("#gameOver")
  over.style.display = "flex"
}

function returnTop() {
  let gameOver = document.querySelector("#gameOver")
  gameOver.style.display = "none"
  let = document.querySelector("#clear")
  clear.style.display = "none"

  let startView = document.querySelector("#startView")
  startView.style.display = "flex"
}

function countDown() {
  timeLimit = timeLimit - 1
  document.querySelector("#timeLimit").textContent = timeLimit
  if (myHP == 0) {
    gameOver()
    clearInterval(intervalID)
  }
  else if (timeLimit == 0) {
    damage()
    timeLimit = 30
  }
}

function mondai() {
  fetch("https://api.adviceslip.com/advice")
    .then((res) => {
      return (res.json());
    })
    .then((json) => {
      console.log(json.slip.advice)
      Q.textContent = json.slip.advice
    });
}