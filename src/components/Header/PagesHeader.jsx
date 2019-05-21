import React, { Component } from "react";
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { logout } from '../../actions/user';

class PagesHeader extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      width: window.innerWidth
    };
  }

  // function that sets the class to active of the active page
  activeRoute(routeName) {
    return window.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  // function that shows/hides sidebar on responsive
  mobileSidebarToggle(e) {
    document.documentElement.classList.toggle("nav-open");
  }

  updateWidth() {
    this.setState({ width: window.innerWidth });
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWidth.bind(this));
  }

  handleSelect = (key) => {
    if (key === 1) {
      this.props.logout();
    }
  }

  render() {
    const isLogin = (this.props.user.uid > 0 && this.props.user.status === 0);
    return (
      <Navbar
        collapseOnSelect
        inverse
        className="navbar-primary navbar-transparent navbar-absolute"
      >
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to={"/dashboard"} className="nav-link">
              {this.state.width > 429
                ? "E-Invoice"
                : "E-Invoice"}
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        </Navbar.Header>
        {
        isLogin &&
        <Navbar.Collapse>
          <Nav pullRight onSelect={this.handleSelect}>
            <NavItem eventKey={1} href="#">
              Đăng xuất
            </NavItem>
          </Nav>
        </Navbar.Collapse>
        }
      </Navbar>
    );
  }
}

const mapStateToProps = state => (
  {
    user: state.user.user
  }
);

const mapDispatchToProps = dispatch => (
  {
    logout: () => dispatch(logout())
  }
);

const PagesHeaderContainer = connect(mapStateToProps, mapDispatchToProps)(PagesHeader);
export default PagesHeaderContainer;
