"use strict";

require('dotenv').config();

const ENV = process.env.ENV || "development";
const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig[ENV]);

const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');
// const args = process.argv[2]

let htmlStuff;
let descriptionOrNote;
let titleOrUsersTitle;
let responseObject = {};

module.exports = {

  scrapeStuff: function(card, user_id, cb) {

    request(card["url"], (error, response, body) => {
      if (!error && response.statusCode == 200) {
        htmlStuff = body;
        let $ = cheerio.load(htmlStuff);
        /// We can query till our hearts content
        console.log("~~~~~~~~~~~~~~~");
        console.log("title:", $('title').text()); //.text() gets rid of the HTML tags
        console.log("icon:", $('link[rel="shortcut icon"]').attr('href'));
        console.log("description:", $('meta[name=description]').attr('content'));

        //grab the appropriate data & write the knex commands to insert it into the DB

        if (card["title"].trim() === "") {
          titleOrUsersTitle = $('title').text();
        } else {
          titleOrUsersTitle = card["title"];
        }

        if (card["notes"].trim() === "") {
          descriptionOrNote = $('meta[name=description]').attr('content');
        } else {
          descriptionOrNote = card["notes"];
        }

        responseObject["url"] = card["url"];
        responseObject["title"] = titleOrUsersTitle;
        responseObject["categories"] = card["categories"];
        responseObject["notes"] = descriptionOrNote;
        console.log("Category is",card["categories"])
        knex('cards')
        .returning("id")
        .insert({
          url: responseObject.url,
          title: titleOrUsersTitle,
          notes: descriptionOrNote,
          user_id: user_id
          // user_id: null,
          // picture: $('link[rel="shortcut icon"]').attr('href');
        })
        .then(function(response) {
          let card_id = response[0]
          console.log("Cheerio, ol' title chap!");
          cb(null, response)

              knex('categories')
              .returning("id")
              .insert({
                category_name: card["categories"],
                card_id : card_id
              })
              .then(function(catResponse) {
                console.log("catReponse",catResponse)
                knex("cards_categories")
                .insert({
                  card_id: card_id,
                  category_id: catResponse[0]
                })
                .then(function(card_catResponse){
                  console.log("cards_Cat Response made")
                })
                .catch(function(card_CatResponse) {
                  console.log("Cards_cat not good")
                })
                console.log("Added Category into cat table")
              })
              .catch(function(catResponse){
                console.log("You did not add Cateogry in the cat table")
              })
        })
        .catch(function(error) {
          console.log(error, "SCRAPE FAILED")
        })
      }
    })
    console.log("+++++++++++++++++++++", responseObject);
    return responseObject;
  }
}
