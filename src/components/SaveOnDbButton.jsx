import React from 'react'

export default function SaveOnDbButton(props) {
  return (
    <div className="save_db">
      <button type="submit" onClick={props.postData}>Enregistrer</button>
    </div>
  )
}
