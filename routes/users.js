"use strict";

const express = require('express');
const router  = express.Router();
const bodyParser  = require("body-parser");
const iconScrape = require("../utils/iconScrape")

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
router.post("/login", (req,res)=>{
  knex("")
});


router.post("/cards", (req,res) => {
  console.log("MAKING CARD");
  console.log(req.body);

  iconScrape.scrapeStuff(req.body, req.session.user_id, (err, result) => {
      if (err) {
        console.log(err)
        return res.json({err: err}).status(500)
      }

      console.log("IconScraping done! Sending finishing response~~~");
      console.log(result)

      knex('cards')
      .select("url","title","notes")
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
      });


    })








  // knex("cards")
  //   .returning("id")
  //   .insert({
  //     url: req.body.url,
  //     title: req.body.categories,
  //     notes: req.body.notes,
  //     user_id: req.session.user_id
  //   })
  //   .then(function(card){
  //     req.session.card_id=card[0]
  //     console.log("Card Stored in DB")
  //   })
  //   .catch(function(error){
  //     console.log(error,"Card not stored in DB")
  //   })
  // console.log("session ", req.session)  //right now the issue is that req.session.user_id is undefined...
  // console.log("REQUEST BODY", req.body)
  //   iconScrape.scrapeStuff(req.body, req.session.user_id, (err, result) => {
  //     if (err) {
  //       console.log(err)
  //       return res.json({err: err}).status(500)
  //     }
  //     console.log("IconScraping done! Sending finishing response~~~");
  //
  //     knex
  //     .select("*")   //get card_id of card we just created for query
  //     .from("cards")
  //     .where("user_id", req.session.user_id)
  //     .then(function(data){
  //       console.log("Sent the response...!", data);
  //       res.send(data);
  //   })
  // });

    //TODO
    // scrapeStuff function takes req.body, creates card instance in database, is supposed use it to return responseObject to fill view; But is returning empty obj.

  // knex('categories')
  //   .insert({
  //     category_name: req.body.categories,
  //     card_id: null // knex('cards').select("id") //FOREIGN KEYS!
  // })
  // .then(function(response) {
  //   console.log("GREAT CATEGORY !!");
  // })
  // .catch(function(error){
  //   console.log(error,"CATEGORY, MOTHAFUCKAAAA")
  // })

  // knex('cards_categories')
  //   .insert({
  //     card_id: null, // knex('cards').select("id") //FOREIGN KEYS!
  //     category_id: null // knex('categories').select("id")
  // })
  // .then(function(response) {
  //   console.log("Established cards_categories join !!");
  // })
  // .catch(function(error){
  //   console.log(error,"Did not establish cards_categories join!!!")
  // })

  // knex('likes')
  //   .insert({
  //     cards_id: "Liked",
  //     user_id: "Liked"
  //   })
  //   .then(function(response) {
  //     console.log("You liked this card");
  //   })
  //   .catch(function(error) {
  //     console.log(error, "You didn't like the card")
  //   })

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
      password: req.body.password
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
return router
}
