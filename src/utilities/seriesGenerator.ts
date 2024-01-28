export function seriesGenerator(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let id = '';

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    id += letters.charAt(randomIndex);
  }

  return id;
}
