import React from 'react';
import styles from './Dice.module.scss';

const Dice = ({numbers}) => (
	<div className={styles.wrapper}>
		{
			numbers.map((el,i) => {
				const line = el ? 
				<img 
					key={i} 
					src={require(`../../assets/dice-${el}.svg`)} 
					alt="Dice" 
					className={styles.dice} 
					id={styles[`dice-${i+1}`]}
				/> : '';
				return line;
			})
		}
	</div>
)

export default Dice;