export function renderTap() {
  const container = document.getElementById('tap');
  container.innerHTML = "<h2>Tap Game</h2>";

  let count = 0;
  let highScore = parseInt(localStorage.getItem('tapHighScore')) || 0;

  const counter = document.createElement('h3');
  counter.innerText = `Score: ${count}`;

  const highScoreDisplay = document.createElement('p');
  highScoreDisplay.innerText = `High Score: ${highScore}`;

  const tapBtn = document.createElement('button');
  tapBtn.innerText = "Tap!";
  tapBtn.onclick = () => {
    count++;
    counter.innerText = `Score: ${count}`;
    document.getElementById('click-sound').play();

    if (count > highScore) {
      highScore = count;
      localStorage.setItem('tapHighScore', highScore);
      highScoreDisplay.innerText = `High Score: ${highScore}`;
      submitScoreToLeaderboard(highScore);
    }
  };

  const resetBtn = document.createElement('button');
  resetBtn.innerText = "Reset Score";
  resetBtn.onclick = () => {
    count = 0;
    counter.innerText = `Score: ${count}`;
  };

  container.append(counter, highScoreDisplay, tapBtn, resetBtn);
}

function submitScoreToLeaderboard(score) {
  const username = localStorage.getItem('username') || "Player";
  const avatar = localStorage.getItem('avatar') || "🙂";
  const { db, firebaseTools } = window;
  const { collection, addDoc } = firebaseTools;

  addDoc(collection(db, "leaderboard"), {
    name: username,
    score,
    avatar,
    timestamp: Date.now()
  });
}
