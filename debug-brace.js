const fs = require('fs');
const s = fs.readFileSync('public/js/app.js', 'utf8');
const stack = [];
let state = 'code';
let quote = null;
let escape = false;
for (let i = 0; i < s.length; i++) {
  const ch = s[i];
  const next = s[i + 1];
  if (state === 'code') {
    if (ch === '/' && next === '/') { state = 'lineComment'; i++; continue; }
    if (ch === '/' && next === '*') { state = 'blockComment'; i++; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { state = 'string'; quote = ch; continue; }
    if (ch === '{' || ch === '(' || ch === '[') { stack.push({ ch, i }); continue; }
    if (ch === '}' || ch === ')' || ch === ']') {
      const last = stack.pop();
      if (!last) {
        console.log('Unexpected closing', ch, 'at', i);
        process.exit(1);
      }
      if ((last.ch === '{' && ch !== '}') || (last.ch === '(' && ch !== ')') || (last.ch === '[' && ch !== ']')) {
        console.log('Mismatch', last, 'closed by', ch, 'at', i);
        process.exit(1);
      }
    }
  } else if (state === 'string') {
    if (escape) { escape = false; continue; }
    if (ch === '\\') { escape = true; continue; }
    if (ch === quote) { state = 'code'; quote = null; }
  } else if (state === 'lineComment') {
    if (ch === '\n') state = 'code';
  } else if (state === 'blockComment') {
    if (ch === '*' && next === '/') { state = 'code'; i++; }
  }
}
console.log('Open stack size', stack.length);
console.log(JSON.stringify(stack.slice(-20), null, 2));
console.log('---A---');
console.log(s.slice(17980, 18040));
console.log('---B---');
console.log(s.slice(76960, 77020));
