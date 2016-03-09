import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Table, Button, Grid, Row, Col } from 'react-bootstrap';

import { SelfBindingComponent } from '../support';
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
      <tr key={cast._id}>
        <td>{cast.name}</td>
        <td>{cast.delay}</td>
        <td>
          <Button onClick={() => this.edit(cast)}>Edit</Button>
        </td>
        <td>
          <Button onClick={() => this.delete(cast)} bsStyle="danger">Delete</Button>
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
      <Grid>
        <Row>
          <Col xs={12}>
            <Table>
              <thead>
                <tr>
                  <th>Cast</th>
                  <th>Delay</th>
                  <th className="small-column"></th>
                  <th className="small-column">
                    <CastDialog setEditCast={(m)=>this.showEditDialog=m} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.renderCasts()}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    casts: state.casts
  };
};

export default connect(mapStateToProps, { loadCasts, deleteCast })(CastList);
