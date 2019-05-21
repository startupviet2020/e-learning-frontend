import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import vi from 'react-intl/locale-data/vi';
import configureStore from './store/configureStore';
import Auth from "./utils/auth";
import { verifyAuth } from './actions/user';
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.1.1";
import "./assets/css/main.css";
import "./assets/css/pe-icon-7-stroke.css";
import 'react-table/react-table.css'

addLocaleData(vi);

const preloadedState = { 
    user: {
      loggedIn: Auth.isAuth(),
      user: {
        uid: "",
        name: "",
        avatar: null,
        status: -1,
        company: 0,
        companies: []
      }
    }
  };
const store = configureStore(preloadedState);

const render = () => {
  ReactDOM.render(
    <IntlProvider locale="vi">
      <Provider store={store}>
        <App/>
      </Provider>
    </IntlProvider>,
    document.getElementById("root")
  );  
}

if (Auth.isAuth()){
  store.dispatch(verifyAuth()).then(
    () => {
      render();
    }
  )
} else {
  render();
}

