import Pages from "layouts/Pages";
import Workspace from "layouts/Workspace";

var indexRoutes = [
  { path: "/pages", name: "Pages", component: Pages },
  { path: "/", name: "Home", component: Workspace }
];

export default indexRoutes;
