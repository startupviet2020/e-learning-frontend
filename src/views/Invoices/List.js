import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  Table,
  ControlLabel
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDrivers: [],
      searchResults: {},
      phone: '',
      id: ''
    };
  }

  componentDidMount() {
    
  }

  loadData() {

  }

  render() {
    return (
      <div className="main-content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <div className="row">
                <form>
                  <div className="col-md-3">
                    <FormGroup>
                      <ControlLabel>Ngày HĐ</ControlLabel>
                      <FormControl type="text" placeholder="Ngày HĐ" />
                    </FormGroup>
                  </div>
                  <div className="col-md-3">
                    <FormGroup>
                      <ControlLabel>Số HĐ</ControlLabel>
                      <FormControl type="text" placeholder="Số HĐ" />
                    </FormGroup>
                  </div>
                  <div className="col-md-3">
                    <FormGroup>
                      <ControlLabel>Từ khoá</ControlLabel>
                      <FormControl type="text" placeholder="Từ khoá" />
                    </FormGroup>
                  </div>
                  <div className="col-md-2">
                    <FormGroup>
                      <ControlLabel>&nbsp;</ControlLabel>
                      <button className="btn btn-info btn-fill form-control">
                        <span className="btn-label">
                          <i className="fa fa-search" />
                        </span>
                        Tìm
                      </button>
                    </FormGroup>
                  </div>
                  <div className="col-md-1"></div>
                </form>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card
                title=""
                content={
                  <div>
                    <Link to="/invoices/edit" className="btn btn-info btn-fill">Thêm mới</Link>
                    <Table responsive className="table-bigboy">
                      <thead>
                        <tr>
                          <th className="text-left" style={{whiteSpace: "nowrap"}}>Số HĐ</th>
                          <th className="text-left" style={{whiteSpace: "nowrap"}}>Ngày HĐ</th>
                          <th className="text-left" style={{whiteSpace: "nowrap"}}>Mãu số</th>
                          <th className="text-left" style={{whiteSpace: "nowrap"}}>Ký hiệu</th>
                          <th className="text-left" style={{whiteSpace: "nowrap"}}>Hình thức TT</th>
                          <th className="text-left" style={{whiteSpace: "nowrap"}}>% thuế</th>
                          <th className="text-left" style={{whiteSpace: "nowrap"}}>Thuế</th>
                          <th className="text-left" style={{whiteSpace: "nowrap"}}>Tổng tiền</th>
                          <th className="text-left" style={{whiteSpace: "nowrap"}}>Người mua</th>
                          <th className="text-left" style={{whiteSpace: "nowrap"}}>Khách hàng</th>
                          <th className="text-left" style={{whiteSpace: "nowrap"}}>Ghi chú</th>
                          <th className="text-left" style={{whiteSpace: "nowrap"}}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          <tr>
                            <td>
                              <div>AB/01-KT</div>
                            </td>
                            <td>
                              <div>20/10/2018</div>
                            </td>
                            <td>
                              <div>GT01</div>
                            </td>
                            <td>
                              <div>HD01</div>
                            </td>
                            <td>
                              <div>Tiền mặt</div>
                            </td>
                            <td>
                              <div>5%</div>
                            </td>
                            <td>
                              <div>100.000</div>
                            </td>
                            <td>
                              <div>1.100.000</div>
                            </td>
                            <td>
                              <div>Nguyễn văn A</div>
                            </td>
                            <td>
                              <div>Nguyễn văn B</div>
                            </td>
                            <td>
                              <div>None</div>
                            </td>
                            <td>
                              <div>
                                <Button simple icon bsStyle="info">
                                    <i className="fa fa-edit" />
                                </Button>
                                <Button simple icon bsStyle="danger">
                                    <i className="fa fa-times" />
                                </Button>
                              </div>
                            </td>
                          </tr>
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
};

const mapStateToProps = null;
const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);

