import React, { Component } from "react";
import { connect } from 'react-redux';
import { Grid, Row, Col, FormControl, FormGroup, ControlLabel, Alert } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import { getUserProfile, updateUserProfile } from '../../actions/user';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      name: "",
      email: "",
      address: "",
      updated: false
    };
  }

  componentDidMount() {
    this.props.getUserProfile().then(
      result => {
        if (result.success) {
          const profile = result.result;
          this.setState({
            phone: profile.phone,
            name: profile.name ? profile.name : "",
            email: profile.email ? profile.email : "",
            address: profile.address ? profile.address : ""
          });
        }
      }
    );
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  updateProfile = () => {
    this.setState({
      updated: false
    });
    this.props.updateUserProfile(this.state).then(
      (result) => {
        console.log(result);
        if (result.success){
          this.setState({
            updated: true
          });
        }
      }
    );
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={5} mdOffset={4} smOffset={3}>
            <div className="header-text">
              <h4>ĐĂNG KÝ SỬ DỤNG HỆ THỐNG HOÁ ĐƠN ĐIÊN TỬ</h4>
              <hr />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={5} mdOffset={4} smOffset={3}>
            <form>
              <Card
                plain
                content={
                  <div>
                    {this.state.updated && 
                    <Alert bsStyle="info">
                      <span>
                        Cám ơn quý khách đã đăng ký sử dụng hệ thống, thông tin đã được cập nhật và chúng tôi sẽ liên hệ lại sau
                      </span>
                    </Alert>
                    }
                    <FormGroup>
                      <ControlLabel>Số điện thoại</ControlLabel><span className="star">*</span>
                      <FormControl type="text" placeholder="Số điện thoại" value={this.state.phone} name="phone" disabled />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Họ tên</ControlLabel><span className="star">*</span>
                      <FormControl type="text" placeholder="Họ tên" value={this.state.name} name="name" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Email</ControlLabel><span className="star">*</span>
                      <FormControl type="email" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Địa chỉ</ControlLabel><span className="star">*</span>
                      <FormControl type="text" placeholder="Địa chỉ" value={this.state.address} name="address" onChange={this.handleChange} />
                    </FormGroup>
                  </div>
                }
                ftTextCenter
                legend={
                  <Button wd fill neutral onClick={this.updateProfile} disabled={this.state.updated}>
                    Cập nhật
                  </Button>
                }
              />
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => (
  {
    getUserProfile: () => dispatch(getUserProfile()),
    updateUserProfile: (data) => dispatch(updateUserProfile(data))
  }
);

const SignupContainer = connect(mapStateToProps, mapDispatchToProps)(Signup);
export default SignupContainer;

