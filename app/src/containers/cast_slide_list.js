import React, {Component} from 'react';
import { connect } from 'react-redux';

import _ from 'underscore';

import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

import { SelfBindingComponent } from '../sugar';
import CastSlideDialog from './cast_slide_dialog';
import { loadSlides, deleteSlide } from '../actions';
import { ROOT_URL } from '../suppport';

class CastSlideList extends SelfBindingComponent {
  componentWillMount() {
    this.props.loadSlides();
  }

  edit(slide) {
    this.showEditDialog(slide);
  }

  delete(slide) {
    this.props.deleteSlide(slide._id).then(() => {
      this.props.loadSlides();
    });
  }

  renderSlides() {
    return _.where(this.props.slides, { cast_id: this.props.cast._id }).map((slide) => {
      return (
        <tr key={slide._id} className="slide-row">
          <td>
            {slide.name}
          </td>
          <td>
            {slide.sort}
          </td>
          <td>
            <img className="image-preview" src={`${ROOT_URL}/images/${slide.file}`} />
          </td>
          <td>
            <FlatButton label="Edit" secondary={true} onTouchTap={() => this.edit(slide)} />
          </td>
          <td>
            <FlatButton label="Delete" secondary={true} onTouchTap={() => this.delete(slide)} />
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <tr>
        <td colSpan="4">
          <table className="u-full-width slide-table">
            <thead>
              <tr>
                <th>Slide</th>
                <th>Sort</th>
                <th>Image</th>
                <th className="small-column"></th>
                <th className="small-column">
                  <CastSlideDialog cast={this.props.cast} setEditSlide={(d)=>this.showEditDialog = d} />
                </th>
              </tr>
            </thead>
            <tbody>
              {this.renderSlides()}
            </tbody>
          </table>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    slides: state.slides
  };
};

export default connect(mapStateToProps, { loadSlides, deleteSlide })(CastSlideList);
