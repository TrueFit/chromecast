import React, {Component} from 'react';
import { connect } from 'react-redux';

import { Menu } from '../components/';

class Config extends Component {
  render() {
    return (
      <div>
        <Menu />

        
      </div>
    );
  }
}

export default connect()(Config);
