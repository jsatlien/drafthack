import React, { useEffect, useState } from 'react';
import API from '../../utils/API';
import { Table } from 'react-bootstrap';
import SelectList from '../../components/SelectList';
import socketClient from 'socket.io-client';

function DraftDashboard() {
    const [rankingListSelect, setRankingListSelect] = useState([]);
    const [players, setPlayers] = useState([]);
    const [draft, setDraft] = useState({
        id: '',
        picked: []
    });

    const updateDraft = async (draftId) => {
        const { data } = await API.getDraftDetail(draftId);
        const draft = data[0];
        if (draft) {
            setDraft({
                id: draftId,
                picked: draft.picked || []
            });
        }
    }

    const initLists = async () => {
        try {
            const response = await API.getRankings();
            //preset rankings list
            const lists = response.data;
            if (lists.length) {
                const listId = lists[0]._id;
                //write function TODO
                const listResponse = await API.getRankingsDetail(listId);
                console.log(listResponse)
                const { players } = listResponse.data;
                setRankingListSelect(lists);
                setPlayers(players);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const initDraft = async () => {
        try {
            const response = await API.getActiveDraft();
            console.log(response.data);

            if (response.data[0] && response.data[0].picked && response.data[0].picked.length) {
                const {externalId, picked } = response.data[0];
                setDraft({
                    id: externalId,
                    picked
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const socket = socketClient("/");

        socket.on('PICK_PLAYER', (msg) => {
            console.log("player picked!");
            // console.log(msg);
            if (msg && msg.externalId) {
                try {
                    updateDraft(msg.externalId);
                    // getRankingListSelect(lists);
                    // }
                } catch (e) {
                    console.log(e);
                }
            }
        });

        socket.on('DRAFT_LOBBY_OPEN', (msg) => {
            console.log("Lobby open!");
            console.log(msg);
            if (msg && msg.externalId) {
                try {
                    updateDraft(msg.externalId);
                    // getRankingListSelect(lists);
                    // }
                } catch (e) {
                    console.log(e);
                }
            }
        });

        //init lists & set active draft
        initLists();
        initDraft();

        return () => socket.disconnect();

    }, []);
 
    const playerPicked = (player, pickedArray) => {
        for (let i = 0; i < pickedArray.length; i++) {
            if (player.sleeper_id.toString().toUpperCase() == pickedArray[i].toString().toUpperCase()) {
                return true;
            }
        }
    }

    const filterPlayers = () => {
        if (players) {
            if (draft && draft.picked && draft.picked.length) {
                return players.filter(o => !playerPicked(o.player, draft.picked));
            } else
                return players;
        }
        else
            return [];
    }


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
                    {filterPlayers().map(({ rank, player, notes }) => (
                        <tr key={rank}>
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