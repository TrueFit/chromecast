import React, {Component} from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';

import CastAway from '../../vendor/castaway/cast-away';

class Config extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    }

    const castAway = new window.CastAway({
      applicationID: 'AE07EA05'
    });

    this.session = null;
    castAway.on('receivers:available', () => {
      castAway.requestSession((err, s) => {
        if (err) {
          console.log(err);
          return;
        }

        this.session = s;
      });
    });

    castAway.initialize((err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log("initialized", data);
    });
  }

  sendMessage() {
    if (!this.session) {
      console.log("no session");
      return;
    }

    this.session.send('displayMessage', { message: this.state.message }, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      this.setState({
        messages: ""
      });

      console.log("message sent", data);
    });
  }

  onTextChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  render() {
    return (
      <div>
        <Link to="play">Test</Link>
        <br /><br />
        <h1>Put Messages on Your TV!</h1>
        <input type="text" value={this.state.message} onChange={this.onTextChange.bind(this)} />
        <button onClick={this.sendMessage.bind(this)}>Send</button>
      </div>
    );
  }
}

export default connect()(Config);
