export function renderTap() {
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
    document.getElementById('click-sound').play();
    scoreText.innerText = 'Score: ' + score;
    if (score > highScore) {
      localStorage.setItem('tapHighScore', score);
      highScoreText.innerText = 'High Score: ' + score;
    }
  };

  container.append(scoreText, highScoreText, btn);
}
