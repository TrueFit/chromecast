import React, {Component} from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

import { SelfBindingComponent } from '../sugar';
import { loadCasts, deleteCast } from '../actions';
import CastDialog from './cast_dialog';
import CastSlideList from './cast_slide_list';

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

  renderCastRow(cast) {
    return (
      <tr key={cast._id} className="cast-row">
        <td>{cast.name}</td>
        <td>
          <FlatButton label="Edit" secondary={true} onTouchTap={() => this.edit(cast)} />
        </td>
        <td>
          <FlatButton label="Delete" secondary={true} onTouchTap={() => this.delete(cast)} />
        </td>
      </tr>
    );
  }

  renderCasts() {
    let rows = [];
    for (let cast of this.props.casts) {
      rows = [
        ...rows,
        this.renderCastRow(cast),
        <CastSlideList key={`slides_${cast._id}`} cast={cast} />
      ];
    }

    return rows;
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="twelve columns">
            <table className="u-full-width">
              <thead>
                <tr>
                  <th>Cast</th>
                  <th className="small-column"></th>
                  <th className="small-column">
                    <div className="u-pull-right">
                      <CastDialog setEditCast={(m)=>this.showEditDialog=m} />
                    </div>
                  </th>
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
