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
      console.log("GREAT SUCCESS!!");
    })
    .catch(function(error){
      console.log(error,"CATCH, MOTHAFUCKAAAA")
    })
  });

  return router;
}
