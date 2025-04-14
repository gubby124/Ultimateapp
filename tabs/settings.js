import { generateRandomName } from './namegen.js';

export function renderSettings() {
  const container = document.getElementById('settings');
  container.innerHTML = "<h2>Settings</h2>";

  const nameInput = document.createElement('input');
  nameInput.placeholder = "Your Name";
  nameInput.value = localStorage.getItem('username') || "";
  nameInput.oninput = () => localStorage.setItem('username', nameInput.value);

  const randomBtn = document.createElement('button');
  randomBtn.innerText = "Random Name";
  randomBtn.onclick = () => {
    const name = generateRandomName();
    nameInput.value = name;
    localStorage.setItem('username', name);
  };

  const avatarInput = document.createElement('input');
  avatarInput.placeholder = "Emoji Avatar";
  avatarInput.value = localStorage.getItem('avatar') || "";
  avatarInput.oninput = () => {
    localStorage.setItem('avatar', avatarInput.value);
    document.getElementById('avatar-display').innerText = avatarInput.value;
  };

  const darkMode = document.createElement('input');
  darkMode.type = 'checkbox';
  darkMode.checked = localStorage.getItem('darkMode') === 'true';
  darkMode.onchange = () => {
    const enabled = darkMode.checked;
    document.body.classList.toggle('dark', enabled);
    localStorage.setItem('darkMode', enabled);
  };

  const label = document.createElement('label');
  label.append(darkMode, " Dark Mode");

  container.append(nameInput, randomBtn, avatarInput, label);
}
