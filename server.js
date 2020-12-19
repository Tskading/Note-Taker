const { notStrictEqual } = require("assert");
const express = require("express");
const fs = require("fs");
const path = require("path");
const database = require("./db/db.json")


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

        let dbParse = JSON.parse(data);

        res.json(dbParse);

        

    });

    // THEN parse the file contents with JSON.parse() to get the real data

    // res.JSON() - send the parsed data back 

    // Should be able to load the client side and see test note in db.json
});

app.post("/api/notes", function(req, res) {

    // access the POSTed data in req.body
    let userNotes = req.body;

    // use fs module to read the file
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw (err);

        console.log(JSON.parse(data));

        let dbParse = JSON.parse(data);

        dbParse.push(req.body);

        let newNote = JSON.stringify(dbParse);
        
        fs.writeFile("./db/db.json", newNote, (err) => {
            if (err)  throw err;
            else {
                console.log("Created new note ;)");
                res.json(newNote);
            }
        })      


    });


    // THEN parse the file contents with JSON.parse() to get the real data

    // push the req.body to the array list

    // JSON.stringigy() the array list back into a JSON string

    // THEN save the contents back to the db.json file with the fs module.

});

app.delete("/api/notes/:id", function(req, res) {

    // access :id from req.params.id

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