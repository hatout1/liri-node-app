require('dotenv').config();

const keys = require("./keys.js")
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);
const moment = require("moment");
var timenow = moment();
const fs = require('fs');
const arg = process.argv;
const axios = require("axios");
const chalk = require('chalk');

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
        // console.log(chalk.blue(commandTwo));
        spotifyResult(commandTwo);
        fs.appendFile('History.txt', timenow.format("MM/DD/YYYY h:mm A") + "\n" + commandOne + ": " + commandTwo + ";\n" + "------------------------------------------------\n", function (err) {
            if (err) throw err;
        });

        break;
    case ("concert-this"):
        concertThisResult();
        fs.appendFile('History.txt', timenow.format("MM/DD/YYYY h:mm A") + "\n" + commandOne + ": " + commandTwo + ";\n" + "------------------------------------------------\n", function (err) {
            if (err) throw err;
        });
        break;
    case ("movie-this"):
        // console.log(commandTwo);
        movieThisResult();
        fs.appendFile('History.txt', timenow.format("MM/DD/YYYY h:mm A") + "\n" + commandOne + ": " + commandTwo + ";\n" + "------------------------------------------------\n", function (err) {
            if (err) throw err;
        });
        break;
    case ("do-what-it-says"):
        // console.log(commandTwo);
        doWhatItSaysResult();
        fs.appendFile('History.txt', timenow.format("MM/DD/YYYY h:mm A") + "\n" + commandOne + ": " + commandTwo + ";\n" + "------------------------------------------------\n", function (err) {
            if (err) throw err;
        });
        break;
    default:
        console.log("Sorry, somthing went wrong lest's try again!!")
        break;
}

// function for Spotify - `spotify-this-song`
function spotifyResult(commandTwo) {
    spotify
        .search({ type: 'track', query: commandTwo })
        .then(function (response) {
            console.log(chalk.blue(response.tracks.items[0].album.artists[0].name)); // Artist name
            console.log(chalk.blue(response.tracks.items[0].preview_url)); // Song url
            console.log(chalk.blue(response.tracks.items[0].name)); // song name
            console.log(chalk.blue(response.tracks.items[0].album.name)); // Album name
        })
        .catch(function (err) {
            console.log(err);
        });
}

// function for Concert - `concert-this`
function concertThisResult() {

    axios.get("https://rest.bandsintown.com/artists/" + commandTwo + "/events?app_id=codingbootcamp")
        .then(res => {

            var datetime = moment(res.data[0].datetime);

            var DateOfEvent = datetime.format("MM-DD-YYYY");
            console.log(chalk.yellow(res.data[0].venue.name));
            console.log(chalk.yellow(res.data[0].venue.city));
            console.log(chalk.yellow(DateOfEvent));
        })
        .catch(function (error) {
            console.log(error);
        });
}
// function for Movies - `movie-this`
function movieThisResult(movie) {

    axios.get("http://www.omdbapi.com/?t=" + commandTwo + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(
        function (response) {
            //console.log(response.data);
            if (response.data.Title != undefined) {
                console.log(chalk.cyan("Title: " + response.data.Title)); // Title of the movie.
                console.log(chalk.cyan("Year: " + response.data.Year)); // Year the movie came out.
                console.log(chalk.cyan("imdbRating:: " + response.data.imdbRating)); // IMDB Rating of the movie.
                console.log(chalk.cyan("RottenTomatoes: " + response.data.tomatoRating));// Rotten Tomatoes Rating of the movie.
                console.log(chalk.cyan("Country:: " + response.data.Country));  // Country where the movie was produced.
                console.log(chalk.cyan("Language:: " + response.data.Language)); // Language of the movie.
                console.log(chalk.cyan("Plot: " + response.data.Plot)); // Plot of the movie.
                console.log(chalk.cyan("Actors: " + response.data.Actors)); // Actors in the movie.
            }
            else {
                console.log(chalk.green("If you haven't watched  'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/"));
                console.log(chalk.red("It's on Netflix!"));
            }
        }
        // if response is empty call the api again with the "default" movie 
    ).catch(function (error) {
        console.log(error);
    });
}

// function for elseDo - `do-what-it-says`
function doWhatItSaysResult() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        var dataArr = data.split(",");
        spotifyResult(dataArr[1])
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
    });

}