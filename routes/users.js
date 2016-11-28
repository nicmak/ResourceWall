"use strict";

const express = require('express');
const router  = express.Router();
const bodyParser  = require("body-parser");
const iconScrape = require("../utils/iconScrape")
const bcrypt = require('bcrypt');

module.exports = (knex) => {

router.get("/allCards", (req, res) => {
  knex
    .select("*")
    .from("users")
    .then((results) => {
      res.json(results);
    });
});

router.post("/registration", (req, res) => {
  console.log("registration body", req.body);
  // res.send(req.body);
  // req.bod
  knex("users")
    .returning('id')
    .insert({
      first_name: req.body.firstName,
      last_name:  req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password,10)
    })
    .then(function(user) {
      req.session.user_id = user[0];
      console.log("req is here", req.session.user_id);
      console.log("GREAT Registration!!");
      console.log("Great cookie key assigned");
      res.redirect('/user')
    })
    .catch(function(error){
      console.log(error,"REGISTER, MOTHAFUCKAAAA")
    })
 });

router.post("/logout", (req,res) => {
  req.session = null
  res.redirect = "/user"
  console.log("you logged out");
})

router.post("/login", (req,res)=>{
    console.log("email is",req.body.email)
    console.log("Password is",req.body.password)
    knex("users")
    .select("email","password")
    .then(function(info){ //array
      info.forEach(function(entry) {
        if (entry.email === req.body.email && bcrypt.compareSync(req.body.password,entry.password)) {
          console.log("Matching USER");
          res.redirect("/user")
        }
        else {
          console.log("User not found");
        }
      })
    })
    .catch(function(info){
      console.log("Logging in not working")
    })
});

router.post("/like", (req,res) => {
  console.log("Liking Card");
  knex('likes')
    .insert({
      card_id: req.session.card_id,
      user_id: req.session.user_id
    })
    .then(function(response) {
      console.log("You liked this card");
    })
    .catch(function(error) {
      console.log(error, "You didn't like the card")
    })

});

router.post("/cards", (req,res) => {
  console.log("MAKING CARD");
  console.log("REQUEST BODY", req.body)

    iconScrape.scrapeStuff(req.body, req.session.user_id, (err, result) => {
  console.log(req.body);
  iconScrape.scrapeStuff(req.body, req.session.user_id, (err, result) => {
      if (err) {
        console.log(err)
        return res.json({err: err}).status(500)
      }
      console.log("IconScraping done! Sending finishing response~~~");
      console.log(result)

      knex('cards')
      .select("url","title","notes")   //get card_id of card we just created for query
      .where({id: result[0]})
      .then(function(card){
        console.log(card);

      let newCard = {
        url:card[0].url,
        title:card[0].title,
        notes:card[0].notes,
        categories:null
      }
      res.json(newCard)
      })
  });
      req.session.card_id = result[0]
      knex('cards')
      // .returning("id")
      .select("url","title","notes")
      .where({id: result[0]})
      .then(function(card) {
        knex('categories')
        .select("category_name")
        .where({card_id:result[0]})
        .then(function(category) {
        console.log("Cateogry",category)
          let newCard = {
            url:card[0].url,
            title:card[0].title,
            notes:card[0].notes,
            categories: category[0].category_name
          }
          res.json(newCard)


          })
      });
  })







  // knex('ratings')
  //   .insert({
  //     user_id: null,
  //     card_id: null,
  //     rating: null
  //   })
  //   .then(function(response){
  //     console.log("You rated the card")
  //   })
  //   .catch(function(error) {
  //     console.log(error,"you didnt rate the card")
  //   })

  // knex('comments')
  //   .insert ({
  //     user_id: null,
  //     timestamp: null,
  //     content: null,
  //     card_id: null,
  //   })
  //   .then(function(response) {
  //     console.log("You commented a card")
  //   })
  //   .catch(function(error) {
  //     console.log(error, "You did not comment a card")
  //   })

  //CAN I INCLUDE ANOTHER KNEX STATEMENT UNDERNEATH THAT WOULD RUN STIL;

})


return router
}
