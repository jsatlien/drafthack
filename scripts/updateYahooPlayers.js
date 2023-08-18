
const db = require('../dbconfig/connection');
const { Player } = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');

db.once('open', async () => {
    await Player.deleteMany();
    syncPlayers();
})

async function syncPlayers() {
    let count = 0;
    const playerArray = [];
    while (count <= 200) {
        const url = 'https://football.fantasysports.yahoo.com/f1/101/players?status=ALL&pos=O&cut_type=9&stat1=S_PS_2023&myteam=0&sort=AR&sdir=1&count=' + count;
        console.log(url);
        const res = await axios.get(url);
        if (res.status == 200 && res.data) {
            const $ = cheerio.load(res.data);
            const htmlPlayers = $('div.players table tbody').children('tr');
            for (let i = 0; i < htmlPlayers.length; i++) {
                const curRow = $(htmlPlayers[i]).find('.ysf-player-name');
                const playerData = curRow.find('a.playernote');
                const teamData = curRow.find('.Fz-xxs');

                //extract data
                const nameArr = playerData.html().split(' ');
                const id = playerData.attr('id').split('-')[1];
                const teamArr = teamData.html().split(' - ');

                const playerInsert = {
                    firstName: nameArr[0],
                    lastName: nameArr[1],
                    position: teamArr[1],
                    team: teamArr[0],
                    platform: 'yahoo',
                    platformId: id
                };

                playerArray.push(playerInsert);
            }

            count += 25;
        } else {
            console.log('error making request');
            break;
        }

    }

    if (playerArray.length) {
        try {
            await Player.insertMany(playerArray);
            console.log('yahoo players updated');
        } catch (e) {
            console.log('yahoo player sync failed');
            console.log(e);
        }
    }

    process.exit();
}
