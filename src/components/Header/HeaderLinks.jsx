import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Nav,
  NavDropdown,
  MenuItem,
} from "react-bootstrap";
import { logout, switchCompany } from '../../actions/user';

class HeaderLinks extends Component {
  handleSelect = (k) => {
    if (k === 2.2) {
      this.props.logout();
      return;
    }
    const words = k.split(".");
    if (words.length === 2 && words[0] === "1") {
      this.props.switchCompany(words[1]).then(
        (response) => {
          if (response.success) {
            window.location.reload();
          }
        }
      )
    }
  }

  getCurrentCompany = () => {
    const {company, companies} = this.props.user.user;
    
    if (companies.length === 0) {
      return "Chọn công ty";
    }
    const c = companies.find((c) => c.id === company);
    if (!c) {
      return "Chọn công ty";
    }
    return c.name;
  }

  render() {
    const companies = this.props.user.user.companies;
    const company = this.props.user.user.company;
    return (
      <div>
        <Nav pullRight onSelect={k => this.handleSelect(k)}>
          {companies.length > 0 &&
          <NavDropdown
            eventKey={1}
            title={
              <div>
                <i className="fa fa fa-database" />
                <p>
                  {this.getCurrentCompany()}
                  <b className="caret" />
                </p>
              </div>
            }
            noCaret
            id="basic-nav-dropdown-2"
          >
            {
            companies.map(c => {
              if (c.id !== company ){
                return <MenuItem key={c.id} eventKey={1 + "." + c.id}>{c.name}</MenuItem>
              } else {
                return <MenuItem key={c.id} eventKey={1 + "." + c.id} active disabled>{c.name}</MenuItem>
              }
            })
            }
          </NavDropdown>
          }
          <NavDropdown
            eventKey={2}
            title={
              <div>
                <i className="fa fa-gavel" />
                <p className="hidden-md hidden-lg">
                  Actions
                  <b className="caret" />
                </p>
              </div>
            }
            noCaret
            id="basic-nav-dropdown-1"
          >
            <MenuItem eventKey={2.1}>
              <i className="pe-7s-tools" /> Settings
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.2}>
              <div className="text-danger">
                <i className="pe-7s-close-circle" /> Log out
              </div>
            </MenuItem>
          </NavDropdown>
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    user: state.user
  }
);

const mapDispatchToProps = dispatch => (
  {
    logout: () => dispatch(logout()),
    switchCompany: (cid) => dispatch(switchCompany(cid))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLinks);
