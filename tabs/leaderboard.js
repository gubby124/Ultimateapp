import { generateRandomName } from './namegen.js';

export function renderLeaderboard() {
  const container = document.getElementById('leaderboard');
  container.innerHTML = "<h2>Leaderboard</h2>";

  const list = document.createElement('ol');
  container.appendChild(list);

  async function loadLeaderboard() {
    const { db, firebaseTools } = window;
    const { collection, getDocs, query, orderBy, limit } = firebaseTools;

    try {
      const q = query(collection(db, "leaderboard"), orderBy("score", "desc"), limit(10));
      const snapshot = await getDocs(q);

      list.innerHTML = "";
      snapshot.forEach(doc => {
        const data = doc.data();
        const item = document.createElement('li');
        item.textContent = `${data.avatar || "🙂"} ${data.name}: ${data.score}`;
        list.appendChild(item);
      });
    } catch (err) {
      console.error("Error loading leaderboard:", err);
      list.innerHTML = "<li>Unable to load leaderboard.</li>";
    }
  }

  loadLeaderboard();
}
