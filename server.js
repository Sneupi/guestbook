/**
 * Server node for guestbook
 */
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {    
    res.status(200).json({message: 'Hello World!'});
    console.log('Hello World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
