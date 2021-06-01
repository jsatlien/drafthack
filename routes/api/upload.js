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
                console.log(player);
                console.log(player[nameProp]);
                // console.log(player['Name']);
                try {
                    //ignore titles like 'Sr.', 'Jr.', and 'II' 'III' etc
                    let trimTitles = player[nameProp]
                    .replace(' III', '')
                    .replace(' II', '')
                    .replace(' Sr.', '')
                    .replace(' Jr.', '');

                    let searchName = trimTitles.replace(/\W/ig, "").toLowerCase();
                    console.log(searchName);
                    let dbPlayer = await db.Player.findOne({searchName});
                    if (!dbPlayer && player.Team && player.Position) {
                        console.log('player not FOUND')
                        //try searching by last name/team/position
                        let nameArr = trimTitles.split(' ');
                        nameArr.shift();
                        let lastName = nameArr.join(' ').trim();
                        console.log('lastName', lastName)
                        dbPlayer = await db.Player.findOne({
                            lastName,
                            team: player.Team,
                            position: player.Position
                        });
                    }
                    console.log(dbPlayer);      
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

  router.post("/tiers",  upload.single('tiersFile'), async (req, res) => {
    const name = req.query.name;
    console.log(req.file);
    fs.readFile(req.file.path, 'utf8', function(err, data){
        if (err) {
            res.status(500).json(err);
        } else {   
            console.log(data);
            res.json({
                success: true,
                message: 'Upload Succesful!'
            });
        }
      });
  });


  module.exports = router;