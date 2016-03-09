import React, {Component} from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { Modal, Button, Input } from 'react-bootstrap';

import { updateCast, loadCasts } from '../actions';
import { SelfBindingComponent, logError } from '../support';

class CastDialog extends SelfBindingComponent {
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

  editCast(cast) {
    this.props.fields._id.onChange(cast._id);
    this.props.fields.name.onChange(cast.name);
    this.props.fields.delay.onChange(cast.delay);

    this.open();
  }

  submit(form) {
    this.props.updateCast(form).then(() => {
      this.props.loadCasts();
      this.close();
    }).catch(logError);
  }

  render() {
    const { handleSubmit, fields: { name, delay } } = this.props;

    this.props.setEditCast(this.editCast);

    return (
      <div>
        <Button onClick={this.open} bsStyle="primary">Add Cast</Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add / Edit Cast</Modal.Title>
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
                label="Delay"
                {...delay}
              />
            </form>
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
  form: 'cast',
  fields: ['_id', 'name', 'delay']
}, null, { updateCast, loadCasts })(CastDialog);
