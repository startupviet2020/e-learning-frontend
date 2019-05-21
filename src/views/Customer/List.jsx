import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  Table
} from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import EditCustomer from './Edit';
import ImportCustomer from './Import';

import { getCustomers, updateCustomer, deleteCustomer } from '../../actions/customer';

class CustomerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      confirmDialog: null
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.props.getCustomers(null).then(
      (response) => {
        if (response.success) {
          this.setState({
            customers: response.result
          });
        }
      }
    );
  }

  editCustomer = (e, customer) => {
    e.preventDefault();
    this.editDialog.getWrappedInstance().showModal(customer);
  }

  onCustomerUpdated = (customer) => {
    let isNew = true;
    const customers = this.state.customers.map(
      (c) => {
        if (c.id !== customer.id) {
          return c;
        }
        isNew = false;
        return customer;
      }
    );
    if (isNew){
      customers.push(customer);
    }
    this.setState({
      customers
    });
  }

  deleteCustomer = (e, customer) => {
    e.preventDefault();
    const confirmDialog = (
      <SweetAlert
          style={{ display: "block"}}
          title={<small>Bạn chắc chắn xoá khách hàng:</small>}
          onConfirm={() => this.onConfirmDeleteCustomer(customer)}
          onCancel={() => this.setState({confirmDialog: null})}
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="info"
          confirmBtnText="Xoá"
          cancelBtnText="Đóng"
          showCancel
        >
        <strong>{customer.name}</strong>
    </SweetAlert>
    );
    this.setState({confirmDialog});
  }

  onConfirmDeleteCustomer = (customer) => {
    this.setState({confirmDialog: null});
    this.props.deleteCustomer(customer.id).then(
      (response) => {
        if (response.success){
          const customers = this.state.customers.filter(
            c => c.id !== customer.id
          );
          this.setState({customers});
        }
      }
    );
  }

  importCustomer = () => {
    this.importDialog.getWrappedInstance().showModal();
  }

  renderActionButtons = (customer) => (
    <div>
      <Button simple icon bsStyle="info" onClick={(e) => this.editCustomer(e, customer)}>
          <i className="fa fa-edit" />
      </Button>
      <Button simple icon bsStyle="danger" onClick={(e) => this.deleteCustomer(e, customer)}>
          <i className="fa fa-times" />
      </Button>
    </div>
  );
    
  render() {
    const customers = this.state.customers;
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
                    <div className="btn-toolbar" role="toolbar">
                      <div className="btn-group mr-2" role="group">
                        <Button bsStyle="info" fill onClick={(e) => this.editCustomer(e, null)}>Thêm mới</Button>
                      </div>
                      <div className="btn-group mr-2" role="group">
                        <Button bsStyle="info" fill onClick={this.importCustomer}>Import</Button>
                      </div>
                    </div>
                    <hr></hr>
                    <Table responsive className="table-bigboy">
                      <thead>
                        <tr>
                          <th className="text-left">Tên khách hàng</th>
                          <th className="text-left">Địa chỉ</th>
                          <th className="text-left hide-on-mobile">Mô tả</th>
                          <th className="text-left hide-on-mobile">Mã số thuế</th>
                          <th className="text-left hide-on-mobile"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          customers.map((c) => (
                            <tr key={c.id}>
                              <td>{c.name}</td>
                              <td>{c.address}</td>
                              <td>{c.description}</td>
                              <td>{c.tax_code}</td>
                              <td>{this.renderActionButtons(c)}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </Table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
        <EditCustomer ref={(el) => { this.editDialog = el; }} onCustomerUpdated={this.onCustomerUpdated} />
        <ImportCustomer ref={(el) => { this.importDialog = el; }} />
        {this.state.confirmDialog}
      </div>
    );
  }
};

const mapStateToProps = null;
const mapDispatchToProps = dispatch => (
  {
    getCustomers: (filter) => dispatch(getCustomers(filter)),
    updateCustomer: (data) => dispatch(updateCustomer(data)),
    deleteCustomer: (id) => dispatch(deleteCustomer(id))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);

