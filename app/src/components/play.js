import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import { loadCasts,loadSlides, checkLastCastUpdate } from '../actions';
import { Empty, Image } from './slides';
import { SelfBindingComponent, logError } from '../support';

import ReactCSSTransitionReplace from 'react-css-transition-replace';
import CastAway from '../../vendor/castaway/cast-away';

class Play extends SelfBindingComponent {
  constructor(props) {
    super(props);

    // setup chromecast
    // const castAway = new window.CastAway();
    // this.receiver = castAway.receive();

    this.receiver = {
      friendlyName: "Schwankcast"
    };

    this.state = {
      slideIndex: 0
    };

    // handle slide show (we use timeout so the delay can change)
    this.delay = 15000;
    const changeSlide = () => {
      if (this.slides) {
        const index = this.state.slideIndex + 1;
        this.setState({
          slideIndex: index >= this.slides.length ? 0 : index
        });
      }

      setTimeout(changeSlide, this.delay);
    };
    changeSlide();

    // handle updates
    setInterval(() => {
      if (!this.cast || !this.cast._id) {
        return;
      }

      checkLastCastUpdate(this.cast._id).then(({data}) => {
        if (data.update > this.cast.update) {
          this.loadData();
        }
      });
    }, 5000);
  }

  componentWillMount() {
    this.loadData();
  }

  loadData() {
    Promise.all([
      this.props.loadCasts(),
      this.props.loadSlides()
    ]).catch(logError);
  }

  findCast() {
    var defaultCast = () => {
      return {
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
      return <Empty />;
    }

    return <Image slide={slide} />;
  }

  render() {
    this.cast = this.findCast();
    this.delay = this.cast.delay;
    this.slides = this.filterSlides(this.cast);

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
