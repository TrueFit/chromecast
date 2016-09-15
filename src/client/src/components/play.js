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
    this.load().then(() => {
      setTimeout(this.step, 0);
      setInterval(this.load, 60 * 1000);
    });
  }

  // load
  load() {
    return Promise.all([
      this.props.loadChromecasts(),
      this.props.loadSlides(),
    ]);
  }

  // filters
  buildData() {
    const { params: { castName }, chromecasts, slides } = this.props;
    const cast = _.find(chromecasts, c => c.name === castName);
    const slideList = (cast && cast.slides) ?
      cast.slides.map(sId => _.find(slides, s => s._id === sId)) : [];

    return {
      name: castName,
      cast,
      slides: slideList,
    };
  }

  // timer
  step() {
    const { cast, slides } = this.buildData();

    let next = this.state.index += 1;
    if (this.state.index >= slides.length) {
      next = 0;
    }

    this.setState({ index: next });

    setTimeout(this.step, cast['transition time'] * 1000);
  }

  // render
  renderInstructions(instructions) {
    return (
      <div>
        {instructions}
      </div>
    );
  }

  renderSlide(slide, index) {
    if (!slide) {
      return null;
    }

    const className = index === this.state.index ? 'shown' : 'hidden';
    return (
      <img
        key={slide._id}
        src={apiUrl(slide.image)}
        alt={slide.name}
        className={className}
      />
    );
  }

  render() {
    const data = this.buildData();

    if (!data.name) {
      return this.renderInstructions('Please go to /play/castname to start the show.');
    }

    if (!data.cast) {
      return this.renderInstructions(`Cast with name ${data.name} not found.`);
    }

    return (
      <div className="play">
        {data.slides.map((s, index) => this.renderSlide(s, index))}
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
