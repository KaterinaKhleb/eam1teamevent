const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require("serve-static");
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const mongolink = process.env.MONGODB_URI || 'mongodb://localhost:27017/teamevent';

mongoose.connect(mongolink).then(
    () => { console.log('Database connection is successful') },
    err => { console.log('Error when connecting to the database' + err) }
);
mongoose.set('useFindAndModify', false);

const dayVote = require('./models/DayVote');


const app = express();

app.use(serveStatic(path.join(__dirname, 'dist')));

//Middleware
app.use(bodyParser.json());
app.use(cors());


app.post('/votes', (req, res) => {
    console.log(req.body)
    dayVote.find({ weekNumber: req.body.week }, (err, votes) => {
        if (err) {
            console.log(err);
        } else {
            res.json(votes);
        }
    });
});

app.post('/savevote', (req, res) => {
    let vote = req.body
    for (let i = 0; i < vote.days.length; i++) {
        let oneItem = new dayVote({ name: vote.name, weekNumber: vote.week, day: vote.days[i] })
        oneItem.save().then(note => {
                console.log(note)
            })
            .catch(err => {
                res.status(400).send("Error when saving to database");
            });
    }
});

app.post('/deletevote', (req, res) => {
    console.log(req.body)
    dayVote.deleteMany({ name: req.body.name }, (err, votes) => {
        if (err) res.json(err);
        else res.json({ 'message': 'Votes are successfully removed', 'votes': votes });
    });
});



app.use('/*', express.static(path.join(__dirname, 'dist/index.html')));



const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server on port ${port}`));