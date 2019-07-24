import React from 'react';
import Player from './Player';
import styles from './PlayerList.module.scss';

const PlayerList = ({players, currentPlayer}) => (

	<div className={styles.game}>
	{
		players.map((player, index) => {
			const isActive = +currentPlayer === index;
			return (
				<Player 
					key={index}
					player={player}
					isActive={isActive}
				/>
			);
		})
	}
	</div>
);

export default PlayerList;