
import React, {Component} from 'react';
import { connect } from 'react-redux';

class Play extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img src="http://loremflickr.com/1920/1080" />
      </div>
    );
  }
}

export default connect()(Play);
