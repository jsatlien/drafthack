import React, { useEffect, useState } from 'react';
import API from '../../utils/API';
import { Container, Row, Col } from 'react-bootstrap';
import SelectList from '../../components/SelectList';
import PlayerList from '../../components/PlayerList';
import MainNav from '../../components/Navbar';
import socketClient from 'socket.io-client';
import { positionSelect } from '../../config/config.js';

function DraftDashboard() {
    const [rankingListSelect, setRankingListSelect] = useState([]);
    const [tierListSelect, setTierListSelect] = useState([]);
    const [players, setPlayers] = useState([]);
    const [tiers, setTiers] = useState([]);
    const [tierPos, setTierPos] = useState(positionSelect[0]._id); //default to 1st position in config
    const [draft, setDraft] = useState({
        id: '',
        picked: []
    });

    const updateRankingsList = async (listId, cb) => {
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

    const updateTierList = async (listId, cb) => {
        try {
            const listResponse = await API.getTierListDetail(listId);
            const { list } = listResponse.data;
            if (list && list.length) {
                setTiers(list);
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
            let response = await API.getRankings();
            const rankingsLists = response.data;
            response = await API.getTierLists();
            const tiersLists = response.data;
            setRankingListSelect(rankingsLists);
            setTierListSelect(tiersLists);
        } catch (e) {
            console.log(e);
        }
    }

    const initDraft = async () => {
        console.log("INIT DRAFT")
        try {
            let response = await API.getActiveDraft();
            console.log("RESPONSE DATA")
            console.log(response.data);

            if (response.data[0]) {
                const { external_id, picked } = response.data[0];

                try {
                    response = await API.checkSleeperDraftStatus(external_id);
                    if (response) {
                        console.log(response.data);
                        if (response.data.status === 'complete') {
                            await API.endDraft(external_id);
                            return;
                        }
                    }
                } catch (e) {
                    if (e.response.status === 404) 
                        await API.endDraft(external_id);
                        return;
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
        initDraft();
        initLists();

        return () => socket.disconnect();

    }, []);

    const playerPicked = (player, pickedArray) => {
        for (let i = 0; i < pickedArray.length; i++) {
            if (player.sleeper_id.toString().toUpperCase() == pickedArray[i].toString().toUpperCase()) {
                return true;
            }
        }
    }

    const filterPlayers = (players) => {
        if (players) {
            if (draft && draft.picked && draft.picked.length) {
                return players.filter(o => !playerPicked(o.player, draft.picked));
            } else
                return players;
        }

        return [];
    }

    const onSelectRankings = async (e) => {
        const { value } = e.target;

        if (value) {
            if (value === 'default') return;
            updateRankingsList(value);
        }
    }

    const onSelectTiers = async (e) => {
        console.log(draft)
        const { value } = e.target;
        if (value) {
            if (value === 'default') return;
            updateTierList(value);
        }
    }

    const onSelectPosition = async (e) => {
        const { value } = e.target;
        if (value) {
            setTierPos(value);
        }
    }

    const filterTiers = () => {
        if (tiers && tiers.length) {
            return tiers.filter(player => player.position === tierPos);
        }
        return [];
    }


    return (
        <Container fluid>
            <MainNav title='Draft Dashboard'></MainNav>
            <Row>
                <Col xs={6}>

                </Col>
            </Row>
            <Row>
                <Col></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <h6>Rankings</h6>
                    <SelectList defaultMessage='Select a List...' options={rankingListSelect} onSelect={onSelectRankings}></SelectList>
                    <PlayerList
                        players={filterPlayers(players)}
                        isTiered={false} />
                </Col>
                <Col xs={6}>
                    <h6>Tiers</h6>
                    <SelectList defaultMessage='Select a List...' options={tierListSelect} onSelect={onSelectTiers}></SelectList>
                    <SelectList options={positionSelect} onSelect={onSelectPosition}></SelectList>

                    <PlayerList
                        players={filterPlayers(filterTiers())}
                        isTiered={true} />
                </Col>
            </Row>
        </Container>
    );
}

export default DraftDashboard;