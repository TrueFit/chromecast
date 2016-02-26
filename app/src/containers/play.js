
import React, {Component} from 'react';
import { connect } from 'react-redux';

import CastAway from '../../vendor/castaway/cast-away';

class Play extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: ["Hello There"]
    };

    const castAway = new window.CastAway();
    const receiver = castAway.receive();

    console.log("receiver", receiver);

    receiver.on('displayMessage', (data) => {
      console.log("message received", data);

      this.setState({
        messages: [ ...this.state.messages, data.message ]
      })
    });
  }

  renderMessages(messages) {
    return messages.map((message) => {
      return (
        <div key={message}>
          {message}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderMessages(this.state.messages)}
      </div>
    );
  }
}

export default connect()(Play);
