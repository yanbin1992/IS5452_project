import logo from './logo.svg';
import './App.css';
import React from "react"
import Mainbody from './Mainbody'
import { Button } from 'antd'
import Character from './Character';


export default function App() {
  const [degree, setDegree] = React.useState(true)

  const handleClick = () => {
    setDegree(!degree)
  }


  React.useEffect(() => {
    console.log(degree)
  }, [degree])

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={handleClick}> Change {degree === true ? "true" : "false"} </Button>
        {degree === true ? <Mainbody style={{ display: "block" }} /> : <Character />}
      </header>
    </div>
  );
}

