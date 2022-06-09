import React from "react";
import CodeEditor from "./CodeEditor";
import NewChat from "./NewChat";

const Codewithchat = ({roomName, exitFunc, username}) => {
    
    return (<div className="codePage">
        <NewChat roomName={roomName} username={username}/>
        <div class="verticalLine"></div>
        <CodeEditor roomName={roomName} test={exitFunc}/>
    </div>
        
    )
}

export default Codewithchat;