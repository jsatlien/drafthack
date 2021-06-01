import React, { useEffect, useState } from 'react';
import API from '../../utils/API';
import { Table } from 'react-bootstrap';
import SelectList from '../../components/SelectList';

function DraftDashboard({ socket }) {

    const [rankingListSelect, setRankingListSelect] = useState([]);
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await API.getRankings();
                console.log(response);

                //preset rankings list
                const lists = response.data;
                if (lists.length) {
                    const listId = lists[0]._id;
                    //write function TODO
                    const listResponse = await API.getRankingsDetail(listId);
                    console.log(listResponse)
                    const { players } = listResponse.data;
                    setPlayers(players);
                    setRankingListSelect(lists);
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    socket.on('PICK_PLAYER', () => {
        console.log("player picked!");
    });
    return (
        <>
            <h1>Draft Dashboard</h1>
            <SelectList options={rankingListSelect} ></SelectList>
            <Table size='sm' hover striped bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Pos</th>
                        <th>Team</th>
                        <th>Age</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                    <tbody>
                        {players.map( ({rank, player, notes}) => (
                            <tr>
                                <th>{rank}</th>
                                <th>{`${player.firstName} ${player.lastName}`}</th>
                                <th>{player.position}</th>
                                <th>{player.team}</th>
                                <th>{player.age}</th>
                                <th>{notes}</th>
                            </tr>
                        ))}
                    </tbody>
            </Table>
        </>
    );
}

export default DraftDashboard;