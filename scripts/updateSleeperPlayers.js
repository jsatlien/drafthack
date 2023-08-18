const mongoose = require("mongoose");
const db = require("../models");
const axios = require('axios');
const fs = require("fs");

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/drafthack"
);

// axios.get('https://api.sleeper.app/v1/players/nfl')
// .then(res => {
//     fs.writeFile('../logs/sleeperResponse.json', JSON.stringify(res), err => console.log(err));
// })
// .catch(err => console.log(err));


fs.readFile('./logs/sleeperResponse.json', (err, data) => {
    if (err) throw err;

    const players = JSON.parse(data);
    const dbPlayerArray = [];
    let player;
    for (const playerId in players) {
        player = players[playerId];
        dbPlayerArray.push({
            firstName: player.first_name,
            lastName: player.last_name,
            searchName: player.search_full_name,
            position: player.position,
            team: player.team,
            age: player.age,
            espn_id: player.espn_id,
            sleeper_id: player.player_id,
            yahoo_id: player.yahoo_id
        });
    }
    if (dbPlayerArray.length > 0) {
        db.Player
            .remove({})
            .then(() => {
                db.Player.collection.insertMany(dbPlayerArray)
                    .then(data => {
                        console.log(data.result.n + " records inserted!");
                        process.exit(0);
                    })
                    .catch(err => {
                        console.error(err);
                        process.exit(1);
                    });
            });
    }
});


