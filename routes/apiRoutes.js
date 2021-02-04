const fs = require('fs');
const path = require('path');
const genID = require('generate-unique-id');

require('./htmlRoutes');

module.exports = app => {

    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;

        let notesArray = JSON.parse(data);

        app.get('/api/notes', (req, res) => {
            res.json(notesArray);
        });

        app.post('/api/notes', (req, res) => {
            const addNoteArray = {
                title: req.body.title,
                text: req.body.text,
                id: genID({
                    length: 10,
                    useLetters: false
                })
            }
            notesArray.push(addNoteArray);
            res.json(notesArray);
            updateNoteDB(notesArray);
            console.log(`A note has been added to the array titled: ${addNoteArray.title}`);
        });

        app.get('/api/notes/:id', (req, res) => {
            res.json(notesArray[req.params.id]);
        });

        app.delete('/api/notes/:id', (req, res) => {
            notesArray.splice(req.params.id, 1);
            updateNoteDB(notesArray);
            res.json(notesArray);
            console.log(`A note with an id of ${req.params.id} has been deleted`);
        });
    });

    const updateNoteDB = (notesArray) => {
        fs.writeFile('db/db.json', JSON.stringify(notesArray, '\t'), err => {
            if (err) throw err;
            return true;
        });
    };
}