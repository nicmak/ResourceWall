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

    // var results = [
    //   {
    //     id: ,
    //     url: ,
    //     categories: [],
    //     title: ,
    //     notes:
    //   }
    // ]

  });

  return router;
}
