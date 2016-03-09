import React, {Component} from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { Modal, Input, Button } from 'react-bootstrap';
import DropZone from 'react-dropzone';

import { loadSlides, updateSlide } from '../actions';
import { SelfBindingComponent, logError } from '../support';

class CastSlideDialog extends SelfBindingComponent {
  constructor(props) {
    super(props);

    this.state = {showModal: false};
  }

  open() {
    this.setState({showModal: true});
  }

  close() {
    this.setState({showModal: false});
    this.props.resetForm();
  }

  validateFile(fileInput, files) {
    // kind of minimal but it works for now
    const filename = files[0].name;
    const ext = filename.split('.')[1];

    switch (ext) {
      case "png":
      case "jpg":
      case "jpeg":
        fileInput.onChange(files[0]);
        break;

      default:
        alert('You can only drop a png or jpg right now');
        break;
    }
  }

  editSlide(slide) {
    this.props.fields._id.onChange(slide._id);
    this.props.fields.cast_id.onChange(slide.cast_id);
    this.props.fields.public_id.onChange(slide.public_id);

    this.props.fields.name.onChange(slide.name);
    this.props.fields.sort.onChange(slide.sort);

    this.open();
  }

  submit(form) {
    form.cast_id = this.props.cast._id;
    this.props.updateSlide(form).then(() => {
      this.props.loadSlides();

      this.close();
    }).catch(logError);
  }

  render() {
    const { handleSubmit, fields: { name, sort, file } } = this.props;

    this.props.setEditSlide(this.editSlide);

    return (
      <div>
        <Button onClick={this.open} bsStyle="primary">Add Slide</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add / Edit Slide</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form ref="form" onSubmit={handleSubmit(this.submit)}>
              <Input
                type="text"
                label="Name"
                {...name}
              />
              <Input
                type="text"
                label="Sort"
                {...sort}
              />
            </form>
            <DropZone onDrop={(f)=>this.validateFile(file,f)} className="file-input">
              <div>{file.value? "Image Ready" : "Drop png or jpg here"}</div>
            </DropZone>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Cancel</Button>
            <Button onClick={handleSubmit(this.submit)} bsStyle="success">Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default reduxForm({
  form: 'slide',
  fields: ['_id', 'cast_id', 'name', 'sort', 'file', 'public_id']
}, null, { loadSlides, updateSlide })(CastSlideDialog);
