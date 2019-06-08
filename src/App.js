import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Workspace from "layouts/Workspace";
import Pages from "layouts/Pages";

class App extends React.Component {
  render() {
    let indexRoutes = [];
    const user = this.props.user;
    let defaultPath = "";
    // if (user.uid > 0 && user.status > 0) {
    //   indexRoutes.push({ path: "/", name: "Home", component: Workspace }); 
    // } else {
    //   if (user.uid > 0 && user.status === 0) {
    //     defaultPath = "/signup";
    //   }
    //   indexRoutes.push({ path: "/", name: "Landing", component: Pages });
    // }
    indexRoutes.push({ path: "/", name: "Home", component: Workspace }); 
    return (
      <BrowserRouter>
        <Switch>
          {indexRoutes.map((prop, key) => {
            if (defaultPath !== ""){
              const Page = prop.component;
              return <Route path={prop.path} key={key} render={() => <Page defaultPath={defaultPath}/>} />;
            } else {
              return <Route path={prop.path} component={prop.component} key={key} />;
            }
          })}
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => (
  {
      user: state.user.user
  }
);
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(App);