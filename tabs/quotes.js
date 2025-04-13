export function renderQuotes() {
  const container = document.getElementById('quote');
  const quotes = [
    "Stay hungry. Stay foolish.",
    "Be yourself; everyone else is taken.",
    "You miss 100% of the shots you don’t take.",
    "Success is a journey, not a destination."
  ];
  const p = document.createElement('p');
  const btn = document.createElement('button');
  p.innerText = quotes[0];
  btn.innerText = "New Quote";
  btn.onclick = () => {
    p.innerText = quotes[Math.floor(Math.random() * quotes.length)];
  };
  container.append(p, btn);
}
