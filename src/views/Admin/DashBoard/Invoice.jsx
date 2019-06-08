import React, { Component } from "react";
import { connect } from 'react-redux';

import Button from "components/CustomButton/CustomButton.jsx";


import { adminGetCompanies } from '../../../actions/company';
import image1 from '../../../assets/img/Dashboard.PNG';
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
      <div>
      <img src={image1} alt="Logo" />
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

