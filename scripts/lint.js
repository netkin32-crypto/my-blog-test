import { readFile } from 'node:fs/promises';

const files = ['index.html', 'src/main.js', 'src/posts.js', 'src/styles.css'];
const failures = [];

for (const file of files) {
  const contents = await readFile(file, 'utf8');
  if (/\t/.test(contents)) {
    failures.push(`${file}: contains tab indentation`);
  }
  if (/ +$/m.test(contents)) {
    failures.push(`${file}: contains trailing whitespace`);
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Linted ${files.length} files.`);
