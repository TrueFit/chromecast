import React, {Component} from 'react';
import { connect } from 'react-redux';

import { SelfBindingComponent } from '../support';
import Menu from './menu';
import CastList from './cast_list';

class Config extends SelfBindingComponent {
  render() {
    return (
      <div>
        <Menu />
        <CastList />
      </div>
    );
  }
}

export default connect()(Config);
