import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import autobind from 'class-autobind';

import { loadChromecasts, loadSlides } from 'actions';
import { apiUrl } from 'support';

class Play extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      index: 0,
    };
  }

  componentWillMount() {
    this.props.loadChromecasts();
    this.props.loadSlides();
  }

  renderInstructions(instructions) {
    return (
      <div>
        {instructions}
      </div>
    );
  }

  renderSlide(slide) {
    if (!slide) {
      return null;
    }

    return <img key={slide._id} src={apiUrl(slide.image)} alt={slide.name} />;
  }

  render() {
    const { params: { castName }, chromecasts, slides } = this.props;

    if (!castName) {
      return this.renderInstructions('Please go to /play/castname to start the show.');
    }

    const cast = _.find(chromecasts, c => c.name === castName);
    if (!cast) {
      return this.renderInstructions(`Cast with name ${castName} not found.`);
    }

    const slideList = cast.slides.map(sId => _.find(slides, s => s._id === sId));
    return (
      <div className="play">
        {slideList.map(s => this.renderSlide(s))}
      </div>
    );
  }
}

Play.propTypes = {
  params: PropTypes.object,

  chromecasts: PropTypes.array.isRequired,
  slides: PropTypes.array.isRequired,

  loadChromecasts: PropTypes.func.isRequired,
  loadSlides: PropTypes.func.isRequired,
};

// connect
export default connect(
  ({ chromecasts, slides }) => ({ chromecasts, slides }),
  { loadChromecasts, loadSlides }
)(Play);
