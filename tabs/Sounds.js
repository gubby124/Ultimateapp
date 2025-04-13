export function renderSounds() {
  const container = document.getElementById('sound');
  const sounds = [
    { label: "Pop", url: "https://www.fesliyanstudios.com/play-mp3/387" },
    { label: "Click", url: "https://www.fesliyanstudios.com/play-mp3/3872" }
  ];
  sounds.forEach(sound => {
    const btn = document.createElement('button');
    btn.innerText = sound.label;
    btn.onclick = () => new Audio(sound.url).play();
    container.appendChild(btn);
  });
}
