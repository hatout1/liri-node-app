require('dotenv').config();
var keys = require("./keys.js")
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var moment = require("moment");
moment().format();

var fs = require('fs');