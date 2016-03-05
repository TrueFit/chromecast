import React, {Component} from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import { SelfBindingComponent } from '../sugar';
import { updateCast, loadCasts } from '../actions';
import { logError } from '../suppport';

class CastDialog extends SelfBindingComponent {
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

    this.props.setEditCast(this.editCast);

    return (
      <div>
        <RaisedButton label="Add Cast" primary={true} onTouchTap={this.open} />

        <Dialog
          title="Add / Edit Cast"
          actions={actions}
          modal={false}
          contentStyle={{width:310}}
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
            <label>
              <TextField
               hintText="Delay"
               floatingLabelText="Delay"
               {...delay}
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
  fields: ['_id', 'name', 'delay']
}, null, { updateCast, loadCasts })(CastDialog);
