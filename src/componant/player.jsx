import React from 'react'
import { useState } from 'react'
function Player({initialName, symbol , isActive, onChangeName}) {
        const [playerName,setPlayerName]= useState(initialName)
        const [isEditing, setIsEditing]= useState(false)

    function handleEditClick() {
       
        // !isEditing?  setIsEditing(true) : setIsEditing(false)
        // setIsEditing(!isEditing? true : false)
        // setIsEditing(!isEditing)
        
        setIsEditing((editing ) => !editing) //best practice 
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    }
    function handleChange(e){
        setPlayerName(e.target.value)
    }
        let editablePlayerName = <span className="player-name"> {playerName}</span>;
        let btnCaption = 'edit'

        if (isEditing) { 
            editablePlayerName = <input tyupe= 'text' required value={playerName} onChange={handleChange} />
            btnCaption=' Save'
         }
  return (
    <li className={isActive ? 'active': undefined}>
    <span className="player">
        {editablePlayerName}
    <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick={handleEditClick}> {isEditing ? 'save': 'edit'}</button>
  </li>
  )
}

export default Player
