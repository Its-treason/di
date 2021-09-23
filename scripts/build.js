const { execSync } = require('child_process');
const { rmSync } = require('fs');

console.log('> Building @its-treason/di...');

rmSync('dist', { force: true, recursive: true });
execSync('node node_modules/typescript/bin/tsc -p "tsconfig.json"');

console.log('> Building @its-treason/di Succeeded!');
