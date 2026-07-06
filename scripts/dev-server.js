import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const root = process.cwd();
const port = Number(process.env.PORT || 5173);
const types = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.md', 'text/markdown; charset=utf-8'],
]);

function resolvePath(url) {
  const pathname = new URL(url, `http://localhost:${port}`).pathname;
  const safePath = normalize(pathname).replace(/^\.\.(\/|\\|$)/, '');
  const candidate = join(root, safePath === '/' ? 'index.html' : safePath);
  return existsSync(candidate) && statSync(candidate).isFile() ? candidate : join(root, 'index.html');
}

createServer((request, response) => {
  const filePath = resolvePath(request.url || '/');
  response.setHeader('Content-Type', types.get(extname(filePath)) || 'application/octet-stream');
  createReadStream(filePath).pipe(response);
}).listen(port, '0.0.0.0', () => {
  console.log(`Dev server running at http://localhost:${port}`);
});
