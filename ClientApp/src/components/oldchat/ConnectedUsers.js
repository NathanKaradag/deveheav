import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import React from 'react';

const ConnectedUsers = ({ users }) =>
 <ProSidebar>
     <Menu iconShape="square">
     
        
        <SubMenu title="Online Users" >
            <div className='user-list'>
            <MenuItem>{users.map((u, idx) => <h6 key={idx}>{u}</h6>)}</MenuItem>
            </div>
        </SubMenu>
    </Menu>
 </ProSidebar>

export default ConnectedUsers;