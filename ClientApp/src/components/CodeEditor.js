import React from 'react';
import AceEditor from 'react-ace'
import './console.css';
// https://securingsincity.github.io/react-ace/

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

//import console from './console';


let consoleMessages = [];

let xxx = "";


class CodeEditor extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            text: `console.log("Hello world")`,
            client: new WebSocket(`ws://localhost:3000/ws?name=${props.roomName}`),
            //consoleMessages : [],
            output: ``
        };
    }

    onChange(newValue) {
        this.setState({ text: newValue });
        this.sendText(newValue)
    }


    componentDidMount() {
        let self = this;

        this.state.client.onopen = function(event) {
            self.state.client.send("Newcl");
        };

        this.state.client.onmessage = function(event) {
            var x = event.data;
            var y = x.split('\x00');
            var z = y[0];

            self.handleMessage(z);
            //self.updateText(z);
        };
        (function () {
            var old = console.log;
            var old2 = console.warn;
            var logger = document.getElementsByClassName('console')[0];
            console.log = function () {
              for (var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] == 'object') {
                    logger.innerHTML += "> " + (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '<br />';
                }
                else if(typeof arguments[i] == 'string'){
                    logger.innerHTML += '> "'+ arguments[i] + '" <br />';
                }
                else {
                    logger.innerHTML += "> " + arguments[i] + '<br />';
                }
              }
            }
            console.error = function (err) {
                if(err.name == undefined){
                    return;
                }

                logger.innerHTML += "> " + err + '<br />';
            }
            console.warn = function (text) {
                old2(text)
            }
            
        })();
    }

    handleMessage = (txt) => {
        if(txt === "Newcl"){
            this.sendText(this.state.text);
        }
        else{
            this.updateText(txt);
        }
    }

    updateText = (key) => {
        this.setState({text: key});
    }

    sendText = (key) => {
        this.state.client.send(key);
    }

    closeConnection = () => {
        if(this.state.client != null){
            this.state.client.close(1000, "Exited room");
        }
    }

    executeCode = () => {
        const userCode = this.state.text;
        try{
            //eval(userCode);

            var F = new Function(userCode);
            return(F());
        }catch(err) {
            console.error(err);
        }
    }
    

    resetCode = () => {
        var logger = document.getElementsByClassName('console')[0];
        logger.innerHTML = "";
    }

    render() {
        return (
         <div className='theEditor'>
             <AceEditor
                className='editguy'
                placeholder="Placeholder Text"
                mode="javascript"
                theme="monokai"
                name="blah2"
                onLoad={this.onLoad}
                onChange={(e) => this.onChange(e)}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={this.state.text}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
                width='600px'
            />

            <div className='editor__footer'>
                <div className='editor__footer--left'>
                    <button className='editor__btn editor__run' onClick={() => this.executeCode()}> Run {'>'}</button>
                    <button className='editor__btn editor__reset' onClick={() => this.resetCode()}> Resetten {'>'}</button>
                </div>
                <div className='editor__footer--right'>
                    <div className='editor__console'>
                        <div className='console'>

                        </div>
                    </div>
                </div>
            </div>

            
         </div>
        );
    }
}
/*
<button onClick={() => {
                this.props.test();
                this.closeConnection()}}>Disconnect</button>
*/



export default CodeEditor;
