import React from 'react';
import styles from './Player.module.scss';

const Player = ({name, currentScore, score, isActive, winner}) => {
	const win = winner ? winner - 1 : false;

	return (
		<div className={win ? [styles.player, styles.winner].join(' ') : [styles.player, (isActive ? styles.active : '')].join(' ')}>
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
