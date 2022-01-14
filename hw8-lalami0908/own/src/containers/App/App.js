import './App.css'
import React, { useEffect, useRef, useCallback,  useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Button, Input, message, Tag } from 'antd'
import  ChatRoom  from './ChatRoom.js'
import { client } from '../../index.js';



function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [whoIam, setWhoIam] = useState('')

  const startGame = (e) => {
    setWhoIam(e.target.value)
    setHasStarted(true)
    
  }
  const startMenu = (
    <div>
       <input
            placeholder="who you are"
            value={whoIam}
            onChange={(e) => setWhoIam(e.target.value)}
          ></input>
          <button
            onClick={  
              async() => { 
                
                if((whoIam !== undefined) && (whoIam !== null) && (whoIam !== "")){
                  setHasStarted(true)
                } else {
                  alert("you have to set who you are.")
                }           
              }
          }
          >click
          </button>
    </div>
  )
  return <div className="App">{hasStarted ? <ChatRoom whoIam={ whoIam }></ChatRoom> : startMenu}</div>
}

export default App
