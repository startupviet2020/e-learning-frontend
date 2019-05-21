import React, { Component } from "react";
import Footer from "components/Footer/Footer.jsx";
import PagesHeader from "components/Header/PagesHeader.jsx";

import pagesRoutes from "routes/pages.jsx";

import bgImage from "assets/img/full-screen-image-3.jpg";

class Pages extends Component {
  getPageClass() {
    if (this.props.defaultPath) {
      return " register-page";
    }
    return " login-page";
  }

  componentWillMount() {
    if (document.documentElement.className.indexOf("nav-open") !== -1) {
      document.documentElement.classList.toggle("nav-open");
    }
  }
  
  render() {
    let Page = null;
    if (this.props.defaultPath) {
      Page = pagesRoutes[1].component;
    } else {
      Page = pagesRoutes[0].component;
    }
    return (
      <div>
        <PagesHeader />
        <div className="wrapper wrapper-full-page">
          <div
            className={"full-page" + this.getPageClass()}
            data-color="black"
            data-image={bgImage}
          >
            <div className="content">
              <Page />
            </div>
            <Footer transparent />
            <div
              className="full-page-background"
              style={{ backgroundImage: "url(" + bgImage + ")" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Pages;
