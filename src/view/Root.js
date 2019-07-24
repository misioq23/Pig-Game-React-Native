import React from 'react';
import Dice from '../components/Dice/Dice';
import Button from '../components/Button/Button';
import PlayerList from '../components/PlayerList/PlayerList';
import CreatePlayer from '../helpers/CreatePlayer';
import styles from './Root.module.scss';

class Root extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            players : [],
            diceNums: [],
            currentPlayer: false,
            isGameActive: false,
            maxScore: 100
        }
    }
    
    newGame() {
        this.setState({
            players : [new CreatePlayer('Player 1'), new CreatePlayer('Player 2')],
            diceNums: [],
            currentPlayer: false,
            isGameActive: true 
        })
    }
    
    handleChange = event => {
        const { name, value } = event.target
      
        this.setState({
          [name]: value,
        })
      }

    draw() {
        if (this.state.isGameActive) {
            const players = [...this.state.players];
            const activePlayer = players[+this.state.currentPlayer];

            const rollNumber = () => Math.floor(Math.random() * 6) + 1;
            const dice = [rollNumber(), rollNumber()];

            // If any 1 didn't fall out- Add dice numbers to current score otherwise reset currentScore
            activePlayer.currentScore += !dice.includes(1) ? dice.reduce((a, b) => a + b, 0) : -activePlayer.currentScore;
            // If only 1 fell out- Change player
            if (dice.join('') !== '11' && dice.includes(1)) this.setState({currentPlayer: !this.state.currentPlayer});
 
            this.setState({
                players: players,
                diceNums: dice,
            });
        }
    }

    hold() {
        const players = [...this.state.players];
        const activePlayer = players[+this.state.currentPlayer];

        if (this.state.isGameActive && activePlayer.currentScore > 0) {

            activePlayer.score += activePlayer.currentScore;
            activePlayer.currentScore = 0;
    
            if(activePlayer.score >= this.state.maxScore) {
                activePlayer.name = 'Winner'
                activePlayer.winner = true;

                this.setState({
                    players: players,
                    diceNums: [],
                    isGameActive: false
                });   
            } else {
                this.setState({
                    players: players,
                    currentPlayer: !this.state.currentPlayer
                });
            }
        }
    }

    render() {
        const buttons = (
            <>
                <Button name={'roll'} onClick={() => this.draw()}>Roll Dice</Button>
                <Button name={'hold'} onClick={() => this.hold()}>Hold</Button>
            </>
        );
        return (
            <div className={styles.wrapper}>
                
                <Button name={'new'} onClick={() => this.newGame()}>New Game</Button>
                { this.state.isGameActive ? buttons : null}

                <Dice numbers={this.state.diceNums}/>
                <PlayerList players={this.state.players} currentPlayer={this.state.currentPlayer} />

                <label 
                    className={styles['maxScore-label']} 
                    htmlFor="maxScore"
                >
                    Final Score
                </label>

                <input 
                    onChange={this.handleChange}
                    name="maxScore"
                    value={this.state.maxScore}
                    type="number" 
                    className={styles['maxScore-input']}/>
            </div>
        );
    }
}

export default Root;