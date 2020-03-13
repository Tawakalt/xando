import React from 'react';

const Square = (props) => {
    const buttonStyle = {
        backgroundColor: "red"
    }
    return (
        <button 
            disabled={props.buttonDisabled}
            className="square" 
            onClick={props.onClick}
            style={(props.winnerCells && props.winnerCells.includes(props.cell)) ? buttonStyle : null}
        >
            {props.value}
        </button>
        );
}

export default Square;