
import React, {Component} from 'react';
import { connect } from 'react-redux';
import CastAway from '../../vendor/castaway/cast-away';

class Play extends Component {
  constructor(props) {
    super(props);

    const castAway = new window.CastAway();
    this.receiver = castAway.receive();

    this.state = {
      src: "http://randomimage.setgetgo.com/get.php?key=0&height=1080&width=1920"
    };

    let i = 1;
    setInterval(() => {
      this.setState({
        src: `http://randomimage.setgetgo.com/get.php?key=${i}&height=1080&width=1920`
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
