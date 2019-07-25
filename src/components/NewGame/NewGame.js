import React from 'react';
import PropTypes from 'prop-types';
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

NewGame.propTypes = {
	onClick: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	valueMaxScore: PropTypes.number.isRequired
}

export default NewGame;