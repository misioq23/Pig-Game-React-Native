import React from 'react';
import styles from './Player.module.scss';

const Player = ({player, isActive}) => {
	const {name, score, currentScore, winner} = player;
	
	const style = [styles.player]
	style.push(winner ? styles['winner'] : !isActive || styles['active']);

	return (
		<div className={style.join(' ')}>
			<div className={styles.name}>{name}</div>
			<div className={styles.score}>{score}</div>
			<div className={styles['current-box']}>
				<div className={styles['current-label']}>Current</div>
				<div className={styles['current-score']}>{currentScore}</div>
			</div>
		</div>
	);
}

export default Player;
