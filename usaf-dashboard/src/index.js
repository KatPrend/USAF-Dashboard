import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Open extends React.Component {

  render() {
    return (
      <body>
        <img src={require('./AirForce.jpg')} alt="Air Force logo" width="280" height="250" />
        <h1>Welcome to the USAF Project Management Dashbaord</h1>
        <ul>
            <li><button className="button">Login</button></li>
            <li><button className="button">Create Account</button></li>
        </ul>
      </body>
    );
  }
}

ReactDOM.render(
  <Open />,
  document.getElementById('root')
);
