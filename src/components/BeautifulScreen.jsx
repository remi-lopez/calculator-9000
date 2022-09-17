import React from 'react'

export default function BeautifulScreen(props) {

  return (
    <div className="beautiful_screen">
      {props.output != "" ? (
        <div className="beautiful_screen_previous">{props.output}</div>
      ) : (
        <div></div>
      )}

      {props.result !== 0 ? (
        <div className="beautiful_screen_current">{props.result}</div>
      ) : (
        <div className="beautiful_screen_current">0</div>
      )}
    </div>
  )
}
