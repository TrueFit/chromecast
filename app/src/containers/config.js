import React, {Component} from 'react';
import { connect } from 'react-redux';

import { SelfBindingComponent } from '../sugar';
import { Menu } from '../components/';
import CastList from './cast_list';

class Config extends SelfBindingComponent {
  render() {
    return (
      <div>
        <Menu name="Configuration" />
        <div className="spacer" />

        <CastList />
      </div>
    );
  }
}

export default connect()(Config);
