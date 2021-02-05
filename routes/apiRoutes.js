// Required items
const fs = require('fs');
const path = require('path');
const genID = require('generate-unique-id');

require('./htmlRoutes');

module.exports = app => {

    // Will be used to write to the DB
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;

        let notesArray = JSON.parse(data);

        // Used to get the route for our api
        app.get('/api/notes', (req, res) => {
            res.json(notesArray);
        })

        // Used to create new note and push it to the DB
        app.post('/api/notes', (req, res) => {
            const addNoteArray = {
                id: genID({
                    length: 5,
                    useLetters: false
                }),
                title: req.body.title,
                text: req.body.text
            }
            notesArray.push(addNoteArray);
            updateNoteDB(notesArray);
            res.json(notesArray);
            console.log(`A note has been added to the array titled: ${addNoteArray.title}`);
        })

        // Used to get note by ID
        app.get('/api/notes/:id', (req, res) => {
            res.json(notesArray[req.params.id]);
        })

        // Used to delete notes (broken, and im not sure why)
        app.delete('/api/notes/:id', (req, res) => {
            console.log(req.params.id);
            notesArray.splice(req.params.id, 1);
            updateNoteDB(notesArray);
            res.json(notesArray);
            console.log(`A note with an id of ${req.params.id} has been deleted`);
        })
    });

    const updateNoteDB = (notesArray) => {
        fs.writeFile('db/db.json', JSON.stringify(notesArray, '\t'), err => {
            if (err) throw err;
            return true;
        });
    };
}