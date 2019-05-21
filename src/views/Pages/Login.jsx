import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
  Button
} from "react-bootstrap";

import config from '../../configuration';
import {accountkitAuth} from '../../actions/user';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHidden: true
    };
  }

  componentDidMount() {
    setTimeout(
      function() {
        this.setState({ cardHidden: false });
      }.bind(this),
      700
    );
    this.loadSdkAsynchronously();
  }

  initializeAccountKit = () => {
    window.AccountKit.init(
      {
        appId: config.facebookAppID,
        version: config.accountkitVersion,
        state: 'dummy_state',
        fbAppEventsEnabled: true,
        display: 'modal'
      }
    );
  }

  loadSdkAsynchronously() {
    const id = 'facebook-accountkit-sdk';
    if (document.getElementById(id)){
      return;
    }
    const element = document.getElementsByTagName('script')[0];
    const js = document.createElement('script');
    js.id = id;
    js.src = `https://sdk.accountkit.com/en_US/sdk.js`;
    element.parentNode.insertBefore(js, element);
    window.AccountKit_OnInteractive = this.initializeAccountKit;
  }

  loginCallback = (res) => {
    if (res.status === 'NOT_AUTHENTICATED' || res.status === 'BAD_PARAMS') {
      return;
    }
    this.props.accountkitAuth(res.code).then(
      (response) => {
        
      }
    );
  }

  loginWithSMS = () => {  
    window.AccountKit.login("PHONE",{}, res => this.loginCallback(res));
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={4} sm={6} mdOffset={4} smOffset={3}>
            <form>
              <Button bsStyle="info" type="button" onClick={this.loginWithSMS}>Login with SMS</Button>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => (
  {
    accountkitAuth: code => dispatch(accountkitAuth(code))
  }
);

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export default LoginContainer;
