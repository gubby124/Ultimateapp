import { generateRandomName } from './namegen.js';

export function renderLeaderboard() {
  const container = document.getElementById('leaderboard');
  container.innerHTML = "<h2>Leaderboard</h2>";

  const scoreInput = document.createElement('input');
  scoreInput.placeholder = "Enter your score";
  scoreInput.type = "number";

  const submitBtn = document.createElement('button');
  submitBtn.innerText = "Submit Score";

  const list = document.createElement('ol');

  container.append(scoreInput, submitBtn, document.createElement('hr'), list);

  submitBtn.onclick = async () => {
    const username = localStorage.getItem('username') || generateRandomName();
    const avatar = localStorage.getItem('avatar') || "🙂";
    const score = parseInt(scoreInput.value);

    if (!score || isNaN(score)) {
      alert("Please enter a valid number for score.");
      return;
    }

    const { db, firebaseTools } = window;
    const { collection, addDoc } = firebaseTools;

    try {
      await addDoc(collection(db, "leaderboard"), {
        name: username,
        score,
        avatar,
        timestamp: Date.now()
      });
      alert(`Score submitted as "${username}"!`);
      scoreInput.value = "";
      loadLeaderboard();
    } catch (err) {
      console.error("Error submitting score:", err);
      alert("Failed to submit score. Try again later.");
    }
  };

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
