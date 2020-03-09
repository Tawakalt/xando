import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
            return squares[a];
        }
    }
    return null;
}
  
const Square = (props) => {
    return (
        <button 
            className="square" 
            onClick={props.onClick}
        >
            {props.value}
        </button>
        );
}
  
class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square 
          value={this.props.squares[i]} 
          onClick = {() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
      const board = [[0,1,2], [3,4,5], [6,7,8]]
      return (
        <div>
          {board.map((row, index) => (
            <div className="board-row" key={ index }>
              {row.map((cell, cIndex) => (
                <span key={ cIndex }>
                  {this.renderSquare(cell)}
                </span>
              ))}
            </div>
          ))}
        </div>
      );
    }
}
  
class Game extends React.Component {
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

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const clickedCells = this.state.clickedCells;
        const bold = this.state.bold;
        
        const moves = history.map((step, move) => {
            const cc = clickedCells[move-1] ? clickedCells[move-1] : 0
            const location =
            cc + '( ' + this.col(cc) + ', ' + this.row(cc)+ ' )' 
            const desc = move ?
            'Go to move # ' + move + ': ' + location :
            'Go to game start';
            return(
                <li key={move}>
                    <button onClick={() =>
                    this.jumpTo(move)}
                    >
                        {bold === move ? <strong>{desc}</strong> : desc}
                    </button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' +
            (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
            </div>
        );
    }
}
  
  // ========================================
  
ReactDOM.render(
<Game />,
document.getElementById('root')
);
