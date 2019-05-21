import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  Table
} from "react-bootstrap";
import { FormattedDate, FormattedTime } from 'react-intl';
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import { adminGetUsers } from '../../../actions/user';

class UserList extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.props.getUsers(null).then(
      (response) => {
        if (response.success) {
          this.setState({
            users: response.result
          });
        }
      }
    );
  }

  editUser = (e, user) => {

  }

  deleteUser = (e, user) => {
    
  }

  renderActionButtons = (user) => (
    <div>
      <Button simple icon bsStyle="info" onClick={(e) => this.editUser(e, user)}>
          <i className="fa fa-edit" />
      </Button>
      <Button simple icon bsStyle="danger" onClick={(e) => this.deleteUser(e, user)}>
          <i className="fa fa-times" />
      </Button>
    </div>
  );

  render(){
    const users = this.state.users;
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <div className="row">
                <div className="col-md-11">
                  <form>
                    <FormGroup>
                      <FormControl type="text" placeholder="Tìm kiếm..." />
                    </FormGroup>
                  </form>
                </div>
                <div className="col-md-1">
                  <Button bsStyle="info" fill type="button" >Tìm</Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title=""
                content={
                  <div>
                    <Table responsive className="table-bigboy">
                      <thead>
                        <tr>
                          <th className="text-left">Tên</th>
                          <th className="text-left">Điện thoại</th>
                          <th className="text-left">Email</th>
                          <th className="text-left">Địa chỉ</th>
                          <th className="text-left">Trạng thái</th>
                          <th className="text-left">Ngày tạo</th>
                          <th className="text-left"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          users.map((c) => {
                            let status;
                            if (c.status === 0) {
                              status = <span className="label label-danger">Chưa kích hoạt</span>
                            } else {
                              status = <span className="label label-success">Hoạt động</span>
                            }
                            return (
                              <tr key={c.id}>
                                <td>{c.name}</td>
                                <td>{c.phone}</td>
                                <td>{c.email}</td>
                                <td>{c.address}</td>
                                <td align="center">{status}</td>
                                <td><FormattedDate value={c.created*1000} /> <FormattedTime value={c.created*1000} /></td>
                                <td>{this.renderActionButtons(c)}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </Table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => (
  {
    getUsers: (filter) => dispatch(adminGetUsers(filter))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(UserList);

