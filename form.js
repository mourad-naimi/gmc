const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');
const MongoUrl = "mongodb://localhost:27017";
const dataBase = "Persons";
const router  = express.Router();

MongoClient.connect(
    MongoUrl,
    { useNewUrlParser: true },
    (err, client) => {
        assert.equal(err, null, "dataBase connection failed");

        const db = client.db(dataBase);

    // GERER LES PERSONNES

        router.post("/", (req, res) =>{
            let newPerson = req.body;
            db.collection("persons").insertOne(newPerson, (err, data) => {
                if (err) res.send("can't add the person");
                else res.send(data);
            })
        });

        router.delete("//:id", (req, res) => {
            let personToDelete = ObjectID(req.params.id)

            db.collection("persons").findOneAndDelete({_id : personToDelete}, (err, data) => {
                if (err) res.send("can't delete the person");
                else res.send("the person was deleted");
            })
        });

        router.put("//:id", (req, res) => {
            let id = ObjectID(req.params.id)
            let personModification = req.body
            db.collection("persons").findOneAndUpdate({_id : id}, 
                {$set:{...personModification}},
                 (err, data) => {
                if (err) res.send("can't modify the person");
                else res.send("the person was modified");
            })
        });

        router.get("/persons", (req, res) => {
            db.collection("persons").find().toArray((err, data) => {
                if (err) res.send("can't find");
                else res.send(data);
            })
        });
    } 
);

module.exports = router