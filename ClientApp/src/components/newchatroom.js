import React from "react";
import { useState } from 'react';
import NewChat from './NewChat';

const Newchatroom = () => {
    const [user, setUser] = useState(false);
    const [value, setValue] = useState("");

    const exitRoom = () => {
        setUser(false)
    }

    const enterRoom = () => {
        setUser(true)
    }

    return (
        <div>
             {user == false ? <div>
                 <input id="Something" onChange={(e) => setValue(e.target.value)}/>
                 <button onClick={() => enterRoom()}>Your name</button>
                 </div> 
                 : <div>
                    <NewChat username={value}/>
                 </div>}
        </div>
        
    )
}

export default Newchatroom;