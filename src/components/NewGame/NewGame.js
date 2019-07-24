import React from 'react';
import Button from '../Button/Button';
import styles from './NewGame.module.scss';

const NewGame = ({onClick, onChange, valueMaxScore}) => (
	<>
		<Button name={'new'} onClick={onClick}>New Game</Button>
		<label 
			className={styles['maxScore-label']} 
			htmlFor="valueMaxScore"
		>
			Final Score
		</label>

		<input 
			onChange={(e) => onChange(e)}
			name="valueMaxScore"
			value={valueMaxScore}
			type="number" 
			className={styles['maxScore-input']}/>
	</>
)

export default NewGame;