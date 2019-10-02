import React from 'react';
import './App.css';
// import PouchDB from 'pouchdb';
import { HashRouter as Router } from 'react-router-dom';
import NavBar from './containers/navbar';
import RoutingComponent from './Routing';
import './containers/navbar/navbar.css';

export class App extends React.Component {
  render() {
    return (
      <div
        style={{
          height: '100vh',
          backgroundColor: '#f2f2f2',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Router>
          <NavBar />
          <div
            className="marginNavbar"
            style={{ position: 'absolute', height: '100%', width: '100%' }}
          >
            <RoutingComponent />
          </div>
        </Router>
      </div>
    );
  }
}
