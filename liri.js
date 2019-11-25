require('dotenv').config();

const keys = require("./keys.js")
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const moment = require("moment");
moment().format("MM/DD/YYYY");
const fs = require('fs');
const arg = process.argv;
const axios = require("axios")

// console.log(moment)

var inquirer = require("inquirer");

// Switch function to display mainMenu with choices
// const mainMenu = () => {
//     inquirer
//         .prompt({
//             type: "list",
//             message: "How can I help you today?",
//             choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
//             name: "choice"
//         }).then(res => {
//             console.log(res.command)
//         })
// }

// mainMenu()


let commandTwo = "";
for (let i = 3; i < arg.length; i++) {
    if (i != arg.length - 1) {
        commandTwo += arg[i] + "-";
    } else {
        commandTwo += arg[i];
    }
}
let commandOne = arg[2]

switch (commandOne) {
    case ("spotify-this-song"):
        console.log(commandTwo);
        spotifyResult();
        break;
    case ("concert-this"):
        // console.log(commandTwo);
        concertThisResult();
        break;
    case ("movie-this"):
        console.log(commandTwo);
        movieThisResult();
        break;
    case ("do-what-it-says"):
        console.log(commandTwo);
        doWhatItSaysResult();
        break;

    default:
        console.log("Go homme")
        break;
}



// function for Spotify - `spotify-this-song`

function spotifyResult() {
    spotify
        .search({ type: 'track', query: commandTwo })
        .then(function (response) {
            console.log(response.tracks.items[0].album.artists[0].name); // Artist name
            console.log(response.tracks.items[0].preview_url); // Song url
            console.log(response.tracks.items[0].name); // song name
            console.log(response.tracks.items[0].album.name); // Album name
        })
        .catch(function (err) {
            console.log(err);
        });
}


// function for Concert - `concert-this`

function concertThisResult() {

    axios.get("https://rest.bandsintown.com/artists/" + commandTwo + "/events?app_id=codingbootcamp")
        .then(res => {

            var datetime = res.data[0].datetime;
            var dateArr = datetime.split('T');
            var Date = moment(dateArr[0], "MM-DD-YYYY");
            console.log(res.data[0].venue.name);
            console.log(res.data[0].venue.city);
            console.log(Date)
        })
        .catch(function (error) {
            console.log(error);
        });


    // console.log(url)

}

// function for Movies - `movie-this`
function movieThisResult() {


}


// function for elseDo - `do-what-it-says`

function doWhatItSaysResult() {


}