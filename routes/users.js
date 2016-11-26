"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

router.get("/allCards", (req, res) => {
  knex
    .select("*")
    .from("users")
    .then((results) => {
      res.json(results);
    });
});

//This will accept post requests that are /api/users + /cards
//And then will execute the following code...
router.post("/cards", (req,res) => {
  console.log("body:", req.body);
  res.send(req.body);
  knex('cards')
    .insert({
      url: req.body.url,
      title: req.body.title,
      notes: req.body.notes,
      user_id: null //foreign key!
  })
  .then(function(response) {
    console.log("GREAT Card!!");
  })
  .catch(function(error){
    console.log(error,"CARD, MOTHAFUCKAAAA")
  })
  knex('categories')
    .insert({
      category_name: req.body.categories,
      card_id: null
  })
  .then(function(response) {
    console.log("GREAT CATEGORY !!");
  })
  .catch(function(error){
    console.log(error,"CATEGORY, MOTHAFUCKAAAA")
  })
  //CAN I INCLUDE ANOTHER KNEX STATEMENT UNDERNEATH THAT WOULD RUN STIL;
})

router.post("/registration", (req, res) => {
  console.log("registration body", req.body);
  res.send(req.body);
  knex("users")
    .insert({
      first_name: req.body.firstName,
      last_name:  req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
    .then(function(rows) {
      console.log("GREAT Registration!!");
    })
    .catch(function(error){
      console.log(error,"REGISTER, MOTHAFUCKAAAA")
    })
});
return router
}
