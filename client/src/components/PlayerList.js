import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

function PlayerList({ players }) {
    const headers = ["#", "Name", "Team", "Bye", "Points", "Risk", "Upside", "ADP"];

    const renderList = () => {
        console.log("rendering tiers");
        console.group(players)
        let lastTier = 0;
        return players.map(({ name, player, tier, bye, adp, risk }, i) => {
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

    return (
        <Table size='sm' hover striped bordered>
            <thead>
                <tr>
                    {headers.map((header, i) => <th key={i}>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {renderList()}
            </tbody>
        </Table>
    )
}

export default PlayerList;