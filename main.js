//------------------------GAME simon ------------------

let gameseq = [];
let userseq = [];
let started = false;
let level = 0;

let btns = ["yellow", "pink", "green", "blue"];

let h2 = document.querySelector("h2");
let allbtn = document.querySelectorAll(".btn");
let button = document.querySelector("button");

button.addEventListener("click", function () {
  if (started == false) {
    console.log("Game is Started");
    started = true;
    levelup();
  }
});

//---------game flash color
function gameflash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 150);
}

//---------user flash color
function userflash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 150);
}

function levelup() {
  userseq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randidx = Math.floor(Math.random() * 3);
  let randclr = btns[randidx];
  gameseq.push(randclr);
  let randbtn = document.querySelector(`.${randclr}`);
  gameflash(randbtn);
}

function check(idx) {
  // let idx = level - 1;

  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length === gameseq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! <b>Your Score ${
      level * 10
    }</b> <br/><br/>Start Again `;

    over(btn);
    reset();
  }
}

function over(btn) {
  btn.classList.add("out");
  setTimeout(function () {
    btn.classList.remove("out");
  }, 550);
}

function btnpress() {
  let btn = this;
  userflash(btn);
  let userclr = btn.getAttribute("id");
  console.log(userclr);
  userseq.push(userclr);

  check(userseq.length - 1);
}

for (btn of allbtn) {
  btn.addEventListener("click", btnpress);
}

function reset() {
  userseq = [];
  gameseq = [];
  level = 0;
  started = false;
  btnpress();
}
