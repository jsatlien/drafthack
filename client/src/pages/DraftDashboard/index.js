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

    const updatePlayers = async (listId, cb) => {
        try {
            const listResponse = await API.getRankingsDetail(listId);
            const { players } = listResponse.data;
            if (players && players.length) {
                setPlayers(players);
                if (cb) cb();
            }
            else 
                throw new Error('No players found for list id: ' + listId)
        } catch (e) {
            console.log(e);
        }
    } 

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
                updatePlayers(listId, () => {
                    setRankingListSelect(lists);
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    const initDraft = async () => {
        try {
            let response = await API.getActiveDraft();
            console.log(response.data);

            if (response.data[0]) {
                const { external_id, picked } = response.data[0];

                response = await API.checkSleeperDraftStatus('123')
                if (response) {
                    console.log(response.data);
                    if (response.data.status === 'complete') {
                        return;
                    }
                }

                setDraft({
                    id: external_id,
                    picked: picked || []
                });
            }
        } catch (e) {
            console.error(e);
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

    const onSelectRankings = async (e) => {
            const { value } = e.target;
            if (value) updatePlayers(value);
    }


    return (
        <>
            <h1>Draft Dashboard</h1>
            <SelectList options={rankingListSelect} onSelect={onSelectRankings}></SelectList>
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