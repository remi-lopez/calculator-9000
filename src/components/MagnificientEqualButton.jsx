import React from 'react'

export default function MagnificientEqualButton(props) {

  const handleResult = (e) => {
    props.equal(e.target.value)
  };

  return (
    <button onClick={handleResult} value="=" className="equal_btn">=</button>
  )
}
