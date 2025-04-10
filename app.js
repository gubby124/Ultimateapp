// Tab Switching
function switchTab(tabId) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

// Quote Generator
const quotes = [
  "Stay hungry. Stay foolish.",
  "Be yourself; everyone else is taken.",
  "You miss 100% of the shots you don’t take.",
  "Believe you can and you're halfway there.",
  "The journey of a thousand miles begins with one step."
];

function renderQuote() {
  const container = document.getElementById('quote');
  const p = document.createElement('p');
  const btn = document.createElement('button');
  p.id = 'quote-text';
  btn.innerText = 'New Quote';
  btn.onclick = () => {
    p.innerText = quotes[Math.floor(Math.random() * quotes.length)];
  };
  p.innerText = quotes[0];
  container.innerHTML = '';
  container.appendChild(p);
  container.appendChild(btn);
}

// Mood Picker
function renderMood() {
  const container = document.getElementById('mood');
  const moods = ['😄', '🙂', '😐', '☹️', '😢'];
  const current = document.createElement('p');
  const row = document.createElement('div');
  moods.forEach(m => {
    const span = document.createElement('span');
    span.innerText = m;
    span.style.fontSize = '40px';
    span.style.margin = '10px';
    span.style.cursor = 'pointer';
    span.onclick = () => {
      current.innerText = 'You selected: ' + m;
    };
    row.appendChild(span);
  });
  container.innerHTML = '<h2>How are you feeling?</h2>';
  container.appendChild(row);
  container.appendChild(current);
}

// Soundboard
function renderSounds() {
  const container = document.getElementById('sound');
  const sounds = [
    { label: 'Pop', url: 'https://www.fesliyanstudios.com/play-mp3/387' },
    { label: 'Click', url: 'https://www.fesliyanstudios.com/play-mp3/3872' }
  ];
  container.innerHTML = '<h2>Soundboard</h2>';
  sounds.forEach(sound => {
    const btn = document.createElement('button');
    btn.innerText = sound.label;
    btn.onclick = () => new Audio(sound.url).play();
    container.appendChild(btn);
    container.appendChild(document.createElement('br'));
  });
}

// Memory Game (Placeholder)
function renderMemory() {
  const container = document.getElementById('memory');
  container.innerHTML = '<h2>Memory Match</h2><p>(Coming soon...)</p>';
}

// Tap Game
function renderTapGame() {
  const container = document.getElementById('tap');
  container.innerHTML = '<h2>Tap Game</h2>';
  const score = document.createElement('p');
  score.innerText = 'Score: 0';
  let count = 0;

  const btn = document.createElement('button');
  btn.innerText = 'Tap Me!';
  btn.onclick = () => {
    count++;
    score.innerText = 'Score: ' + count;
  };

  container.appendChild(score);
  container.appendChild(btn);
}

// Habits
function renderHabits() {
  const container = document.getElementById('habits');
  const habits = ['Drink Water', 'Exercise', 'Read 10 Pages'];
  container.innerHTML = '<h2>Habits</h2>';
  habits.forEach(habit => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    label.appendChild(checkbox);
    label.append(' ' + habit);
    container.appendChild(label);
    container.appendChild(document.createElement('br'));
  });
}

// Initialize all tabs
renderQuote();
renderMood();
renderSounds();
renderMemory();
renderTapGame();
renderHabits();
