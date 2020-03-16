import React from 'react';
import Board from '../Board/board';

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b]
        && squares[a] === squares[c]) {
            return {'player': squares[a], 'cells': lines[i]};
        }
    }
    return null;
}

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            clickedCells: [],
            bold: null,
            ascending: true,
            buttonDisabled: false,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(
            0, this.state.stepNumber + 1
        );
        const current = history[history.length - 1];
        const squares = current.squares.slice()
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            clickedCells: [...this.state.clickedCells, i]
        });
    }

    jumpTo(step) {
        const newClickedCells = this.state.clickedCells.slice(0, step)
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            clickedCells: newClickedCells,
            bold: step,
        });
    }

    row(i) {
        return Math.floor(i/3)
    }

    col(i) {
        return i % 3
    }

    toggle(){
        this.state.clickedCells.reverse()
        this.setState({
            ascending: !this.state.ascending,
            buttonDisabled: !this.state.buttonDisabled,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const clickedCells = this.state.clickedCells;
        const bold = this.state.bold;
        
        const moves = history.map((step, move) => {

            move = !this.state.ascending ? clickedCells.length - move : move
            const pos = !this.state.ascending ? clickedCells.length - move : move-1
            const cc = clickedCells[pos] ? clickedCells[pos] : 0
            const location =
            cc + '( ' + this.col(cc) + ', ' + this.row(cc)+ ' )' 
            const desc = move ?
            'Go to move # ' + move + ': ' + location :
            'Go to game start';
            return(
                <li key={move}>
                    <button 
                    disabled={this.state.buttonDisabled}
                    onClick={() =>
                    this.jumpTo(move)}
                    >
                        {bold === move ? <strong>{desc}</strong> : desc}
                    </button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner.player;
        } else if (clickedCells.length === 9) {
            status = "It's a draw!"
        } else {
            status = 'Next player: ' +
            (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
            <div className="game-board">
                <Board
                    buttonDisabled={this.state.buttonDisabled}
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                    winnerCells={winner ? winner.cells : null}
                />
            </div>
            <div className="game-info">
                <div>
                    {status + ' '}
                    <button className="toggle" onClick={() => this.toggle()}>
                        {this.state.ascending ? 'Asc' : 'Desc'}
                    </button>
                </div>
                <ol>{moves}</ol>
            </div>
            </div>
        );
    }
}