import React, {Component} from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import DropZone from 'react-dropzone';

import { SelfBindingComponent } from '../sugar';
import { updateSlide } from '../actions';
import { logError } from '../suppport';

class CastSlideDialog extends SelfBindingComponent {
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

  // editCast(cast) {
  //   this.props.fields._id.onChange(cast._id);
  //   this.props.fields.name.onChange(cast.name);
  //
  //   this.open();
  // }

  submit(form) {
    this.props.fields.cast_id.onChange(this.props.cast._id);
    this.props.updateSlide(form).then(() => {
      this.close();
    }).catch(logError);
  }

  render() {
    const { handleSubmit, fields: { cast_id, name, file } } = this.props;

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

    // this.props.setEditCast(this.editCast);

    return (
      <div>
        <RaisedButton label="Add Slide" primary={true} onTouchTap={this.open} />

        <Dialog
          title="Add / Edit Slide"
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
            <DropZone onDrop={(f)=>this.validateFile(file,f)} className="file-input">
              <div>{file.value? "Image Ready" : "Drop png or jpg here"}</div>
            </DropZone>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default reduxForm({
  form: 'slide',
  fields: ['_id', 'cast_id', 'name', 'file']
}, null, { updateSlide })(CastSlideDialog);
