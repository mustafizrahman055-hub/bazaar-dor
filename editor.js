const fs = require('fs');
const file = process.argv[2];
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/^pick 52e3958.*$/m, 'drop 52e3958');
fs.writeFileSync(file, content);
