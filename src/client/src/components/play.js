import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import autobind from 'class-autobind';

import { loadChromecasts, loadSlides } from 'actions';

class Play extends Component {
  constructor(props) {
    super(props);
    autobind(this);
  }

  componentWillMount() {
    this.props.loadChromecasts();
    this.props.loadSlides();
  }

  render() {
    return (
      <div className="play">
        Hello World
      </div>
    );
  }
}

Play.propTypes = {
  loadChromecasts: PropTypes.func.isRequired,
  loadSlides: PropTypes.func.isRequired,
};

// connect
export default connect(
  ({ chromecasts, slides }) => ({ chromecasts, slides }),
  { loadChromecasts, loadSlides }
)(Play);
