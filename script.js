let time = 60;
document.addEventListener("DOMContentLoaded", event => {
  const ball = document.getElementById("ball");
  const leftBox = document.getElementById("leftBox");
  const centerBox = document.getElementById("centerBox");
  const rightBox = document.getElementById("rightBox");
  const scoreBox = document.getElementById("score");
  const timer = document.getElementById("timer");
  const restartBTN = document.getElementById("restartBTN");

  setBallAndBoxColors();
  startTimer();
 

  restartBTN.addEventListener("click", () => {
    setBallAndBoxColors();
    startTimer();
    time = 60;
    scoreBox.textContent = 0;
  });

  const startTimer =() => {
    const timerId = setInterval(() => {
      time--;
      timer.textContent = time + " Seconds";
      time === 0
        ? (alert("Your final score is: " + scoreBox.textContent),
          clearInterval(timerId))
        : null;
    }, 1000);
  }
});

//functiond
const setBallAndBoxColors = () => {
  const Colors = [getRandomColor(), getRandomColor()];

  const randomColor = Math.floor(Math.random() * Colors.length);

  setColor(ball, Colors[randomColor]);
  setColor(leftBox, Colors[0]);
  setColor(rightBox, Colors[1]);
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const setColor = (element, color) => {
  element.style.backgroundColor = color;
};

const allowDrop = ev => {
  ev.preventDefault();
};

const drag = ev => {
  ev.dataTransfer.setData("ballID", ev.target.id);
};

const drop = ev => {
  ev.preventDefault();
  if (time > 0) {
    let ballID = ev.dataTransfer.getData("ballID");
    let ball = document.getElementById(ballID);
    ev.target.appendChild(ball);
    const scoreBox = document.getElementById("score");
    checkColor(ev.target, ball)
      ? (scoreBox.textContent = parseInt(scoreBox.textContent) + 1)
      : null;
    setTimeout(() => {
      setBallAndBoxColors();
      centerBox.appendChild(ball);
    }, 1000);
  }
};

const checkColor = (parentEL, childEL) => {
  return parentEL.style.backgroundColor === childEL.style.backgroundColor;
};
