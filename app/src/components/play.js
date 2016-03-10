import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import { loadCasts,loadSlides, checkLastCastUpdate, loadEmptyMessages, deleteMessage } from '../actions';
import { Empty, Image } from './slides';
import { SelfBindingComponent, DEBUG, CHROMECAST_APP_ID, logError } from '../support';

import ReactCSSTransitionReplace from 'react-css-transition-replace';
import CastAway from '../../vendor/castaway/cast-away';

// Note from josh:
//  I do a bit here outside of state. this is because a state update fires the render method
//  and I dont want to do that to cycle the images. As always open to suggestions of a
//  better way :)

class Play extends SelfBindingComponent {
  constructor(props) {
    super(props);

    // state
    this.state = {
      receiverName: '',
      slideIndex: 0
    };

    // start up
    this.connectToChromecast(DEBUG);
    this.playSlideShow();
    this.checkForUpdate();
    this.whoAmI();
  }

  // lifecycle
  componentWillMount() {
    this.loadData();
  }

  // logic methods
  loadData() {
    Promise.all([
      this.props.loadCasts(),
      this.props.loadSlides()
    ]).catch(logError);
  }

  connectToChromecast(localDebug) {
    // local debug is needed because there is no clean way to test if i am on a chromecast or not
    if (localDebug) {
      this.state.receiverName = 'Schwankcast';
    }
    else {
      const castAway = new window.CastAway();
      const receiver = castAway.receive();
    }
  }

  whoAmI() {
    loadEmptyMessages().then(({data}) => {
      if (data.length == 0) {
        setTimeout(this.whoAmI, 500);
        return;
      }

      const message = data[0];
      this.setState({
        receiverName: message.message
      });

      deleteMessage(message._id).catch(logError);
    }).catch(logError);
  }

  checkForUpdate() {
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

  playSlideShow() {
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
  }

  findCast() {
    var defaultCast = () => {
      return {
        delay: this.delay,
        default: true
      };
    };

    const cast = _.findWhere(this.props.casts, {name: this.state.receiverName});
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

  // render methods
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
