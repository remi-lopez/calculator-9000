import React, { useState, useEffect } from 'react';

export default function DataFromDb(props) {

  const [getData, setGetData] = useState([])

  useEffect(() => {
    fetch("http://localhost/Calculator-9000/index.php", {
      method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((response) => {
      return response.json();
    }).then((data) => {
      setGetData(data)
      return data
    })
  }, [])

  return (
    <aside className="data_result">
      <div className="aside_close">
        <p onClick={props.handleShowData}>x</p>
      </div>
      <section>
        {getData.map((data, i) => {
          {if(props.userId === data.user)
            return (
              <p key={i}>Calcul : {data.operation} = {data.result}</p>
            )
          }
        })}
      </section>
    </aside>
  )
}
