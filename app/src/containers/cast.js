import React, {Component} from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';

import { SelfBindingComponent } from '../sugar';
import { updateCast, loadCasts } from '../actions';
import { logError } from '../suppport';

class Cast extends SelfBindingComponent {
  constructor(props) {
    super(props);

    this.state = {open: false};
  }

  open() {
    this.setState({open: true});
  }

  close() {
    this.setState({open: false});
    this.props.resetForm();
  }

  submit(form) {
    this.props.updateCast(form).then(() => {
      this.props.loadCasts();
      this.close();
    }).catch(logError);
  }

  render() {
    this.props.open(this.open);

    const { handleSubmit, fields: { name } } = this.props;

    const actions = [
      <FlatButton
        key="Cancel"
        label="Cancel"
        secondary={true}
        onTouchTap={this.close}
      />,
      <FlatButton
        key="Submit"
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={handleSubmit(this.submit)}
      />
    ];

    return (
      <div>
        <Dialog
          title="Add / Edit Cast"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.hide}
        >
          <form ref="form" onSubmit={handleSubmit(this.submit)}>
            <label>
              <TextField
               hintText="Name"
               floatingLabelText="Name"
               {...name}
             />
            </label>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default reduxForm({
  form: 'cast',
  fields: ['name']
}, null, { updateCast, loadCasts })(Cast);
