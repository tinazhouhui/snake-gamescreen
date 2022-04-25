import React, {useEffect, useState} from 'react';
import {IAllPlayers, IScores} from '../../../interfaces/api';
import styles from './Scoreboard.module.css';
import Player from './Player/Player';

interface IProps {
    players: IAllPlayers,
    scores: IScores,
}

function Scoreboard({players, scores}: IProps) {
    const [scoreBoard, setScoreBoard] = useState<JSX.Element[]>([]);

    useEffect(() => {
        // sorting an object https://stackoverflow.com/a/1069840/18631517
        const sortedScores: IScores = Object.entries(scores)
            .sort(([, a], [, b]) => b.food - a.food)
            .reduce((r, [k, v]) => ({...r, [k]: v}), {});

        const htmlList = Object.entries(sortedScores).map(([id, score]) => {
            return <Player key={id} player={players[id]} score={score}/>;
        });
        setScoreBoard(htmlList);
    }, [scores]);

    return (
        <div className={styles.container}>{scoreBoard}</div>
    );
}

export default Scoreboard;