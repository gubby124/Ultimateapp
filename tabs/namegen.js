export function generateRandomName() {
  const adjectives = ["Cool", "Fast", "Electric", "Happy", "Spicy", "Brave"];
  const animals = ["Tiger", "Penguin", "Wolf", "Otter", "Shark", "Falcon"];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const number = Math.floor(Math.random() * 100);
  return `${adj}${animal}${number}`;
}
