export function renderLeaderboard() {
  const container = document.getElementById('leaderboard');
  container.innerHTML = "<h2>Leaderboard</h2>";
  const list = document.createElement('ol');
  container.appendChild(list);

  async function load() {
    const { db, firebaseTools } = window;
    const { collection, getDocs, query, orderBy, limit } = firebaseTools;
    const q = query(collection(db, "leaderboard"), orderBy("score", "desc"), limit(10));
    const snapshot = await getDocs(q);
    list.innerHTML = "";
    snapshot.forEach(doc => {
      const d = doc.data();
      const item = document.createElement('li');
      item.textContent = `${d.avatar || "🙂"} ${d.name}: ${d.score}`;
      list.appendChild(item);
    });
  }

  load();
}
