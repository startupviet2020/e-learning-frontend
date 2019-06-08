import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Select from 'react-select';
import Upload from "components/Upload.jsx";

import { getActiveCompany, updateCompany } from "../../actions/user";

class UpdateCompanyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {
        name: "",
        address: "",
        tax_code: "",
        phone: "",
        fax: "",
        email: "",
        managing_unit: "",
        currency_unit: "",
        bank_account: "",
        bank_name: "",
        bank_branch: "",
        chief_accountant: "",
        director: "",
        invoice_type: 0,
        logo: ""
      }
    };
  }

  componentDidMount() {
    this.props.getActiveCompany().then(
      (response) => {
        if (response.success) {
          this.setState({
            company: response.result
          });
        }
      }
    )
  }

  updateCompany = () => {
    this.props.updateCompany(this.state.company).then(
      (response) => {

      }
    )  
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
      <div className="main-content">
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
                            <ControlLabel>Tên đề thi</ControlLabel><span className="star">*</span>
                            <FormControl className="validate-error" placeholder="Tên đề thi" maxLength="100" type="text" value={company.name} name="name" onChange={this.handleChange}/>
                          </FormGroup>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <FormGroup>
                            <ControlLabel>Số câu level 1</ControlLabel><span className="star">*</span>
                            <FormControl className="validate-error" placeholder="Số câu level 1" maxLength="100" type="text" value={company.managing_unit} name="managing_unit" onChange={this.handleChange} />
                          </FormGroup>
                        </div>
                        <div className="col-md-4">
                          <FormGroup>
                            <ControlLabel>Số câu level 2</ControlLabel><span className="star">*</span>
                            <FormControl className="validate-error" placeholder="Số câu level 2" maxLength="250" type="text" value={company.address} name="address" onChange={this.handleChange}/>
                          </FormGroup>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <FormGroup>
                            <ControlLabel>Số câu level 3</ControlLabel><span className="star">*</span>
                            <FormControl className="validate-error" placeholder="Số câu level 3" maxLength="20" type="text" value={company.tax_code} name="tax_code" onChange={this.handleChange}/>
                          </FormGroup>
                        </div>
                        <div className="col-md-4">
                          <FormGroup>
                            <ControlLabel>Số câu level 4</ControlLabel><span className="star">*</span>
                            <FormControl className="validate-error" placeholder="Số câu level 4" maxLength="20" type="text" value={company.tax_code} name="tax_code" onChange={this.handleChange}/>
                          </FormGroup>
                        </div>
                        <div className="col-md-4">
                          <FormGroup>
                            <ControlLabel>Thời gian làm bài</ControlLabel>
                            <FormControl className="validate-error" placeholder="Thời gian làm bài" maxLength="4" type="text" value={company.currency_unit} name="currency_unit" onChange={this.handleChange}/>
                          </FormGroup>
                        </div>
                        {/* <div className="col-md-4">
                          <FormGroup>
                            <ControlLabel>Loại câu hỏi</ControlLabel><span className="star">*</span>
                            <Select
                              placeholder={`Chọn loại hoá đơn`}
                              value={1}
                              options={[{ value: 1, label: "Hoá đơn điện tử" }, { value: 2, label: "Hoá đơn đặt in" }, { value: 3, label: "Hoá đơn tự in" }]}
                              className={"validate-error"}
                            />
                          </FormGroup>
                        </div> */}
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <FormGroup>
                            <ControlLabel>Từ tuần</ControlLabel><span className="star">*</span>
                            <FormControl className="validate-error" placeholder="Từ tuần" maxLength="50" type="text" value={company.phone} name="phone" onChange={this.handleChange}/>
                          </FormGroup>
                        </div>
                        <div className="col-md-4">
                          <FormGroup>
                            <ControlLabel>Đến tuần</ControlLabel><span className="star">*</span>
                            <FormControl className="validate-error" placeholder="Đến tuần" maxLength="50" type="text" value={company.phone} name="phone" onChange={this.handleChange}/>
                          </FormGroup>
                        </div>
                        {/* <div className="col-md-4">
                          <FormGroup>
                            <ControlLabel>Fax</ControlLabel>
                            <FormControl className="validate-error" placeholder="Fax" maxLength="50" type="text" value={company.fax} name="fax" onChange={this.handleChange}/>
                          </FormGroup>
                        </div>
                        <div className="col-md-4">
                          <FormGroup>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl className="validate-error" placeholder="Email" maxLength="50" type="text" value={company.email} name="email" onChange={this.handleChange}/>
                          </FormGroup>
                        </div> */}
                      </div>
                      {/* <div className="row">
                        <div className="col-md-4">
                          <FormGroup>
                            <ControlLabel>Tài khoản ngân hàng</ControlLabel>
                            <FormControl className="validate-error" placeholder="Tài khoản ngân hàng" maxLength="50" type="text" value={company.bank_account} name="bank_account" onChange={this.handleChange}/>
                          </FormGroup>
                        </div>
                        <div className="col-md-4">
                          <FormGroup>
                            <ControlLabel>Tại ngân hàng</ControlLabel>
                            <FormControl className="validate-error" placeholder="Tại ngân hàng" maxLength="50" type="text" value={company.bank_name} name="bank_name" onChange={this.handleChange}/>
                          </FormGroup>
                        </div>
                        <div className="col-md-4">
                          <FormGroup>
                            <ControlLabel>Chi nhánh ngân hàng</ControlLabel>
                            <FormControl className="validate-error" placeholder="Chi nhánh ngân hàng" maxLength="50" type="text" value={company.bank_branch} name="bank_branch" onChange={this.handleChange}/>
                          </FormGroup>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <FormGroup>
                            <ControlLabel>Kế toán trưởng</ControlLabel>
                            <FormControl className="validate-error" placeholder="Kế toán trưởng" maxLength="50" type="text" value={company.chief_accountant} name="chief_accountant" onChange={this.handleChange}/>
                          </FormGroup>
                        </div>
                        <div className="col-md-6">
                          <FormGroup>
                            <ControlLabel>Giám Đốc</ControlLabel>
                            <FormControl className="validate-error" placeholder="Giám Đốc" maxLength="50" type="text" value={company.director} name="director" onChange={this.handleChange}/>
                          </FormGroup>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <FormGroup>
                            <ControlLabel>Logo</ControlLabel>
                            <Upload />
                          </FormGroup>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <Button bsStyle="info" pullRight fill type="button" onClick={this.updateCompany}>Cập nhật</Button>
                        </div>
                      </div> */}
                      <div className="clearfix" />
                    </form>
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
    getActiveCompany: () => dispatch(getActiveCompany()),
    updateCompany: (data) => dispatch(updateCompany(data))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCompanyInfo);

