const router = require('express').Router();
const fs = require('fs');
const csv = require('csv-parser'); 
const multer = require('multer');
const upload = multer({ dest: '../uploads/' });
const db = require('../../models');

require("dotenv").config();

router.post("/rankings",  upload.single('rankingFile'), async (req, res) => {
    const name = req.query.name;
    const type = req.query.type;
    const userId = process.env.TEST_USER_ID;
    try {
        const results = [];
        const playerList = [];
        fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            console.log(results);
            for (let i in results) {
                let player = results[i];
                //TODO: this is gross, fix CSV import or use different library
                let nameProp = Object.keys(player)[0];
               // console.log(player);
               // console.log(player[nameProp]);
                // console.log(player['Name']);
                try {
                    //ignore titles like 'Sr.', 'Jr.', and 'II' 'III' etc
                    let trimTitles = player[nameProp]
                    .replace(' III', '')
                    .replace(' II', '')
                    .replace(' Sr.', '')
                    .replace(' Jr.', '');

                    let lastChars = `${trimTitles[trimTitles.length - 2]}${trimTitles[trimTitles.length - 1]}`;
                    if (lastChars === ' V' || lastChars === ' I'  ) {
                        let charArray = trimTitles.split('');
                        charArray.pop();
                        trimTitles = charArray.join('');
                    }

                    let searchName = trimTitles.replace(/\W/ig, "").toLowerCase();
                    console.log(searchName);
                    const constraints = {searchName};
                    if (player.Position) {
                        constraints.position = player.Position
                    } 
                    let dbPlayer = await db.Player.findOne(constraints);
                    if (!dbPlayer && player.Team && player.Position) {
                       // console.log('player not FOUND')
                        //try searching by last name/team/position
                        let nameArr = trimTitles.split(' ');
                        nameArr.shift();
                        let lastName = nameArr.join(' ').trim();
                       // console.log('lastName', lastName)
                        dbPlayer = await db.Player.findOne({
                            lastName,
                            team: player.Team,
                            position: player.Position
                        });
                    }
                    //console.log(dbPlayer);      
                    if (player && dbPlayer) {
                        playerList.push({
                            rank: player.Rank,
                            player: dbPlayer._id, 
                            notes: player.Notes
                            
                        })
                    }
                } catch (e) {
                    console.log("error: ");
                    console.log(e);
                }
            }
          //  console.log(playerList);
            const newRankings = {
                user: userId,
                name,
                listType: type,
                players: playerList
            }
            console.log(userId)
            let dbList = await db.Rankings.create(newRankings);

            res.json({
                success: true,
                message: 'Upload Succesful!',
                data: dbList
            });
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message || 'upload failed',
            error: e
        });
    }
  });

  router.post("/tiers",  upload.single('rankingFile'), async (req, res) => {
    const name = req.query.name;
    const userId = process.env.TEST_USER_ID;
    const isFlex = req.query.flex;
    try {
        const results = [];
        const playerList = [];
        fs.createReadStream(req.file.path)
        .pipe(csv()) 
        .on('data', (data) => results.push(data))
        .on('end', async () => {
           // console.log(results);
           const notFound = [];
            for (let i in results) {
                let player = results[i];
                //TODO: this is gross, fix CSV import or use different library
                let nameProp = Object.keys(player)[0];
                // console.log(player);
                // console.log(player[nameProp]);
                // console.log(player['Name']);
                try {
                    //ignore titles like 'Sr.', 'Jr.', and 'II' 'III' etc
                    let trimTitles = player[nameProp]
                    .replace(' III', '')
                    .replace(' II', '')
                    .replace(' Sr.', '')
                    .replace(' Jr.', '');
                    let lastChars = `${trimTitles[trimTitles.length - 2]}${trimTitles[trimTitles.length - 1]}`;
                    if (lastChars === ' V' || lastChars === ' I'  ) {
                        let charArray = trimTitles.split('');
                        charArray.pop();
                        trimTitles = charArray.join('');
                    }

                    let searchName = trimTitles.replace(/\W/ig, "").toLowerCase();
                    // console.log(searchName);
                    const constraints = {searchName};
                    if (player.Position) {
                        constraints.position = player.Position
                    } 
                    let dbPlayer = await db.Player.findOne(constraints);
                    if (!dbPlayer && player.Team && player.Position) {
                        //try searching by last name/team/position
                        let nameArr = trimTitles.split(' ');
                        nameArr.shift();
                        let lastName = nameArr.join(' ').trim();
                        dbPlayer = await db.Player.findOne({
                            lastName,
                            team: player.Team,
                            position: player.Position
                        });
                    }   
                    if (player && dbPlayer) {
                        console.log(searchName);
                        playerList.push({
                            tier: parseInt(player.Tier),
                            position: isFlex ? 'FLEX' : player.Position,
                            bye: player.Bye,
                            rank: parseInt(player.Rank),
                            adp: player.ADP,
                            risk: parseFloat(player.Risk),
                            notes: player.Notes,
                            player: dbPlayer._id, 
                        });
                    }
                    else {
                        notFound.push(searchName);
                    }
                } catch (e) {
                    console.log("error: ");
                    console.log(e);
                }
            }
          //  console.log(playerList);
            console.log('\nNot found:',notFound);
            const newList = {
                user: userId,
                name,
                list: playerList
            }
            let dbList = await db.TierList.create(newList);

            res.json({
                success: true,
                message: 'Upload Succesful!',
                data: dbList
            });
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message || 'upload failed',
            error: e
        });
    }
  });

  module.exports = router;