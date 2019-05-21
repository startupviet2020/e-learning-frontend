import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import AsyncSelect from 'react-select/lib/Async';
import Select from 'react-select';
import Datetime from "react-datetime";
import InvoiceDetail from "./Detail";
import { getCustomers } from '../../actions/customer';

class EditInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoice: this.getEmptyInvoice(),
      ready: false
    };
    this.customerData = [];
    this.defaultCustomerOptions = []
  }

  componentDidMount() {
    this.loadCustomers("").then(
      (data) => {
        this.customerData = data.rawData;
        this.defaultCustomerOptions = data.options;
        this.setState({
          ready: true
        });
      }
    );
  }

  getEmptyInvoice = () => {
    return {
      id: 0,
      invoiceNumber: "",
      invoiceDate: new Date(),
      invoiceForm: "",
      invoiceSign: "",
      paymentType: 1,
      customerId: 0,
      customerBuyer: "",
      customerTaxCode: "",
      customerAddress: "",
      tax: 0,
      taxAmount: 0,
      preTax: 0,
      total: 0,
      note: "",
      printNote: false
    };
  }

  loadCustomerOptions = (input, cb) => {
    this.loadCustomers(input).then(
      (data) => {
        this.customerData = data.rawData;
        cb(data.options);
      }
    );
  }

  loadCustomers = async (input, cb) => {
    const filter = {s: ""};
    if (input) {
      filter.s = input;
    }
    const response = await this.props.getCustomers(filter);
    if (response.success) {
      const options = response.result.map(c => (
        {
          value: c.id,
          label: c.name
        }
      ));
      return {
        options: options,
        rawData: response.result
      };
    }
    return {
      options: [],
      rawData: []
    };
  }

  onCustomerChange = (item, action) => {
    const customer = this.customerData.find(c => c.id === item.value);
    if (customer) {
      this.setState({
        invoice: {
          ...this.state.invoice,
          customerId: customer.id,
          customerTaxCode: customer.tax_code,
          customerAddress: customer.address 
        }  
      });
    }
  }

  onPaymentTypeChange = (item, action) => {
    this.setState({
      invoice: {
        ...this.state.invoice,
        paymentType: item.value
      }
    });
  }

  onInputChange = (e) => {
    this.setState({ 
      invoice: {
        ...this.state.invoice,
        [e.target.name]: e.target.value 
      }
    });
  }

  onInvoiceDateChange = (d) => {
    this.setState({
      invoice: {
        ...this.state.invoice,
        invoiceDate: d
      }
    });
  }

  render() {
    if (!this.state.ready) {
      return null;
    }
    const invoice = this.state.invoice;
    const paymentOptions = [{ value: 1, label: "Tiền mặt" }, { value: 2, label: "Chuyển khoản" }];
    const paymentType = paymentOptions[invoice.paymentType - 1];

    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                category={
                  <React.Fragment>
                    <span className="pull-left">
                      <Link to="/invoices"><i className="fa fa-angle-left" />Quay lại</Link>
                    </span>
                    <span className="pull-right">
                      <Button bsStyle="info" fill type="button" >Cập nhật</Button>
                    </span>
                    <span className="clearfix" />
                  </React.Fragment>
                }
                content={
                  <div>
                    <form>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-2">
                              <FormGroup>
                                <ControlLabel>Số hoá đơn</ControlLabel><span className="star">*</span>
                                <FormControl className="validate-error" placeholder="Số hoá đơn" maxLength="50" type="text" bsSize="sm" value={invoice.invoiceNumber} onChange={this.onInputChange} name="invoiceNumber"/>
                              </FormGroup>
                            </div>
                            <div className="col-md-2">
                              <FormGroup>
                                <ControlLabel>Ngày hoá đơn</ControlLabel> <span className="star">*</span>
                                <Datetime
                                  timeFormat={false}
                                  dateFormat="DD/MM/YYYY"
                                  inputProps={{ placeholder: "Ngày hoá đơn", disabled: false }}
                                  closeOnSelect
                                  inputProps={{className: "form-control input-sm"}}
                                  value={invoice.invoiceDate}
                                  onChange={this.onInvoiceDateChange}
                                />
                              </FormGroup>
                            </div>
                            <div className="col-md-2">
                              <FormGroup>
                                <ControlLabel>Mẫu số hoá đơn</ControlLabel><span className="star">*</span>
                                <FormControl className="validate-error" placeholder="Mẫu số hoá đơn" maxLength="250" type="text" bsSize="sm" value={invoice.invoiceForm} onChange={this.onInputChange} name="invoiceForm"/>
                              </FormGroup>
                            </div>
                            <div className="col-md-3">
                              <FormGroup>
                                <ControlLabel>Ký hiệu hoá đơn</ControlLabel><span className="star">*</span>
                                <FormControl className="validate-error" placeholder="Ký hiệu hoá đơn" maxLength="250" type="text" bsSize="sm" value={invoice.invoiceSign} onChange={this.onInputChange} name="invoiceSign"/>
                              </FormGroup>
                            </div>
                            <div className="col-md-3">
                              <FormGroup>
                                <ControlLabel>Hình thức thanh toán</ControlLabel><span className="star">*</span>
                                <Select
                                  placeholder={`Hình thức thanh toán`}
                                  defaultValue={paymentType}
                                  options={paymentOptions}
                                  styles={{ control: (base, _state) => ({...base, minHeight: '30px', height: '30px'})}}
                                  isSearchable={false}
                                  onChange={this.onPaymentTypeChange}
                                />
                              </FormGroup>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-3">
                              <FormGroup>
                                <ControlLabel>Người mua hàng</ControlLabel><span className="star">*</span>
                                <FormControl className="validate-error" placeholder="Người mua hàng" maxLength="250" type="text" bsSize="sm" value={invoice.customerBuyer} onChange={this.onInputChange} name="customerBuyer"/>
                              </FormGroup>
                            </div>
                            <div className="col-md-3">
                              <FormGroup>
                                <ControlLabel>Khách hàng</ControlLabel><span className="star">*</span>
                                <AsyncSelect
                                  placeholder={`Khách hàng`}
                                  cacheOptions
                                  loadOptions={this.loadCustomerOptions}
                                  defaultOptions={this.defaultCustomerOptions}
                                  styles={{ control: (base, _state) => ({...base, minHeight: '30px', height: '30px'})}}
                                  onChange={this.onCustomerChange}
                                />
                              </FormGroup>
                            </div>
                            <div className="col-md-3">
                              <FormGroup>
                                <ControlLabel>Mã số thuế</ControlLabel><span className="star">*</span>
                                <FormControl className="validate-error" placeholder="Mã số thuế" maxLength="50" type="text" bsSize="sm" value={invoice.customerTaxCode} onChange={this.onInputChange} name="customerTaxCode"/>
                              </FormGroup>
                            </div>
                            <div className="col-md-3">
                              <FormGroup>
                                <ControlLabel>Địa chỉ</ControlLabel><span className="star">*</span>
                                <FormControl className="validate-error" placeholder="Địa chỉ" maxLength="250" type="text" bsSize="sm" value={invoice.customerAddress} onChange={this.onInputChange} name="customerAddress"/>
                              </FormGroup>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-3">
                              <FormGroup>
                                <ControlLabel>% thuế</ControlLabel><span className="star">*</span>
                                <FormControl className="validate-error" placeholder="% thuế" maxLength="20" type="text" bsSize="sm" value={invoice.tax} onChange={this.onInputChange} name="tax"/>
                              </FormGroup>
                            </div>
                            <div className="col-md-3">
                              <FormGroup>
                                <ControlLabel>Tiền thuế</ControlLabel><span className="star">*</span>
                                <FormControl className="validate-error" placeholder="Tiền thuế" maxLength="20" type="text" bsSize="sm" />
                              </FormGroup>
                            </div>
                            <div className="col-md-3">
                              <FormGroup>
                                <ControlLabel>Tổng tiền</ControlLabel><span className="star">*</span>
                                <FormControl className="validate-error" placeholder="Tổng tiền" maxLength="20" type="text" bsSize="sm"/>
                              </FormGroup>
                            </div>
                            <div className="col-md-3">
                              <FormGroup>
                                <ControlLabel>Tổng cộng</ControlLabel><span className="star">*</span>
                                <FormControl className="validate-error" placeholder="Tổng cộng" maxLength="20" type="text" bsSize="sm"/>
                              </FormGroup>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-10">
                              <FormGroup>
                                <ControlLabel>Ghi chú</ControlLabel>
                                <FormControl className="validate-error" placeholder="Ghi chú" maxLength="250" type="text" bsSize="sm" value={invoice.note} onChange={this.onInputChange} name="note" />
                              </FormGroup>
                            </div>
                            <div className="col-md-2">
                              <FormGroup>
                                <ControlLabel>In ghi chú</ControlLabel>
                                <FormControl className="validate-error" placeholder="Ghi chú" maxLength="250" type="checkbox" bsSize="sm"/>
                              </FormGroup>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="clearfix" />
                    </form>
                  </div>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                  content={
                    <InvoiceDetail />
                  }>
              </Card>
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
    getCustomers: (filter) => dispatch(getCustomers(filter))
  }
);

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(EditInvoice);

