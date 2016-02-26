
import React, {Component} from 'react';
import { connect } from 'react-redux';
import CastAway from '../../vendor/castaway/cast-away';

class Play extends Component {
  constructor(props) {
    super(props);

    const castAway = new window.CastAway();
    this.receiver = castAway.receive();

    this.state = {
      src: "https://unsplash.it/1920/1080"
    };

    let i = 0;
    setInterval(() => {
      this.setState({
        src: "https://unsplash.it/1920/1080?random&" + i
      });

      i++;
    }, 5000)
  }

  render() {
    return (
      <div>
        <img src={this.state.src} />
      </div>
    );
  }
}

export default connect()(Play);
