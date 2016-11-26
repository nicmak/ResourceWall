'use strict'

const request = require('request');
const fs = require('fs');

let url = process.argv[2];

request(url).pipe(fs.createWriteStream('../tmp/HTML.txt'));
//This will request the url typed into terminal,
//and insert the HTML text into tmp file
