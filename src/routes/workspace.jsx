import CompanyList from "views/Admin/Company/List.jsx";
import UserList from "views/Admin/User/List.jsx";
import ProductList from "views/Products/List.js";
import CustomerList from "views/Customer/List.jsx";
import ConfigCompany from "views/Config/Company.js";
import ConfigInvoice from "views/Config/Invoice.js";
import Invoice from "views/Invoices/List.js";
import InvoiceEdit from "views/Invoices/Edit";

var workspaceRoutes = [
  {
    path: "/invoices",
    name: "Hoá đơn",
    icon: "pe-7s-graph",
    component: Invoice
  },
  {
    path: "/invoices/edit",
    name: "Thông tin hoá đơn",
    icon: "pe-7s-graph",
    visible: false,
    component: InvoiceEdit
  },
  {
    collapse: true,
    path: "/setup",
    name: "Danh mục",
    state: "openSetup",
    icon: "pe-7s-plugin",
    views: [
      {
        path: "/setup/products",
        name: "Sản phẩm",
        mini: "P",
        component: ProductList
      },
      {
        path: "/setup/customers",
        name: "Khách hàng",
        mini: "C",
        component: CustomerList
      }
    ]
  },
  {
    collapse: true,
    path: "/config",
    name: "Thiết lập",
    mini: "R",
    icon: "pe-7s-plugin",
    state: "openConfig",
    views: [
      {
        path: "/config/company",
        name: "Thông tin công ty",
        mini: "C",
        component: ConfigCompany
      },
      {
        path: "/config/invoice",
        name: "Phát hành hoá đơn",
        mini: "C",
        component: ConfigInvoice
      },
    ]
  },
  {
    collapse: true,
    path: "/settings",
    name: "Quản trị",
    state: "openSettings",
    icon: "pe-7s-plugin",
    views: [
      {
        path: "/admin/companies",
        name: "Công ty",
        mini: "CO",
        component: CompanyList
      },
      {
        path: "/admin/users",
        name: "Người sử dụng",
        mini: "US",
        component: UserList
      }
    ]
  },
  { redirect: true, path: "/", pathTo: "/invoices", name: "Invoice" }
];

export default workspaceRoutes;
