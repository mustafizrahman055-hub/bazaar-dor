const db = require('better-sqlite3')('sqlite.db'); 
const rows = db.prepare("SELECT sql FROM sqlite_master WHERE type='table'").all(); 
console.log(rows.map(r=>r.sql).join(';\\n'));
