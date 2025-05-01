"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Server node for guestbook
 */
var node_sqlite_1 = require("node:sqlite");
var express = require('express');
var app = express();
var conn = new node_sqlite_1.DatabaseSync('db.sqlite', { open: true });
conn.exec("CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, message TEXT);");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
function get_entries() {
    var result = conn.prepare("SELECT * FROM entries ORDER BY id ASC;").all();
    return result.map(function (row) {
        return { name: row.name, message: row.message };
    });
}
function add_entry(name, message) {
    conn.prepare("INSERT INTO entries (name, message) VALUES (?, ?);").run(name, message);
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/entries', function (req, res) {
    res.status(200).json(get_entries());
    console.log('Fetched entries');
});
app.post('/form-entry', function (req, res) {
    if (!req.body.name || !req.body.message) {
        console.log("failed to add entry ".concat(JSON.stringify(req.body)));
        return res.status(400);
    }
    add_entry(req.body.name, req.body.message);
    res.status(201).json(get_entries());
    console.log("Added entry ".concat(JSON.stringify(req.body)));
});
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
