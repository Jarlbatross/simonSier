//model

let app = document.getElementById('app');
let btnArray = ['red', 'green', 'blue', 'yellow']
let buttonBlink=['','','','']
let disableBtn = 'disabled';
let counter = 0;
let pastBlinksArray = [];
let picksArray = [];
let userIndex = 0;
let score = 0;
let highscore = 0;



//view

updateView();
function updateView() {
    let buttons = ''
    for (let i = 0; i < btnArray.length; i++) {
        buttons += `
        <div class="${btnArray[i]} ${buttonBlink[i]} ${disableBtn} shape"  onclick="userSelect(${i})"></div>
        `;
    }
    app.innerHTML = /*html*/ `
   <h1 class="cont">Simon sier:</h1>
            <div class="stil">${buttons}</div>
            <div class="cont">
            <button onclick = startGame()>Start</button><br>
            <div>score: ${score} </div>
            </div>
            <div class="cont">Highscore: ${highscore}</div>;
`
}

//controller


// function newBlink() {
//     let randomBlink = Math.floor((Math.random() * btnArray.length));
//     pastBlinksArray.push(btnArray[randomBlink]);
//     buttonBlink[randomBlink] = 'blink';
//     updateView();
//     setTimeout(function () {
//         buttonBlink[randomBlink]='';
//         updateView()
//     },300);
// }

function newBlink() {
    let randomBlink = Math.floor(Math.random() * btnArray.length);
    pastBlinksArray.push(btnArray[randomBlink]);
    userIndex = 0;
    playSequence();
  }

function playSequence() {
    if (userIndex < pastBlinksArray.length) {
        let index = btnArray.indexOf(pastBlinksArray[userIndex]);
        buttonBlink[index] = 'blink'
        updateView();
        setTimeout(function () {
            buttonBlink[index] = '';
            updateView();
            userIndex++;
            playSequence();
        }, 300)
    } else {
        disableBtn = '';
        updateView()
      }
  }

function startGame() {
    if (counter === 0) {
        setTimeout(newBlink, 400)
        counter++
        disableBtn = ''
    };
};

function userSelect(index) {
    picksArray.push(btnArray[index]);
    buttonBlink[index] = 'blink';
    updateView();
    setTimeout(function () {
        buttonBlink[index] = '';
        updateView();
    }, 100);
checkAnswer()
}


function checkAnswer() {
    if (picksArray.length === pastBlinksArray.length) {
      // The user has entered a sequence of the same length as the one shown
      for (let i = 0; i < picksArray.length; i++) {
        if (picksArray[i] !== pastBlinksArray[i]) {
          // User's sequence does not match, reset the game
          if (score > highscore) {
            highscore = score;
          }
          score = 0;
            picksArray = [];
            pastBlinksArray = [];
          userIndex = 0;
          disableBtn = 'disabled';
          document.querySelector('body').classList.add('wrong');
          setTimeout(function () {
            document.querySelector('body').classList.remove('wrong');
          }, 200);
          counter = 0;
          return;
        }
      }
      // User's sequence matches the one shown
      userIndex = 0;
      score++;
      picksArray = [];
      setTimeout(newBlink, 400);
    }
  }