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

  // router.post("/cards", (req,res) => {
  //   console.log("body:", req.body);
  //   res.send(req.body);
  //   knex('cards')
  //     .insert({
  //       url: req.body.url,
  //       // categories: req.body.categories,
  //       title: req.body.title,
  //       notes: req.body.notes,
  //       user_id: null //foreign key!
  //   })
  //   .then(function(rows) {
  //     console.log("GREAT SUCCESS!!");
  //   })
  //   .catch(function(error){
  //     console.log(error,"CATCH, MOTHAFUCKAAAA")
  //   })
  // });

  // router.post("/registration", (req, res) => {
  //   // res.redirect("/user");
  //   res.send(req.body);
  //   knex("users")
  //     .insert({
  //       first_name: req.body.firstName,
  //       last_name:  req.body.lastName,
  //       email: req.body.email,
  //       password: req.body.password
  //     })
  //     .then(function(rows) {
  //       console.log("GREAT SUCCESS!!");
  //     })
  //     .catch(function(error){
  //       console.log(error,"CATCH, MOTHAFUCKAAAA")
  //     })
  // });

  router.post("/categories", (req,res) => {
    console.log("body:", req.body);
    res.send(req.body);
    knex('categories')
      .insert({
        category_name: req.body.category_name,
        card_id: null //foreign key!
    })
    .then(function(rows) {
      console.log("GREAT CATEGORY !!");
    })
    .catch(function(error){
      console.log(error,"CATCH, MOTHAFUCKAAAA")
    })
  });
  return router;
}
