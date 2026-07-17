// Clean helper: remove node_modules and package-lock
import { existsSync, readdirSync, lstatSync, unlinkSync, rmdirSync } from 'fs';
import { join } from 'path';

function rmDir(dir) {
  if (!existsSync(dir)) return;
  readdirSync(dir).forEach(f => {
    const p = join(dir, f);
    if (lstatSync(p).isDirectory()) rmDir(p);
    else unlinkSync(p);
  });
  rmdirSync(dir);
}

const dirs = ['infographic-generator/node_modules'];
const files = ['infographic-generator/package-lock.json'];

dirs.forEach(d => rmDir(d));
files.forEach(f => { if (existsSync(f)) unlinkSync(f); });
console.log('Cleaned.');
