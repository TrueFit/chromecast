// import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import autobind from 'class-autobind';
import Notifications, { notify } from 'react-notify-toast';

import { loadCasts, launchCast } from 'actions';

class Launch extends Component {
  constructor(props) {
    super(props);

    autobind(this);
  }

  componentWillMount() {
    this.props.loadCasts();
  }

  launchCast(cast) {
    this.props.launchCast(cast).then(() => {
      notify.show(`${cast.name} launched!`, 'success', 2000);
    });
  }

  renderCast(cast) {
    return (
      <li key={cast.name}>
        {cast.name}
        <Button bsStyle="primary" onClick={this.launchCast.bind(this, cast)}>Launch</Button>
      </li>
    );
  }

  render() {
    return (
      <div className="launch">
        <Notifications />

        <Row>
          <Col xs={12}>
            <ul>
              {this.props.casts.map(c => this.renderCast(c))}
            </ul>
          </Col>
        </Row>
      </div>
    );
  }
}

Launch.propTypes = {
  casts: PropTypes.array.isRequired,
  loadCasts: PropTypes.func.isRequired,
  launchCast: PropTypes.func.isRequired,
};

export default connect(
  ({ casts }) => ({ casts }),
  { loadCasts, launchCast }
)(Launch);
