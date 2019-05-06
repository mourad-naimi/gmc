const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const assert = require('assert');
const MongoUrl = "mongodb://localhost:27017";
const dataBase = "article";
const router  = express.Router();

MongoClient.connect(
    MongoUrl,
    { useNewUrlParser: true },
    (err, client) => {
        assert.equal(err, null, "dataBase connection failed");

        const db = client.db(dataBase);

    // GERER LES ARTICLES

        router.post("/", (req, res) =>{
            let newArticle = req.body;
            db.collection("article").insertOne(newArticle, (err, data) => {
                if (err) res.send("can't add article");
                else res.send(data);
            })
        });

        router.delete("/:id", (req, res) => {
            let ArticleToDelete = ObjectID(req.params.id)

            db.collection("article").findOneAndDelete({_id : ArticleToDelete}, (err, data) => {
                if (err) res.send("can't delete the article");
                else res.send("the article was deleted");
            })
        });

        router.put("/:id", (req, res) => {
            let id = ObjectID(req.params.id)
            let ArticleModification = req.body
            db.collection("article").findOneAndUpdate({_id : id}, 
                {$set:{...ArticleModification}},
                 (err, data) => {
                if (err) res.send("can't modify the article");
                else res.send("the article was modified");
            })
        });

        router.get("/", (req, res) => {
            db.collection("article").find().toArray((err, data) => {
                if (err) res.send("can't find");
                else res.send(data);
            })
        });
    } 
);

module.exports = router