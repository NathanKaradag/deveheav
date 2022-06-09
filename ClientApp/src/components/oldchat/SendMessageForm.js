import { Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import React from 'react';

const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    return <Form
        onSubmit={e => {
            e.preventDefault();
            sendMessage(message);
            setMessage('');
        }}>
        <InputGroup>
            <div className='messageSend'>
            <FormControl className='yotest' type="user" placeholder="message..."
                onChange={e => setMessage(e.target.value)} value={message} />
            </div>
            
            <Button variant="primary" type="submit" disabled={!message}>Send</Button>
            
        </InputGroup>
    </Form>
}

export default SendMessageForm;