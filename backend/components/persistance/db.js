// database.js
const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database (or open it if it already exists)
const db = new sqlite3.Database('./db.sqlite', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS company_structure(id INTEGER PRIMARY KEY, name TEXT, parent INTEGER, level INTEGER)`);
            db.run(`CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT, user_type TEXT, scope INTEGER, office INTEGER, role INTEGER, active integer)`);
            db.run(`CREATE TABLE IF NOT EXISTS user_accounts(user_id INTEGER PRIMARY KEY, username TEXT, password TEXT, activation_code TEXT, activated INTEGER)`);
            db.run(`CREATE TABLE IF NOT EXISTS roles(id INTEGER PRIMARY KEY, name TEXT)`);
            db.run(`CREATE TABLE IF NOT EXISTS idea(id INTEGER PRIMARY KEY, title TEXT, description TEXT, status TEXT, vote_count INTEGER, rank INTEGER, scope INTEGER, voting_enabled INTEGER, created_by INTEGER)`);
            db.run(`CREATE TABLE IF NOT EXISTS project(id INTEGER PRIMARY KEY, name TEXT, description TEXT, status TEXT, created_by INTEGER, created_at INTEGER, idea INTEGER)`);
            db.run(`CREATE TABLE IF NOT EXISTS vote(id INTEGER PRIMARY KEY, idea_id INTEGER, voted_at INTEGER, voted_by INTEGER)`);
            db.run(`CREATE TABLE IF NOT EXISTS comments_idea(id INTEGER PRIMARY KEY, comment TEXT, commented_by INTEGER, commented_at INTEGER, ref_id INTEGER, replied_to INTEGER)`);
            db.run(`CREATE TABLE IF NOT EXISTS comments_project(id INTEGER PRIMARY KEY, comment TEXT, commented_by INTEGER, commented_at INTEGER, ref_id INTEGER, replied_to INTEGER)`);
        });
    }
});

// db.serialize(()=>{
//   db.run("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
// });

module.exports = db;