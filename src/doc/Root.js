import React, {Component} from 'react';
import {Router} from 'react-router-dom';
import routes from './Routes';
import history from './history';

const Loading = () => <div>Loading...</div>;

export default class Root extends Component {

  render() {
    return (
      <Router history={history}>
        {routes}
      </Router>
    );
  }

}
