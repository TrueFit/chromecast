import React, {Component} from 'react';
import { connect } from 'react-redux';

import FlatButton from 'material-ui/lib/flat-button';

import { SelfBindingComponent } from '../sugar';
import CastDialog from './cast_dialog';
import { loadCasts, deleteCast } from '../actions';

class CastList extends SelfBindingComponent {
  componentWillMount() {
    this.props.loadCasts();
  }

  edit(cast) {
    this.showEditDialog(cast);
  }

  delete(cast) {
    this.props.deleteCast(cast._id).then(() => {
      this.props.loadCasts();
    });
  }

  renderCasts() {
    return this.props.casts.map((cast) => {
      return (
        <tr key={cast._id}>
          <td>
          </td>
          <td>{cast.name}</td>
          <td>
            <FlatButton label="Edit" secondary={true} onTouchTap={() => this.edit(cast)} />
          </td>
          <td>
            <FlatButton label="Delete" secondary={true} onTouchTap={() => this.delete(cast)} />
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="twelve columns">
            <div className="u-pull-right">
              <CastDialog setEditCast={(m)=>this.showEditDialog=m} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="twelve columns">
            <table className="u-full-width">
              <thead>
                <tr>
                  <th className="small-column"></th>
                  <th>Name</th>
                  <th className="small-column"></th>
                  <th className="small-column"></th>
                </tr>
              </thead>
              <tbody>
                {this.renderCasts()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    casts: state.casts
  };
};

export default connect(mapStateToProps, { loadCasts, deleteCast })(CastList);
