import React, {Component} from 'react';
import { connect } from 'react-redux';

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
        <div key={cast._id}>
          {cast.name}
        </div>
      );
    })
  }

  render() {
    const addCastTrigger = (<button className="button" onClick={()=>this.tiggerCast()}>Add Cast</button>);

    return (
      <div>
        <Menu />
        <Cast show={(m) => this.tiggerCast = m} />

        <div className="spacer" />

        <div className="vertical grid-block">
          <div className="grid-block align-right">
            {addCastTrigger}
          </div>
          <div className="grid-block">
            <div className="grid-block">
              { this.renderCasts() }
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
  }
};

export default connect(mapStateToProps, { loadCasts })(Config);
