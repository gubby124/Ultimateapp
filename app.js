import { renderTap } from './tabs/tap.js';
import { renderMemory } from './tabs/memory.js';
import { renderSounds } from './tabs/sounds.js';
import { renderQuotes } from './tabs/quotes.js';
import { renderSettings } from './tabs/settings.js';
import { renderLeaderboard } from './tabs/leaderboard.js';

function switchTab(tabId, button) {
  // Hide all tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });

  // Show selected tab
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }

  // Remove active style from all buttons
  document.querySelectorAll('.tab-option').forEach(btn => {
    btn.classList.remove('active');
  });

  // Highlight selected button
  button.classList.add('active');

  // Move the animated pill
  const indicator = document.getElementById('tabIndicator');
  const tabRect = button.getBoundingClientRect();
  const barRect = document.getElementById('tabBar').getBoundingClientRect();
  const offset = tabRect.left - barRect.left;

  indicator.style.width = `${tabRect.width}px`;
  indicator.style.transform = `translateX(${offset}px)`;
}

// Expose switchTab globally so HTML onclick works
window.switchTab = switchTab;

// Load all tab UIs
renderTap();
renderMemory();
renderSounds();
renderQuotes();
renderSettings();
renderLeaderboard();

// Initial setup when page loads
window.onload = () => {
  // Load avatar
  const avatar = localStorage.getItem('avatar');
  if (avatar) {
    const avatarDisplay = document.getElementById('avatar-display');
    if (avatarDisplay) avatarDisplay.innerText = avatar;
  }

  // Apply dark mode if saved
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
  }

  // Trigger active tab animation
  const activeBtn = document.querySelector('.tab-option.active');
  if (activeBtn) {
    const activeText = activeBtn.innerText.toLowerCase();
    switchTab(activeText, activeBtn);
  }
};
