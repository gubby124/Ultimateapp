export function renderSettings() {
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
