import React, {Component} from 'react';
import { connect } from 'react-redux';

import { Menu } from '../components';
import { connectToCast, configureCast } from '../actions';
import { logError } from '../suppport';

// class
class Launch extends Component {
  componentWillMount() {
    this.props.connectToCast().then(() => {
      const cast = this.props.castSender;
      if (cast.session) {
        this.props.configureCast(cast.session).catch(logError);
      }
      else {
        logError(cast.connectionError);
      }
    }).catch(logError);
  }

  render() {
    return (
      <div>
        <Menu />
        <div className="grid-frame">
          <h1 className="align-center grid-block">
            {this.props.castState}
          </h1>
        </div>
      </div>
    );
  }
}

// map
const mapStateToProps = (state) => {
  return {
    castState: state.castState,
    castSender: state.castSender
  };
};

export default connect(mapStateToProps, { connectToCast, configureCast })(Launch);
