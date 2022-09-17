import React from 'react'

export default function AmazingNumberButton(props) {

  const numberArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];

  const handleClick = (e) => {
    props.handleClickNumber(e.target.value)
  };

  return (
    <div className="number_button">
      {numberArray.map((number, i) => {
        return (
          <button 
            key={i}
            className="btn_number" 
            onClick={handleClick} 
            value={number}
          >
            {number}
          </button>
        )
      })}
    </div>
  )
}
