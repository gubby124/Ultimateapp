export function generateRandomName() {
  const adjectives = ["Cool", "Fast", "Electric", "Happy", "Spicy", "Brave"];
  const animals = ["Tiger", "Penguin", "Wolf", "Otter", "Shark", "Falcon"];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${animals[Math.floor(Math.random() * animals.length)]}${Math.floor(Math.random() * 100)}`;
}
