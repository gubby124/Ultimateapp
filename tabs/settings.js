import { generateRandomName } from '../app.js';

export function renderSettings() {
  const container = document.getElementById('settings');
  container.innerHTML = "<h2>Settings</h2>";

  // Name input
  const nameLabel = document.createElement('label');
  nameLabel.textContent = "Your Name:";

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Enter your name';
  nameInput.value = localStorage.getItem('username') || '';

  const randomBtn = document.createElement('button');
  randomBtn.innerText = "Generate Random Name";

  randomBtn.onclick = () => {
    const random = generateRandomName();
    nameInput.value = random;
    localStorage.setItem('username', random);
  };

  nameInput.oninput = () => {
    localStorage.setItem('username', nameInput.value.trim());
  };

  // Avatar input
  const avatarLabel = document.createElement('label');
  avatarLabel.textContent = "Your Avatar (emoji):";

  const avatarInput = document.createElement('input');
  avatarInput.type = 'text';
  avatarInput.placeholder = '🙂';
  avatarInput.value = localStorage.getItem('avatar') || '';

  avatarInput.oninput = () => {
    localStorage.setItem('avatar', avatarInput.value.trim());
    document.getElementById('avatar-display').innerText = avatarInput.value.trim();
  };

  // Dark mode toggle
  const darkModeToggle = document.createElement('input');
  darkModeToggle.type = 'checkbox';
  darkModeToggle.checked = localStorage.getItem('darkMode') === 'true';

  darkModeToggle.onchange = () => {
    const enabled = darkModeToggle.checked;
    document.body.classList.toggle('dark', enabled);
    localStorage.setItem('darkMode', enabled);
  };

  const darkModeLabel = document.createElement('label');
  darkModeLabel.append(darkModeToggle, " Enable Dark Mode");

  // Reset button
  const resetBtn = document.createElement('button');
  resetBtn.innerText = "Reset All Data";
  resetBtn.onclick = () => {
    if (confirm("Are you sure you want to clear all saved data?")) {
      localStorage.clear();
      location.reload();
    }
  };

  // Add everything to the page
  container.append(
    nameLabel, nameInput, randomBtn,
    avatarLabel, avatarInput,
    document.createElement('br'),
    darkModeLabel,
    document.createElement('br'),
    resetBtn
  );
}
