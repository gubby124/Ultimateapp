function switchTab(tabId, button) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');

  document.querySelectorAll('.tab-option').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');

  const indicator = document.getElementById('tabIndicator');
  const tabRect = button.getBoundingClientRect();
  const barRect = document.getElementById('tabBar').getBoundingClientRect();
  const offset = tabRect.left - barRect.left;

  indicator.style.width = `${tabRect.width}px`;
  indicator.style.transform = `translateX(${offset}px)`;
}

function playSound(id) {
  const audio = document.getElementById(id);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

function renderQuote() {
  const container = document.getElementById('quote');
  const quotes = [
    "Stay hungry. Stay foolish.",
    "Be yourself; everyone else is taken.",
    "You miss 100% of the shots you don’t take.",
    "Believe you can and you're halfway there.",
    "The journey of a thousand miles begins with one step.",
    "Do or do not. There is no try.",
    "The only way to do great work is to love what you do.",
    "Happiness is not by chance, but by choice.",
    "Strive not to be a success, but to be of value.",
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "Everything you can imagine is real.",
    "Work hard in silence, let your success be your noise.",
    "Doubt kills more dreams than failure ever will.",
    "Big journeys begin with small steps.",
    "Success is a journey, not a destination."
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

function renderSettings() {
  const container = document.getElementById('settings');
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Enter your name';
  nameInput.value = localStorage.getItem('username') || '';

  const avatarInput = document.createElement('input');
  avatarInput.type = 'text';
  avatarInput.placeholder = 'Enter emoji avatar';
  avatarInput.value = localStorage.getItem('avatar') || '';

  nameInput.onchange = () => {
    localStorage.setItem('username', nameInput.value);
  };
  avatarInput.onchange = () => {
    localStorage.setItem('avatar', avatarInput.value);
    document.getElementById('avatar-display').innerText = avatarInput.value;
  };

  const darkModeToggle = document.createElement('input');
  darkModeToggle.type = 'checkbox';
  darkModeToggle.checked = localStorage.getItem('darkMode') === 'true';
  darkModeToggle.onchange = () => {
    const enabled = darkModeToggle.checked;
    document.body.classList.toggle('dark', enabled);
    localStorage.setItem('darkMode', enabled);
  };

  const darkModeLabel = document.createElement('label');
  darkModeLabel.append(darkModeToggle, " Dark Mode");

  const resetBtn = document.createElement('button');
  resetBtn.innerText = "Reset All Data";
  resetBtn.onclick = () => {
    if (confirm("Are you sure? This will reset all saved data.")) {
      localStorage.clear();
      location.reload();
    }
  };

  container.append("Your Name:", nameInput, "Your Avatar:", avatarInput, darkModeLabel, document.createElement('br'), resetBtn);
}

function renderTapGame() {
  const container = document.getElementById('tap');
  const highScore = localStorage.getItem('tapHighScore') || 0;
  let score = 0;

  const scoreText = document.createElement('p');
  const highScoreText = document.createElement('p');
  const btn = document.createElement('button');

  scoreText.innerText = 'Score: 0';
  highScoreText.innerText = 'High Score: ' + highScore;
  btn.innerText = 'Tap Me!';
  btn.onclick = () => {
    score++;
    playSound('click-sound');
    scoreText.innerText = 'Score: ' + score;
    if (score > highScore) {
      localStorage.setItem('tapHighScore', score);
      highScoreText.innerText = 'High Score: ' + score;
    }
  };

  container.append(scoreText, highScoreText, btn);
}

function renderMemory() {
  const container = document.getElementById('memory');
  const colors = ['red', 'green', 'blue', 'yellow'];
  let sequence = [];
  let userInput = [];
  let acceptingInput = false;
  const highScore = parseInt(localStorage.getItem('memoryHighScore') || 0);

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

  const scoreDisplay = document.createElement('p');
  scoreDisplay.innerText = "Best Streak: " + highScore;

  container.append(status, row, btn, scoreDisplay);

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
      playSound('fail-sound');
      userInput = [];
      acceptingInput = false;
    } else if (userInput.length === sequence.length) {
      status.innerText = "You got it!";
      playSound('success-sound');
      acceptingInput = false;
      if (sequence.length > highScore) {
        localStorage.setItem('memoryHighScore', sequence.length);
        scoreDisplay.innerText = "Best Streak: " + sequence.length;
      }
    }
  }
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

// INIT ALL
renderQuote();
renderTapGame();
renderMemory();
renderSounds();
renderMood();
renderHabits();
renderSettings();

// Restore preferences on load
window.onload = () => {
  const active = document.querySelector('.tab-option.active');
  if (active) switchTab(active.innerText.toLowerCase(), active);
  if (localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark');
  const avatar = localStorage.getItem('avatar');
  if (avatar) document.getElementById('avatar-display').innerText = avatar;
};
