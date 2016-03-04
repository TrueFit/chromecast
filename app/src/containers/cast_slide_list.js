import React, {Component} from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

import { SelfBindingComponent } from '../sugar';
import CastSlideDialog from './cast_slide_dialog';
// import { loadCasts, deleteCast } from '../actions';

class CastSlideList extends SelfBindingComponent {
  componentWillMount() {
    // this.props.loadCasts();
  }

  edit(cast) {
    // this.showEditDialog(cast);
  }

  delete(cast) {
    // this.props.deleteCast(cast._id).then(() => {
    //   this.props.loadCasts();
    // });
  }

  render() {
    return (
      <tr>
        <td colSpan="3">
          <div className="u-pull-right">
            <CastSlideDialog cast={this.props.cast} />
          </div>
        </td>
      </tr>
    );
  }
}

export default connect(null, { })(CastSlideList);
