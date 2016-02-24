// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {Component} from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
        <h1>
          Hello World
        </h1>
    );
  }
}

export default connect()(App);
