import React, {Component} from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button';

import { SelfBindingComponent } from '../sugar';
import { Menu } from '../components/';
import Cast from './cast';

import { loadCasts } from '../actions';

class Config extends SelfBindingComponent {
  componentWillMount() {
    this.props.loadCasts();
  }

  renderCasts() {
    return this.props.casts.map((cast) => {
      return (
        <tr key={cast._id}>
          <td>{cast.name}</td>
          <td>Edit</td>
          <td>Delete</td>
        </tr>
      );
    });
  }

  render() {
    const addCastTrigger = (
      <RaisedButton label="Add Cast" primary={true} onTouchTap={this.triggerCast} />
    );

    return (
      <div>
        <Menu />
        <Cast open={(m) => this.triggerCast = m} />

        <div className="container">
          <div className="spacer" />
          <div className="row">
            <div className="twelve columns">
              {addCastTrigger}
            </div>
          </div>
          <div className="row">
            <div className="twelve columns">
              <table className="u-full-width">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderCasts()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    casts: state.casts
  };
};

export default connect(mapStateToProps, { loadCasts })(Config);
