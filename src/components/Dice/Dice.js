import React from 'react';
import styles from './Dice.module.scss';

const Dice = ({numbers}) => (
	<div className={styles.wrapper}>
		{
			numbers.map((number, index) => {
				return (
					<img 
						key={index} 
						src={require(`../../assets/dice-${number}.svg`)} 
						alt="Dice" 
						className={styles.dice} 
						id={styles[`dice-${index + 1}`]}
					/>
				)
			})
		}
	</div>
)

export default Dice;