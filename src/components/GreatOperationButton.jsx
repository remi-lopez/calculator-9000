import React from 'react'

export default function GreatOperationButton(props) {

  const operationArray = ["+", "-", "/", "*"]

  const handleClick = (e) => {
    props.handleClickOperation(e.target.value)
  };

  return (
    <div className="operation_button">
      {operationArray.map((operation, i) => {
        return (
          <button 
            key={i} 
            className="btn_operation" 
            onClick={handleClick} 
            value={operation}
          >
            {operation}
          </button>
        )
      })}
    </div>
  )
}
