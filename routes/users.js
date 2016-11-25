"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

//just a placeholder...
  router.get("/allCards", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });

  });

  router.get("/cards", (req,res) => {
    res.send("blah");
  });

  router.post("/cards", (req,res) => {
    console.log("data:", req.data);
    console.log("params:", req.params);
    console.log("body:", req.body);
    res.send(req.body);
    knex('cards')
      .insert({
        url: req.body.url,
        // categories: req.body.categories,
        title: req.body.title,
        notes: req.body.notes,
        user_id: null //foreign key!
    })
    .then(function(rows) {
      console.log("GREAT");
    })
    .catch(function(error){
      console.log(error,"It's not working")
    })

  });
    // var results = [
    //   {
    //     id: ,
    //     url: ,
    //     categories: [],
    //     title: ,
    //     notes:
    //   }
    // ]


  return router;
}
