import './App.css';
import { useState, useEffect } from 'react';

import TheTitle from './components/TheTitle';
import Calculator from './components/Calculator';
import ItSOverNineThousand from './components/ItSOverNineThousand';
import ShowData from './components/ShowData';
import DataFromDb from './components/DataFromDb';

function App() {

  const [itsOverNineThousand, setItsOverNineThousand] = useState(false);
  const [showAllData, setShowAllData] = useState(false);
  const [userId, setUserId] = useState("")

  const userIdExist = window.localStorage.getItem('user');

  const handleShowData = () => {
    setShowAllData(!showAllData)
  }

  const generateUserId = () => {
    let randomId = () => {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    if(userIdExist !== "") setUserId("user-" + randomId() + randomId() + '-' + randomId() + '-' + randomId());
  }

  useEffect(() => {
    generateUserId();
    if(userId !== "") window.localStorage.setItem('user', userId);
  }, [])

  
  return (
    <main className="App">
      <TheTitle />
      <Calculator 
      overNineThousandSetter={setItsOverNineThousand} 
      isover={itsOverNineThousand} 
      userId={userIdExist} />

      <ShowData handleShowData={handleShowData} />

      { showAllData && 
        <DataFromDb 
        handleShowData={handleShowData} 
        userId={userIdExist} />
      }

      { itsOverNineThousand && 
        <ItSOverNineThousand 
        overNineThousandSetter={setItsOverNineThousand} />
      }
    </main>
  );
}

export default App;
