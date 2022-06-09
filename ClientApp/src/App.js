import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';
import CodeEditor from './components/CodeEditor';
import RoomSelector from './components/RoomSelector';
import chatfrontend from './chatfrontend';
import NewChat from './components/NewChat';
import Newchatroom from './components/newchatroom';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Codewithchat from './components/Codewithchat';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/editor' component={RoomSelector} />
      </Layout>
    );
  }
}
