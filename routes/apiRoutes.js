const fs = require('fs');
const path = require('path');
const genID = require('generate-unique-id');

require('./htmlRoutes');

module.exports = app => {
// create notes var
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
     
        let notes = JSON.parse(data);

        // API routes

        // get route for /api/notes
        app.get('/api/notes', function (req, res) {
            res.json(notes);
        })
        // /api/notes post route
        app.post('/api/notes', function (req, res) {
        })
    })
}