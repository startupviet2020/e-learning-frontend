import React, { Component } from "react";
import { connect } from 'react-redux';

import Button from "components/CustomButton/CustomButton.jsx";


import { adminGetCompanies } from '../../../actions/company';

class Invoice extends Component {
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
       <div className="container-fluid page__container">
        <h1 className="h2">Dashboard</h1>
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header d-flex align-items-center">
                <div className="flex">
                  <h4 className="card-title">Earnings</h4>
                  <p className="card-subtitle">Last 7 Days</p>
                </div>
                <a href="instructor-earnings.html" className="btn btn-sm btn-primary"><i className="material-icons">trending_up</i></a>
              </div>
              <div className="card-body">
                <div className="chart" style={{height: '200px'}}>
                  <canvas id="earningsChart" className="chart-canvas" />
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header d-flex align-items-center">
                <div className="flex">
                  <h4 className="card-title">Transactions</h4>
                  <p className="card-subtitle">Latest Transactions</p>
                </div>
                <a href="instructor-statement.html" className="btn btn-sm btn-primary"><i className="material-icons">receipt</i></a>
              </div>
              <div data-toggle="lists" data-lists-values="[
            &quot;js-lists-values-course&quot;, 
            &quot;js-lists-values-document&quot;,
            &quot;js-lists-values-amount&quot;,
            &quot;js-lists-values-date&quot;
          ]" data-lists-sort-by="js-lists-values-date" data-lists-sort-desc="true" className="table-responsive">
                <table className="table table-nowrap m-0">
                  <thead className="thead-light">
                    <tr>
                      <th colSpan={2}>
                        <a href="javascript:void(0)" className="sort" data-sort="js-lists-values-course">Course</a>
                        <a href="javascript:void(0)" className="sort" data-sort="js-lists-values-document">Document</a>
                        <a href="javascript:void(0)" className="sort" data-sort="js-lists-values-amount">Amount</a>
                        <a href="javascript:void(0)" className="sort" data-sort="js-lists-values-date">Date</a>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="list">
                    <tr>
                      <td>
                        <div className="media align-items-center">
                          <a href="instructor-course-edit.html" className="avatar avatar-4by3 avatar-sm mr-3">
                            <img src="assets/images/vuejs.png" alt="course" className="avatar-img rounded" />
                          </a>
                          <div className="media-body">
                            <a className="text-body js-lists-values-course" href="instructor-course-edit.html"><strong>Angular Routing In-Depth</strong></a><br />
                            <small className="text-muted mr-1">
                              Invoice
                              <a href="instructor-invoice.html" style={{color: 'inherit'}} className="js-lists-values-document">#8734</a> -
                              $<span className="js-lists-values-amount">89</span> USD
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <small className="text-muted text-uppercase js-lists-values-date">12 Nov 2018</small>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="media align-items-center">
                          <a href="instructor-course-edit.html" className="avatar avatar-4by3 avatar-sm mr-3">
                            <img src="assets/images/vuejs.png" alt="course" className="avatar-img rounded" />
                          </a>
                          <div className="media-body">
                            <a className="text-body js-lists-values-course" href="instructor-course-edit.html"><strong>Angular Unit Testing</strong></a><br />
                            <small className="text-muted mr-1">
                              Invoice
                              <a href="instructor-invoice.html" style={{color: 'inherit'}} className="js-lists-values-document">#8735</a> -
                              $<span className="js-lists-values-amount">89</span> USD
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <small className="text-muted text-uppercase js-lists-values-date">13 Nov 2018</small>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="media align-items-center">
                          <a href="instructor-course-edit.html" className="avatar avatar-4by3 avatar-sm mr-3">
                            <img src="assets/images/github.png" alt="course" className="avatar-img rounded" />
                          </a>
                          <div className="media-body">
                            <a className="text-body js-lists-values-course" href="instructor-course-edit.html"><strong>Introduction to TypeScript</strong></a><br />
                            <small className="text-muted mr-1">
                              Invoice
                              <a href="instructor-invoice.html" style={{color: 'inherit'}} className="js-lists-values-document">#8736</a> -
                              $<span className="js-lists-values-amount">89</span> USD
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <small className="text-muted text-uppercase js-lists-values-date">14 Nov 2018</small>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="media align-items-center">
                          <a href="instructor-course-edit.html" className="avatar avatar-4by3 avatar-sm mr-3">
                            <img src="assets/images/gulp.png" alt="course" className="avatar-img rounded" />
                          </a>
                          <div className="media-body">
                            <a className="text-body js-lists-values-course" href="instructor-course-edit.html"><strong>Learn Angular Fundamentals</strong></a><br />
                            <small className="text-muted mr-1">
                              Invoice
                              <a href="instructor-invoice.html" style={{color: 'inherit'}} className="js-lists-values-document">#8737</a> -
                              $<span className="js-lists-values-amount">89</span> USD
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <small className="text-muted text-uppercase js-lists-values-date">15 Nov 2018</small>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header d-flex align-items-center">
                <div className="flex">
                  <h4 className="card-title">Sales today</h4>
                  <p className="card-subtitle">by course</p>
                </div>
                <a className="btn btn-sm btn-primary" href="instructor-earnings.html">Earnings</a>
              </div>
              <ul className="list-group list-group-fit mb-0">
                <li className="list-group-item">
                  <div className="media align-items-center">
                    <div className="media-body">
                      <a href="instructor-course-edit.html" className="text-body"><strong>Basics of HTML</strong></a>
                    </div>
                    <div className="media-right">
                      <div className="text-center">
                        <span className="badge badge-pill badge-primary">15</span>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="media align-items-center">
                    <div className="media-body">
                      <a href="instructor-course-edit.html" className="text-body"><strong>Angular in Steps</strong></a>
                    </div>
                    <div className="media-right">
                      <div className="text-center">
                        <span className="badge badge-pill badge-success">50</span>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="media align-items-center">
                    <div className="media-body">
                      <a href="instructor-course-edit.html" className="text-body"><strong>Bootstrap Foundations</strong></a>
                    </div>
                    <div className="media-right">
                      <div className="text-center">
                        <span className="badge badge-pill badge-warning">14</span>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="media align-items-center">
                    <div className="media-body">
                      <a href="instructor-course-edit.html" className="text-body"><strong>GitHub Basics</strong></a>
                    </div>
                    <div className="media-right">
                      <div className="text-center">
                        <span className="badge badge-pill  badge-danger ">14</span>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="card">
              <div className="card-header d-flex align-items-center">
                <div className="flex">
                  <h4 className="card-title">Comments</h4>
                  <p className="card-subtitle">Latest comments</p>
                </div>
                <div className="text-right" style={{minWidth: '80px'}}>
                  <a href="#" className="btn btn-outline-primary btn-sm"><i className="material-icons">keyboard_arrow_left</i></a>
                  <a href="#" className="btn btn-outline-primary btn-sm"><i className="material-icons">keyboard_arrow_right</i></a>
                </div>
              </div>
              <div className="card-body">
                <div className="media">
                  <div className="media-left">
                    <a href="#" className="avatar avatar-sm">
                      <img src="assets/images/people/110/guy-9.jpg" alt="Guy" className="avatar-img rounded-circle" />
                    </a>
                  </div>
                  <div className="media-body d-flex flex-column">
                    <div className="d-flex align-items-center">
                      <a href="instructor-profile.html" className="text-body"><strong>Laza Bogdan</strong></a>
                      <small className="ml-auto text-muted">27 min ago</small><br />
                    </div>
                    <span className="text-muted">on <a href="instructor-course-edit.html" className="text-black-50" style={{textDecoration: 'underline'}}>Data Visualization With Chart.js</a></span>
                    <p className="mt-1 mb-0 text-black-70">How can I load Charts on a page?</p>
                  </div>
                </div>
                <div className="media ml-sm-32pt mt-3 border rounded p-3 bg-light">
                  <div className="media-left">
                    <a href="#" className="avatar avatar-sm">
                      <img src="assets/images/people/110/guy-6.jpg" alt="Guy" className="avatar-img rounded-circle" />
                    </a>
                  </div>
                  <div className="media-body">
                    <div className="d-flex align-items-center">
                      <a href="instructor-profile.html" className="text-body"><strong>FrontendMatter</strong></a>
                      <small className="ml-auto text-muted">just now</small>
                    </div>
                    <p className="mt-1 mb-0 text-black-70">Hi Bogdan,<br /> Thank you for purchasing our course! <br /><br />Please have a look at the charts library documentation <a href="#">here</a> and follow the instructions.</p>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <form action="#" id="message-reply">
                  <div className="input-group input-group-merge">
                    <input type="text" className="form-control form-control-appended" required placeholder="Quick Reply" />
                    <div className="input-group-append">
                      <div className="input-group-text pr-2">
                        <button className="btn btn-flush" type="button"><i className="material-icons">tag_faces</i></button>
                      </div>
                      <div className="input-group-text pl-0">
                        <div className="custom-file custom-file-naked d-flex" style={{width: '24px', overflow: 'hidden'}}>
                          <input type="file" className="custom-file-input" id="customFile" />
                          <label className="custom-file-label" style={{color: 'inherit'}} htmlFor="customFile">
                            <i className="material-icons">attach_file</i>
                          </label>
                        </div>
                      </div>
                      <div className="input-group-text pl-0">
                        <button className="btn btn-flush" type="button"><i className="material-icons">send</i></button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);

