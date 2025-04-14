export function renderQuotes() {
  const container = document.getElementById('quote');
  const quotes = [
    "Stay hungry. Stay foolish.",
    "Be yourself; everyone else is taken.",
    "You miss 100% of the shots you don’t take.",
    "Success is a journey, not a destination."
  ];
  const quote = document.createElement('p');
  const btn = document.createElement('button');
  btn.innerText = "New Quote";
  btn.onclick = () => {
    quote.innerText = quotes[Math.floor(Math.random() * quotes.length)];
  };
  btn.onclick();
  container.innerHTML = "<h2>Quotes</h2>";
  container.append(quote, btn);
}
