'use strict'

const request = require('request');
const fs = require('fs');
const args = process.argv[2]
const webPage = ;

request({
  url: args
}).pipe(fs.createWriteStream(`../tmp/${webPage}.html`));
//This will request the url typed into terminal,
//and insert the HTML text into tmp file
