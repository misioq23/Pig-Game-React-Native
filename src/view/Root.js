import React from 'react';
import styles from './Root.module.scss';
import Player from '../components/Player/Player';
import Dice from '../components/Dice/Dice';
import Button from '../components/Button/Button';

class Root extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            names: ['Player 1', 'Player 2'],
            currentScore: 0,
            score: [0, 0],
            diceNums: [null, null],
            currentPlayer: false,
            winner: null,
            newGame: false
        }
    }

    handleChange = event => {
        const { name, value } = event.target
      
        this.setState({
          [name]: value,
        })
      }

    newGame() {
        this.setState({
            names: ['Player 1', 'Player 2'],
            currentScore: 0,
            score: [0, 0],
            diceNums: [null, null],
            currentPlayer: false,
            winner: null,
            newGame: true 
        })
    }

    draw() {
        if (!this.state.winner) {
            const rollNumber = () => Math.floor(Math.random() * 6) + 1;
            const dice = [rollNumber(), rollNumber()];

            this.setState({
                diceNums: dice,
            });

            if (!dice.includes(1)) {
                // no 'one'
                this.setState({
                    currentScore: this.state.currentScore + dice.reduce((a, b) => a + b, 0)
                });
            } else if (dice.join('') === '11') {
                // two 'ones'
                this.setState({
                    currentScore: 0
                });
            } else {
                // one 'one'
                this.setState({
                    currentScore: 0,
                    currentPlayer: !this.state.currentPlayer
                });
            }
        }
    }

    hold() {
        if (!this.state.winner) {
            const activePlayer = +this.state.currentPlayer;
            const score = [...this.state.score];
            score[activePlayer] +=  this.state.currentScore;
    
            this.setState({
                score: score,
                currentScore: 0,
            });
    
            if(score[activePlayer] >= this.state.maxScore) {
                const names = [...this.state.names];
                names[activePlayer] = 'Winner';
                this.setState({
                    names: names,
                    winner: activePlayer + 1,
                    diceNums: [null, null]
                });   
            } else {
                this.setState({
                    currentPlayer: !this.state.currentPlayer
                });
            }
        }
    }

    render() {
        const data = (
            <>
                <Button name={'roll'} onClick={() => this.draw()}>Roll</Button>
                <Button name={'hold'} onClick={() => this.hold()}>Hold</Button>

                <Dice 
                    numbers={this.state.diceNums}
                />
                <div className={styles.game}>
                    {
                        this.state.names.map((el, i) => {
                            const isActive = +this.state.currentPlayer === i;
                            return (
                                <Player 
                                    key={i}
                                    name={el}
                                    isActive={isActive}
                                    currentScore={isActive ? this.state.currentScore : 0}
                                    score={this.state.score[i]}
                                    winner={this.state.winner}
                                />
                            )
                        })
                    }
                </div>
            </>
        )
        return (
            <div className={styles.wrapper}>
                
                <Button name={'new'} onClick={() => this.newGame()}>New Game</Button>
                {this.state.newGame ? data : ''}
                <label className={styles['label']} for="maxScore">Final Score</label>
                <input 
                    onChange={this.handleChange}
                    name="maxScore"
                    value={this.state.maxScore || 100 }
                    type="number" 
                    className={styles['final-score']}/>
            </div>
        );
    }
}

export default Root;