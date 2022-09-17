import React from 'react'

export default function ItSOverNineThousand(props) {

  const closeAside = () => {
    props.overNineThousandSetter(false)
  }
  return (
    <aside className="aside_over_nine_thousand">
      <div className="aside_close" onClick={closeAside}>
        <p>x</p>
      </div>
      <p className="aside_text">Le résultat est supérieur à 9000 !</p>
    </aside>
  )
}
