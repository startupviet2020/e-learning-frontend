import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Modal
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import { adminUpdateCompany } from "../../../actions/company";

class EditCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      company: this.getEmptyCompany()
    };
  }

  getEmptyCompany = () => {
    return {
      id: 0,
      name: "",
      email: "",
      phone: "",
      address: "",
      created: 0
    };
  }

  showModal = (company) => {
    if (company === null) {
      company = this.getEmptyCompany();
    }
    this.setState({
      showModal: true,
      company
    });
  }

  onCloseModal = () => {
    this.setState({ showModal: false });
  }

  onUpdate = () => {
    const company = this.state.company;
    this.props.updateCompany(company).then(
      (response) => {
        if (response.success) {
          this.setState({
            showModal: false
          });
          if (this.props.onCompanyUpdated) {
            this.props.onCompanyUpdated(response.result);
          }
        }
      }
    );
  }

  handleChange = (e) => {
    const company = this.state.company;
    company[e.target.name] = e.target.value;
    this.setState(
      company
    );
  }

  render() {
    const company = this.state.company;
    return (
      <Modal show={this.state.showModal} onHide={this.onCloseModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin công ty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  content={
                    <div>
                      <form>
                        <div className="row">
                          <div className="col-md-12">
                            <FormGroup>
                              <ControlLabel>Tên công ty</ControlLabel><span className="star">*</span>
                              <FormControl className="validate-error" placeholder="Tên công ty" maxLength="250" type="text" value={company.name} name="name" onChange={this.handleChange} />
                            </FormGroup>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <FormGroup>
                              <ControlLabel>Địa chỉ</ControlLabel><span className="star">*</span>
                              <FormControl className="validate-error" placeholder="Địa chỉ" maxLength="250" type="text" value={company.address} name="address" onChange={this.handleChange}/>
                            </FormGroup>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <FormGroup>
                              <ControlLabel>Điện thoại</ControlLabel><span className="star">*</span>
                              <FormControl className="validate-error" placeholder="Điện thoại" maxLength="250" type="text" value={company.phone} name="phone" onChange={this.handleChange}/>
                            </FormGroup>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <FormGroup>
                              <ControlLabel>Email</ControlLabel><span className="star">*</span>
                              <FormControl className="validate-error" placeholder="Email" maxLength="50" type="text" value={company.email} name="email" onChange={this.handleChange}/>
                            </FormGroup>
                          </div>
                        </div>
                        <div className="clearfix" />
                      </form>
                    </div>
                  }
                />
              </Col>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
            <Button bsStyle="info" fill type="button" onClick={this.onUpdate}>Cập nhật</Button>&nbsp;
            <Button bsStyle="info" fill type="button" onClick={this.onCloseModal}>Đóng</Button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => (
  {
    updateCompany: (data) => dispatch(adminUpdateCompany(data))
  }
);

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(EditCompany);

