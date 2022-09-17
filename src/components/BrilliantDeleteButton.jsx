import React from 'react'

export default function BrilliantDeleteButton(props) {

  const handleClear = () => {
    props.delete()
  };

  return (
    <button onClick={handleClear} value="del" className="del_button">C</button>
  )
}
