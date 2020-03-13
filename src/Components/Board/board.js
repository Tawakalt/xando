import React from 'react';
import Square from '../Square/square'

export default class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square 
          buttonDisabled={this.props.buttonDisabled}
          value={this.props.squares[i]} 
          onClick={() => this.props.onClick(i)}
          winnerCells={this.props.winnerCells}
          cell={i}
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