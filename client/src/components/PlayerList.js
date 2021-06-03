import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

function PlayerList({ players, isTiered }) {

    //TODO: this should prob be configurable
    const headers = isTiered ? 
    ['Name', 'Team','Age','Risk','Bye','ADP'] : ["#","Name","Pos","Team","Age","Notes"];
    
    const renderTiers = () => {
        console.log("rendering tiers");
        console.group(players)
        let lastTier = 0;
        return players.map(({ name, player, tier, notes, position, rank, bye, adp, risk }, i) => {
            if (tier != lastTier) {
                lastTier = tier;
                return (
                    <>
                        <tr key={'tier-' + lastTier}>
                            <td>
                                <div className='h3'>Tier {tier}</div>
                            </td>
                        </tr>
                        <tr key={i}>
                            <th>{`${player.firstName} ${player.lastName}`}</th>
                            <th>{player.team}</th>
                            <th>{player.age}</th>
                            <th>{risk}</th>
                            <th>{bye}</th>
                            <th>{adp}</th>
                            {/* <th>{notes}</th> */}
                        </tr>
                    </>
                );
            }
            lastTier = tier;
            //TODO prob return this jsx with a function
            return (
                <tr key={i}>
                    <th>{`${player.firstName} ${player.lastName}`}</th>
                    <th>{player.team}</th>
                    <th>{player.age}</th>
                    <th>{risk}</th>
                    <th>{bye}</th>
                    <th>{adp}</th>
                    {/* <th>{notes}</th> */}
                </tr>
            );
        });
    }

    const renderRankings = () => {
        return players.map(({ name, player, rank, notes }) => {
            return (
                <tr key={rank}>
                    <th>{rank}</th>
                    <th>{`${player.firstName} ${player.lastName}`}</th>
                    <th>{player.position}</th>
                    <th>{player.team}</th>
                    <th>{player.age}</th>
                    <th>{notes}</th>
                </tr>
            );
        });
    }

    const renderList = () => {
        if (isTiered) {
            return renderTiers();
        } else {
            return renderRankings();
        }
    }

    return (
        <Table size='sm' hover striped bordered>
            <thead>
                <tr>
                    {headers.map((header, i) => <th key={i}>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {renderList()}
                {/* {players.map(({ rank, player, notes }) => (
                    <tr key={rank}>
                        <th>{rank}</th>
                        <th>{`${player.firstName} ${player.lastName}`}</th>
                        <th>{player.position}</th>
                        <th>{player.team}</th>
                        <th>{player.age}</th>
                        <th>{notes}</th>
                    </tr> */}
                {/* ))} */}
            </tbody>
        </Table>
    )
}

export default PlayerList;