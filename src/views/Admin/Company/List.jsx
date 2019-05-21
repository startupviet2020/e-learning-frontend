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
import EditCompany from './Edit';

import { adminGetCompanies } from '../../../actions/company';

class CompanyList extends Component {
  constructor(props){
    super(props);
    this.state = {
      companies: []
    };
  }

  componentDidMount() {
    this.props.getCompanies(null).then(
      (response) => {
        if (response.success) {
          this.setState({
            companies: response.result
          });
        }
      }
    );
  }

  editCompany = (e, company) => {
    e.preventDefault();
    this.editDialog.getWrappedInstance().showModal(company);
  }

  deleteCompany = (e, company) => {
    
  }

  onCompanyUpdated = (company) => {
    let isNew = true;
    const companies = this.state.companies.map(
      (c) => {
        if (c.id !== company.id) {
          return c;
        }
        isNew = false;
        return company;
      }
    );
    if (isNew){
      companies.push(company);
    }
    this.setState({
      companies
    });
  }

  renderActionButtons = (company) => (
    <div>
      <Button simple icon bsStyle="info" onClick={(e) => this.editCompany(e, company)}>
          <i className="fa fa-edit" />
      </Button>
      <Button simple icon bsStyle="danger" onClick={(e) => this.deleteCompany(e, company)}>
          <i className="fa fa-times" />
      </Button>
    </div>
  );

  render(){
    const companies = this.state.companies;
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
                        <Button bsStyle="info" fill onClick={(e) => this.editCompany(e, null)}>Thêm mới</Button>
                      </div>
                    </div>
                    <hr></hr>
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
                          companies.map((c) => {
                            let status;
                            if (c.status === 0) {
                              status = <span className="label label-danger">Không hoạt động</span>
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
        <EditCompany ref={(el) => { this.editDialog = el; }} onCompanyUpdated={this.onCompanyUpdated} />
      </div>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => (
  {
    getCompanies: (filter) => dispatch(adminGetCompanies(filter))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(CompanyList);

