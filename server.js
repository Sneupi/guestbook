/**
 * Server node for guestbook
 */
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

function get_entries() {
    let data = fs.readFileSync('db.json', 'utf8');
    return JSON.parse(data).entries;
}
function add_entry(name, message) {
    let data = fs.readFileSync('db.json', 'utf8');
    let entries = JSON.parse(data).entries;
    entries.push({ name: name, message: message });
    fs.writeFileSync('db.json', JSON.stringify({ entries: entries }, null, 2));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/entries', (req, res) => {    
    res.status(200).json(get_entries());
    console.log('Fetched entries');
});

app.post('/form-entry', (req, res) => {
    if (!req.body.name || !req.body.message) {
        console.log(`failed to add entry ${JSON.stringify(req.body)}`);
        return res.status(400);
    }
    add_entry(req.body.name, req.body.message);
    res.status(201).json(get_entries());
    console.log(`Added entry ${JSON.stringify(req.body)}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
