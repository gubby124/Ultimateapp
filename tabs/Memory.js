export function renderMemory() {
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
      document.getElementById('fail-sound').play();
      userInput = [];
      acceptingInput = false;
    } else if (userInput.length === sequence.length) {
      status.innerText = "You got it!";
      document.getElementById('success-sound').play();
      acceptingInput = false;
      if (sequence.length > highScore) {
        localStorage.setItem('memoryHighScore', sequence.length);
        scoreDisplay.innerText = "Best Streak: " + sequence.length;
      }
    }
  }
}
