const { notStrictEqual } = require("assert");
const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db.json");
const { v4: uuidv4 } = require("uuid");
uuidv4();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get("/api/notes", function(req, res) {
    
    // use fs module to read the file
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw (err);

        // console.log(JSON.parse(data));

        // THEN parse the file contents with JSON.parse()
        let dbParse = JSON.parse(data);
        // res.JSON() - send the parsed data back 
        res.json(dbParse);
    });

});

app.post("/api/notes", function(req, res) {

    // access the POSTed data in req.body
    let userNotes = req.body;

    let uniqueid = uuidv4();
    userNotes["id"] = uniqueid;

    // use fs module to read the file
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw (err);
        // THEN parse the file contents with JSON.parse() to get the real data
        console.log(JSON.parse(data));
        
        let dbParse = JSON.parse(data);
        // push the req.body to the array list
        dbParse.push(req.body);

        let newNote = JSON.stringify(dbParse);
        // JSON.stringigy() the array list back into a JSON string
        fs.writeFile("./db/db.json", newNote, (err) => {
            if (err)  throw err;
            else {
                console.log("Created new note!");
                res.json(newNote);
            }
        })      


    });

});


app.delete("/api/notes/:id", (req, res) => {

    // access :id from req.params.id
    const uniqueid = req.params.id
    let notes = [];

    // use fs module to read the file


  

    // THEN parse the file contents with JSON.parse() to the real data

    // OPTION A
        // Find the matching index using .findIndex()
        // remove target element using .splice()

    // OPTION B
        // use the Array.filter() to filter out matching element - something about using let instead of const...
        // myArray = myArray.filter( element => element.id !== req.params.id)

    // return any type of success message. 
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));

});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.listen(PORT, function() {
console.log("App listening on PORT " + PORT);
});