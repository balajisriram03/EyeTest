function _(id) {
  return document.getElementById(id);
}

let randomBox;
let alpha = 0.8;
let score = 0;
let lives = 3;
let sightStatus = "Calculating..."; 

function createBox(id) {
  const box = document.createElement('div');
  box.classList.add('box');
  box.id = `b${id}`;
  return box;
}

function createTiles(n) {
  const wrapper = document.querySelector(".wrapper");
  for (let i = 0; i < n; i++) {
    wrapper.appendChild(createBox(i));
  }
}

function setBackgroundColor() {
  let red, green, blue;

  do {
    red = Math.floor(Math.random() * 256);
    green = Math.floor(Math.random() * 256);
    blue = Math.floor(Math.random() * 256);
  } while (
    Math.abs(red - green) < 30 ||
    Math.abs(red - blue) < 30 ||
    Math.abs(green - blue) < 30 ||
    (red < 30 && green < 30 && blue < 30) ||
    (red > 225 && green > 225 && blue > 225)
  );

  const baseColor = `rgb(${red},${green},${blue})`;
  const allBoxes = document.querySelectorAll(".box");

  allBoxes.forEach(function (ele) {
    ele.style.backgroundColor = baseColor;
  });

  randomBox = Math.floor(Math.random() * 16);
  alpha += 0.01;

  const selectedBox = document.getElementById(`b${randomBox}`);
  selectedBox.style.backgroundColor = `rgba(${red},${green},${blue},${alpha})`;
}

function handleBoxClick(ev) {
  const rc = ev.target.id.slice(1);
  if (rc == randomBox) {
    setBackgroundColor();
    score += 1;
    _("score").textContent = score;

    if (score > 10) {
      sightStatus = "Strong";
    } else if (score >= 6 && score <= 10) {
      sightStatus = "Average";
    }

    _("sight-status").innerHTML = `Ophthalmic State: <b>${sightStatus}</b>`;

  } else {
    if (lives > 0) {
      lives--;
      _("lives").textContent = lives;
    }
    if (lives === 0) {
      if (score >= 6 && score <= 10) {
        sightStatus = "Average";
      } 
      else if (score > 10) {
        sightStatus = "Strong";
      } else {
        sightStatus = "Poor";
      }
      _("sight-status").innerHTML = `Ophthalmic State: <b>${sightStatus}</b>`;
      const wrapper = document.querySelector(".wrapper");
      wrapper.textContent = ""; 
      switch (sightStatus) {
        case "Poor":
          wrapper.textContent += " Game Over. Your visual acuity is below average, indicating poor eyesight.";
          break;
        case "Average":
          wrapper.textContent += " Game Over. Your visual acuity falls within the average range, indicating normal eyesight.";
          break;
        case "Strong":
          wrapper.textContent += " Game Over. Your visual acuity is exceptionally high, indicating strong eyesight.";
          break;
      }
    }
  }
}

createTiles(16);
setBackgroundColor();
document.querySelector('.wrapper').addEventListener("click", handleBoxClick);