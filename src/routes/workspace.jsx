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
    visible:false,
    name: "Hoá đơn",
    icon: "pe-7s-graph",
    component: Invoice
  },
  {
    path: "/invoices",
    name: "Thống kê",
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
    state: "openList",
    icon: "pe-7s-plugin",
    views: [
      {
        path: "/setup/products",
        name: "Giáo viên",
        mini: "GV",
        component: ProductList
      },
      {
        path: "/setup/customers",
        name: "Môn học",
        mini: "MH",
        component: CustomerList
      },
      {
        path: "/setup/customers",
        name: "Khóa học",
        mini: "KH",
        component: CustomerList
      },
      {
        path: "/setup/customers",
        name: "Lớp học",
        mini: "LH",
        component: CustomerList
      }
    ]
  },
  {
    collapse: true,
      path: "/setup",
      name: "Bài giảng và Quiz",
      state: "openLession&Test",
      icon: "pe-7s-helm",
      views: [
        {
          path: "/setup/products",
          name: "Danh sách bài giảng",
          mini: "BG",
          component: ProductList
        },
        {
          path: "/setup/customers",
          name: "Câu hỏi luyện quiz",
          mini: "CH",
          component: CustomerList
        }
      ]
    },
    {
      collapse: true,
        path: "/setup",
        name: "Luyện thi",
        state: "openPracticeTest",
        icon: "pe-7s-file",
        views: [
          {
            path: "/setup/products",
            name: "Danh sách chuyên đề",
            mini: "BG",
            component: ProductList
          },
          {
            path: "/setup/customers",
            name: "Câu hỏi luyện thi",
            mini: "CH",
            component: CustomerList
          },
          {
            path: "/setup/customers",
            name: "Danh mục luyện thi tuần",
            mini: "LT",
            component: CustomerList
          }
        ]
      },
      {
        collapse: true,
          path: "/setup",
          name: "Quản trị nội dung",
          state: "openContendManager",
          icon: "pe-7s-note2",
          views: [
            {
              path: "/setup/products",
              name: "Quản lý slide",
              mini: "BG",
              component: ProductList
            },
            {
              path: "/setup/customers",
              name: "Tin tức",
              mini: "CH",
              component: CustomerList
            },
            {
              path: "/setup/customers",
              name: "Hỏi đáp",
              mini: "LT",
              component: CustomerList
            }
          ]
        },
  {
    collapse: true,
    path: "/config",
    name: "Cài đặt",
    mini: "R",
    icon: "pe-7s-plugin",
    state: "openConfig",
    views: [
      {
        path: "/config/company",
        name: "Cấu hình đề thi",
        mini: "C",
        component: ConfigCompany
      },
      {
        path: "/config/invoice",
        name: "Kết quả sếp loại",
        mini: "C",
        component: ConfigInvoice
      },
    ]
  },
  {
    collapse: true,
    path: "/settings",
    name: "Quản lý tài khoản",
    state: "openSettings",
    icon: "pe-7s-user-female",
    views: [
      {
        path: "/admin/companies",
        name: "Danh sách tài khoản",
        mini: "CO",
        component: CompanyList
      },
      {
        path: "/admin/users",
        name: "Học viên",
        mini: "US",
        component: UserList
      }
    ]
  },
  { redirect: true, path: "/", pathTo: "/invoices", name: "Invoice" }
];

export default workspaceRoutes;
