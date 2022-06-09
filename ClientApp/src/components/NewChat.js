import React from 'react';
import "./console.css"
import SendMessageForm from './oldchat/SendMessageForm';

class NewChat extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            client: new WebSocket(`ws://localhost:3000/ws2?name=${props.roomName}`),
            AllMessages: [],
            username: props.username
        };
    }

    componentDidMount() {
        let self = this;

        this.state.client.onmessage = function(event) {
            var x = event.data;
            var y = x.split('\x00');
            var z = y[0];
            var a = JSON.parse(z);
            var b = a.msg;

            self.addMessage(a);
        };
        
    }
    addMessage = (message) => {
        let x = [...this.state.AllMessages, message]
        this.setState({AllMessages : x})
    }

    sendMessage = () => {
        let text = document.getElementsByClassName("yotest")[0].value;

        let jsonstring = {"msg" : text, "user" : this.state.username}
        let message = JSON.stringify(jsonstring);
        let x = [...this.state.AllMessages, jsonstring]
        this.setState({AllMessages : x})
        this.state.client.send(message);
    }


    closeConnection = () => {
        if(this.state.client != null){
            this.state.client.close(1000, "Exited room");
        }
    }


    render() {
        return (
         <div>
            <div className='message-container' >
            {this.state.AllMessages.map((message) =>
                   <div>{message.user == this.state.username ? <div className='user-message'>
                       <div className='message bg-primary'>{message.msg}</div>
                       <div className='from-user'>{message.user}</div>
                   </div>
                   : <div className='otheruser-message'>
                       <div className='message bg-secondary'>{message.msg}</div> 
                       <div className='from-user'>{message.user}</div>
                   </div>
                   }
                   </div>
                   
               )}
            </div>
            <SendMessageForm sendMessage={this.sendMessage} />
         </div>
        );
    }
}

export default NewChat;