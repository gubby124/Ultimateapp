import { renderTap } from './tabs/tap.js';
import { renderMemory } from './tabs/memory.js';
import { renderSounds } from './tabs/sounds.js';
import { renderQuotes } from './tabs/quotes.js';
import { renderSettings } from './tabs/settings.js';
import { renderLeaderboard } from './tabs/leaderboard.js';

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

window.switchTab = switchTab;

// Run all tab renderers
renderTap();
renderMemory();
renderSounds();
renderQuotes();
renderSettings();
renderLeaderboard();

// Utility: Generate a random name for Settings tab
export function generateRandomName() {
  const adjectives = ["Cool", "Fast", "Electric", "Happy", "Spicy", "Brave"];
  const animals = ["Tiger", "Penguin", "Wolf", "Otter", "Shark", "Falcon"];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const number = Math.floor(Math.random() * 100);
  return `${adj}${animal}${number}`;
}

window.onload = () => {
  const active = document.querySelector('.tab-option.active');
  if (active) switchTab(active.innerText.toLowerCase(), active);

  // Load dark mode and avatar
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
  }

  const avatar = localStorage.getItem('avatar');
  if (avatar) {
    document.getElementById('avatar-display').innerText = avatar;
  }
};
