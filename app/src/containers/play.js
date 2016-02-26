
import React, {Component} from 'react';
import { connect } from 'react-redux';

class Play extends Component {
  constructor(props) {
    super(props);

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
