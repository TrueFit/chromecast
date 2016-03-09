import React, {Component} from 'react';
import { connect } from 'react-redux';

import _ from 'underscore';

import { Table, Button } from 'react-bootstrap';

import { loadSlides, deleteSlide } from '../actions';
import { SelfBindingComponent, ROOT_URL } from '../support';

import CastSlideDialog from './cast_slide_dialog';

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
            <Button onClick={() => this.edit(slide)}>Edit</Button>
          </td>
          <td>
            <Button onClick={() => this.delete(slide)} bsStyle="danger">Delete</Button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <tr>
        <td colSpan="4">
          <Table>
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
          </Table>
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
