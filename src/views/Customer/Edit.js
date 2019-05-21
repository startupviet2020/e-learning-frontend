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

import { updateCustomer } from '../../actions/customer';

class EditCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      customer: this.getEmptyCustomer()
    };
  }

  getEmptyCustomer = () => {
    return {
      id: 0,
      name: "",
      address: "",
      description: "",
      tax_code: ""
    };
  }

  showModal = (customer) => {
    if (customer === null) {
      customer = this.getEmptyCustomer();
    }
    this.setState({
      showModal: true,
      customer
    });
  }

  onCloseModal = () => {
    this.setState({ showModal: false });
  }

  onUpdate = () => {
    const customer = this.state.customer;
    this.props.updateCustomer(customer).then(
      (response) => {
        if (response.success) {
          this.setState({
            showModal: false
          });
          if (this.props.onCustomerUpdated) {
            customer.id = response.result;
            this.props.onCustomerUpdated(customer);
          }
        }
      }
    );
  }

  handleChange = (e) => {
    const customer = this.state.customer;
    customer[e.target.name] = e.target.value;
    this.setState(
      customer
    );
  }

  render() {
    const customer = this.state.customer;
    return (
      <Modal show={this.state.showModal} onHide={this.onCloseModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin khách hàng</Modal.Title>
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
                              <ControlLabel>Tên</ControlLabel><span className="star">*</span>
                              <FormControl className="validate-error" placeholder="Tên" maxLength="250" type="text" value={customer.name} name="name" onChange={this.handleChange} />
                            </FormGroup>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <FormGroup>
                              <ControlLabel>Địa chỉ</ControlLabel><span className="star">*</span>
                              <FormControl className="validate-error" placeholder="Địa chỉ" maxLength="250" type="text" value={customer.address} name="address" onChange={this.handleChange}/>
                            </FormGroup>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <FormGroup>
                              <ControlLabel>Mô tả</ControlLabel><span className="star">*</span>
                              <FormControl className="validate-error" placeholder="Mô tả" maxLength="250" type="text" value={customer.description} name="description" onChange={this.handleChange}/>
                            </FormGroup>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <FormGroup>
                              <ControlLabel>Mã số thuế</ControlLabel><span className="star">*</span>
                              <FormControl className="validate-error" placeholder="Mã số thuế" maxLength="50" type="text" value={customer.tax_code} name="tax_code" onChange={this.handleChange}/>
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
    updateCustomer: (data) => dispatch(updateCustomer(data))
  }
);

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(EditCustomer);

