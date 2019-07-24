import React from 'react';
import styles from './Button.module.scss';

const Button = ({children, name, onClick}) => (
	<button 
		className={[styles.btn, styles[name]].join(' ')} 
		onClick={onClick}
	>
		{children}
	</button>
);

export default Button;