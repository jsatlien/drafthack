import React, { useEffect, useState } from 'react';
import API from '../../utils/API';

function DraftDashboard({ socket }) {

    const [rankingListSelect, setRankingListSelect] = useState([]);

    useEffect(async () => {
        try {

            const response = await API.getRankings();
            console.log(response);
        } catch(e) {
            console.log(e);
        }
    }, []);

    socket.on('PICK_PLAYER', () => {
        console.log("player picked!");
      });
    return (
        <h1>Draft Dashboard</h1>
    );
}

export default DraftDashboard;