function switchTab(tabId, button) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  const tab = document.getElementById(tabId);
  tab.classList.add('active');

  const indicator = document.getElementById('tabIndicator');
  const buttons = [...document.querySelectorAll('.tab-option')];
  const index = buttons.indexOf(button);
  buttons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');

  const width = button.offsetWidth;
  const offset = button.offsetLeft - button.parentElement.offsetLeft;
  indicator.style.width = `${width}px`;
  indicator.style.transform = `translateX(${offset}px)`;
}

function renderQuote() {
  const container = document.getElementById('quote');
  const quotes = [
    "Stay hungry. Stay foolish.",
    "Be yourself; everyone else is taken.",
    "You miss 100% of the shots you don’t take.",
    "Believe you can and you're halfway there.",
    "The journey of a thousand miles begins with one step."
  ];
  const p = document.createElement('p');
  const btn = document.createElement('button');
  p.innerText = quotes[0];
  btn.innerText = "New Quote";
  btn.onclick = () => {
    p.innerText = quotes[Math.floor(Math.random() * quotes.length)];
  };
  container.append(p, btn);
}

function renderMood() {
  const moods = ["😄", "🙂", "😐", "☹️", "😢"];
  const container = document.getElementById('mood');
  const p = document.createElement('p');
  const row = document.createElement('div');
  moods.forEach(mood => {
    const span = document.createElement('span');
    span.className = 'emoji-button';
    span.innerText = mood;
    span.onclick = () => { p.innerText = "You selected: " + mood; };
    row.appendChild(span);
  });
  container.append("How are you feeling?", row, p);
}

function renderSounds() {
  const sounds = [
    { label: "Pop", url: "https://www.fesliyanstudios.com/play-mp3/387" },
    { label: "Click", url: "https://www.fesliyanstudios.com/play-mp3/3872" }
  ];
  const container = document.getElementById('sound');
  sounds.forEach(sound => {
    const btn = document.createElement('button');
    btn.innerText = sound.label;
    btn.onclick = () => new Audio(sound.url).play();
    container.appendChild(btn);
  });
}

function renderTapGame() {
  const container = document.getElementById('tap');
  const score = document.createElement('p');
  let count = 0;
  score.innerText = 'Score: 0';
  const btn = document.createElement('button');
  btn.innerText = 'Tap Me!';
  btn.onclick = () => {
    count++;
    score.innerText = 'Score: ' + count;
  };
  container.append(score, btn);
}

function renderHabits() {
  const container = document.getElementById('habits');
  const habits = ['Drink Water', 'Exercise', 'Read 10 Pages'];
  habits.forEach(habit => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    label.append(checkbox, " " + habit);
    container.append(label, document.createElement('br'));
  });
}

function renderMemory() {
  const container = document.getElementById('memory');
  const colors = ['red', 'green', 'blue', 'yellow'];
  let sequence = [];
  let userInput = [];
  let acceptingInput = false;
  const status = document.createElement('p');
  const row = document.createElement('div');
  row.className = 'memory-circles';

  const circles = colors.map((color, index) => {
    const circle = document.createElement('div');
    circle.className = 'memory-circle';
    circle.style.backgroundColor = color;
    circle.onclick = () => {
      if (!acceptingInput) return;
      userInput.push(index);
      checkInput();
    };
    row.appendChild(circle);
    return circle;
  });

  const btn = document.createElement('button');
  btn.innerText = 'New Game';
  btn.onclick = () => {
    sequence = Array.from({ length: 5 }, () => Math.floor(Math.random() * 4));
    userInput = [];
    acceptingInput = false;
    status.innerText = "Watch the pattern...";
    flashSequence();
  };

  container.append(status, row, btn);

  function flashSequence() {
    sequence.forEach((index, i) => {
      setTimeout(() => {
        circles[index].classList.add('highlight');
        setTimeout(() => {
          circles[index].classList.remove('highlight');
          if (i === sequence.length - 1) {
            acceptingInput = true;
            status.innerText = "Now you try!";
          }
        }, 400);
      }, i * 600);
    });
  }

  function checkInput() {
    const current = userInput.length - 1;
    if (userInput[current] !== sequence[current]) {
      status.innerText = "Wrong! Try again.";
      userInput = [];
      acceptingInput = false;
    } else if (userInput.length === sequence.length) {
      status.innerText = "You got it!";
      acceptingInput = false;
    }
  }
}

// Render everything
renderQuote();
renderMood();
renderSounds();
renderTapGame();
renderHabits();
renderMemory();

window.onload = () => {
  const active = document.querySelector('.tab-option.active');
  if (active) switchTab(active.innerText.toLowerCase(), active);
};
