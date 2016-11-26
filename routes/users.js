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

//This will accept post requests that are /api/users + /cards
//And then will execute the following code...
  router.post("/cards", (req,res) => {
    console.log("data:", req.data);
    console.log("params:", req.params);
    console.log("body:", req.body); //This console.log would be on your terminal
    res.send(req.body);
    knex
     ('cards')
     .insert({
       url: req.body.url,
       title:"Title",
       notes:"Notes",
       user_id:1})
       

  });
  return router;
}
