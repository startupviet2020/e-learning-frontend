import Login from "views/Pages/Login.jsx";
import Signup from "views/Pages/Signup.jsx";

const pageRoutes = [
  {
    path: "/",
    name: "LOGIN",
    icon: "pe-7s-graph",
    component: Login
  },
  {
    path: "/signup",
    name: "SIGNUP",
    icon: "pe-7s-graph",
    component: Signup
  }
];

export default pageRoutes;