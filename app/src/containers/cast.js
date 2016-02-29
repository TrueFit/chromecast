import React, {Component} from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { SelfBindingComponent } from '../sugar';
import { updateCast, loadCasts } from '../actions';
import { logError } from '../suppport';

import Modal from 'boron/FadeModal';

class Cast extends SelfBindingComponent {
  show() {
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  submit(form) {
    this.props.updateCast(form).then(() => {
      this.props.loadCasts();
    }).catch(logError);
  }

  render() {
    this.props.show(this.show);

    const { handleSubmit, fields: { name } } = this.props;

    return (
      <Modal ref={m=>this.modal=m} className="cast-modal">
        <form onSubmit={handleSubmit(this.submit)}>
          <div className="modal-header">
            <h3>Add / Edit Cast</h3>
          </div>
          <div className="modal-body">
            <label>
              Name
              <input type="text" {...name} />
            </label>
          </div>
          <div className="modal-footer grid-block align-justify">
            <button className="success button" type="submit" onClick={this.hide}>Save</button>
            <button className="alert button" type="button" onClick={this.hide}>Cancel</button>
          </div>
        </form>
      </Modal>
    );
  }
}

export default reduxForm({
  form: 'cast',
  fields: ['name']
}, null, { updateCast, loadCasts })(Cast);
