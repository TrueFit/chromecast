import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import { loadCasts, loadSlides } from '../actions';
import { SelfBindingComponent, logError } from '../support';

import CastAway from '../../vendor/castaway/cast-away';

class Play extends SelfBindingComponent {
  constructor(props) {
    super(props);

    this.state = { src: null };

    const castAway = new window.CastAway();
    this.receiver = castAway.receive();

    // this.receiver = {
    //   friendlyName: "Schwankcast"
    // };
  }

  componentWillMount() {
    Promise.all([
      this.props.loadCasts(),
      this.props.loadSlides()
    ]).then(this.applySlides).catch(logError);
  }

  applySlides() {
    let delay = 15000;

    // if we have a receiver then restrict to that name
    let slides = null;
    if (this.receiver) {
      const cast = _.findWhere(this.props.casts, {name: this.receiver.friendlyName});
      if (cast) {
        slides = _.where(this.props.slides, { cast_id: cast._id });
        delay = cast.delay;
      }
    }

    if (!slides) {
      slides = this.props.slides;
    }

    slides = _.sortBy(slides, 'sort');

    // update logic
    const updateSlide = (index) => {
      if (slides.length == 0) {
        return;
      }

      this.setState({
        src: slides[index].file
      });
    };
    updateSlide(0);

    let i = 0;
    setInterval(() => {
      // define index
      i++;
      if (i >= slides.length) {
        i=0;
      }

      // update slide
      updateSlide(i);
    }, delay);
  }

  render() {
    return (
      <div style={{backgroundImage: `url(${this.state.src})`}} className="full-screen-image">
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    casts: state.casts,
    slides: state.slides
  };
};

export default connect(mapStateToProps, {loadCasts, loadSlides})(Play);
