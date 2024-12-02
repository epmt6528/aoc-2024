import fs from 'fs';

export const readInput = (path) => {
  return fs.readFileSync(path, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    return data
  })
}