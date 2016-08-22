import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';

import { loadCasts,loadSlides, checkLastCastUpdate, loadEmptyMessages, deleteMessage } from '../actions';
import { Empty, Image } from './slides';
import { SelfBindingComponent, logError } from '../support';

import ReactCSSTransitionReplace from 'react-css-transition-replace';


// Note from josh:
//  I do a bit here outside of state. this is because a state update fires the render method
//  and I dont want to do that to cycle the images. As always open to suggestions of a
//  better way :)

class Play extends SelfBindingComponent {
  constructor(props) {
    super(props);

    // state
    this.state = {
      receiverName: props.params.cast,
      slideIndex: 0
    };

    // start up
    this.playSlideShow();
    this.checkForUpdate();
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
