"use strict";

require('dotenv').config();

const ENV         = process.env.ENV || "development";
const knexConfig  = require("../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');
const args = process.argv[2]

let htmlStuff;

request(args, (error, response, body) => {
  if (!error && response.statusCode == 200){
    console.log(body);
    htmlStuff = body;
    let $ = cheerio.load(htmlStuff);
    /// We can query till our hearts content
    console.log("~~~~~~~~~~~~~~~");
    console.log("title:", $('title').text()); //.text() gets rid of the HTML tags

    console.log("icon:", $('link[rel="shortcut icon"]').attr('href'));
    console.log("description:", $('meta[name=description]').attr('content'));

    //grab the appropriate data & write the knex commands to insert it into the DB


    knex('cards')
      .insert({
        url: null,
        title: $('title').text(),
        notes: null,
        user_id: null
      })
      .then(function(response) {
        console.log("Cheerio, ol' title chap!");
      })
      .catch(function(error){
        console.log(error,"SCRAPE FAILED, MOTHAFUCKAAAA")
      })
  }
})


//TODO: Once we have the data, we can write a simple query to insert the card's info into the database (probably using knex)


/* ~~~~~~~~~~~~~~~~~~

link[rel=icon] -> This means: Find me all of the Dom elements where the tag is `link` and the html attribute `rel` is equal to `icon`.

$('link[rel=ison]') -> This code targets an array with two elements:
[<link rel='icon'  href='jsdajdsajklasjklfds'>,
 <link rel='icon' href='asd2e1pfjosdiofnlsdk'>
]

.attr('href')

ul.french

Find me all of the DOM elements where the tag is `ul` and the class is french

<ul class="french">
</ul>

$('link[rel=icon]').attr('href') -> This code targets the value of the 'href' attribute for the dom elements where the tag is 'link' and the attribute 'rel' is "icon". The dollar sign refer to the cheerio.load part.



link[rel=shortcut icon]
??
link[rel=shortcut%20icon]

 ~~~~~~~~~~~~~~~~~~~~~~~~~ */
