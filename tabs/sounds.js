export function renderSounds() {
  const container = document.getElementById('sound');
  container.innerHTML = "<h2>Sounds</h2>";
  const btn = document.createElement('button');
  btn.innerText = "Play Click";
  btn.onclick = () => document.getElementById('click-sound').play();
  container.appendChild(btn);
}
