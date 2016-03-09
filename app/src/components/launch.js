import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';

import Menu from './menu';
import { connectToCast, configureCast } from '../actions';
import { logError } from '../support';

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
        <Grid>
          <Row>
            <Col xs={12}>
              <h1>
                {this.props.castState}
              </h1>
            </Col>
          </Row>
        </Grid>
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
