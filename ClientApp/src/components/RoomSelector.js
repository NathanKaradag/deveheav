import React from "react";
import CodeEditor from "./CodeEditor";
import { useState } from 'react';
import Codewithchat from "./Codewithchat";
import Newchatroom from "./newchatroom";

const RoomSelector = () => {
    const [joined, setJoined] = useState(false);
    const [room, setRoom] = useState("");

    const [username, setUsername] = useState("");

    
    const exitRoom = () => {
        setJoined(false)
    }

    const enterRoom = () => {
        setJoined(true)
        //console.log({value})
    }

    return (
        <div>
             {joined == false ? <div>
                 <input placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                 <input placeholder="Roomname" id="Something" onChange={(e) => setRoom(e.target.value)}/>
                 <button onClick={() => enterRoom()}>Enter room</button>
                 </div> 
                 : <div>
                    <Codewithchat roomName={room} exitFunc={exitRoom} username={username}/>
                 </div>}
        </div>
        
    )
}

export default RoomSelector;