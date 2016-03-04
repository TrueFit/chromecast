import React, { Component } from 'react';

import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

import { Link } from 'react-router';

import { SelfBindingComponent } from '../sugar';


export class Menu extends SelfBindingComponent {
  constructor(props) {
    super(props);

    this.state = {open: false};
  }

  toggle() {
    this.update(!this.state.open);
  }

  open() {
    this.update(true);
  }

  close() {
    this.update(false);
  }

  update(open) {
    this.setState({open});
  }

  render() {
    return (
      <div>
        <AppBar
          title="Chromecast"
          onLeftIconButtonTouchTap={this.toggle}
        />
        <LeftNav
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={o=>this.update(o)}
        >
          <MenuItem>
            <Link to="config">Configure</Link>
          </MenuItem>
          <MenuItem>
            <Link to="launch">Launch</Link>
          </MenuItem>
          <MenuItem>
            <Link to="play">Play</Link>
          </MenuItem>
        </LeftNav>
      </div>
    );
  }
}
