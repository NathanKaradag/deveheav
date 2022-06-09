import React, { Component } from 'react';
import './random.css';
import aimage from './pair.svg';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div class="section-center">
          <div>
            <h1 class="mb-0">Developers Heaven</h1>
          </div>

          <div>
            <img  src={aimage} />
          </div>
          
      </div>
    );
  }
}
