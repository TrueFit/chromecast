import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import { loadCasts, loadSlides } from '../actions';
import { SelfBindingComponent, logError } from '../support';

import ReactCSSTransitionReplace from 'react-css-transition-replace';
import CastAway from '../../vendor/castaway/cast-away';

class Play extends SelfBindingComponent {
  constructor(props) {
    super(props);

    const castAway = new window.CastAway();
    this.receiver = castAway.receive();

    // this.receiver = {
    //   friendlyName: "Schwankcast"
    // };

    this.state = {
      slideIndex: 0
    };

    this.delay = 15000;

    setInterval(() => {
      const index = this.state.slideIndex + 1;
      this.setState({
        slideIndex: index >= this.slides.length ? 0 : index
      });
    }, this.delay);
  }

  componentWillMount() {
    Promise.all([
      this.props.loadCasts(),
      this.props.loadSlides()
    ]).catch(logError);
  }

  findCast() {
    var defaultCast = () => {
      return this.cast = {
        delay: this.delay,
        default: true
      };
    };

    if (!this.receiver) {
      return defaultCast();
    }

    const cast = _.findWhere(this.props.casts, {name: this.receiver.friendlyName});
    return cast ? cast : defaultCast;
  }

  filterSlides(cast) {
    var slides;
    if (cast.default) {
      slides = this.props.slides;
    }
    else {
      slides = _.where(this.props.slides, { cast_id: cast._id });
    }

    // sort
    return _.sortBy(slides, 'sort');
  }

  renderSlide(slide) {
    if (!slide) {
      return (
        <div key="0"></div>
      );
    }

    return (
      <div key={slide._id} style={{backgroundImage: `url(${slide.file})`}} className="full-screen-image">
      </div>
    );
  }

  render() {
    const cast = this.findCast();

    this.delay = cast.delay;
    this.slides = this.filterSlides(cast);

    const slide = this.slides.length > 0 ? this.slides[this.state.slideIndex] : null;

    return (
      <ReactCSSTransitionReplace transitionName="cross-fade" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
        {this.renderSlide(slide)}
      </ReactCSSTransitionReplace>
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
