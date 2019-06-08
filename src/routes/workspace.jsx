import CompanyList from "views/Admin/Company/List.jsx";
import UserList from "views/Admin/User/List.jsx";
import ProductList from "views/Products/List.js";
import CustomerList from "views/Customer/List.jsx";
import ConfigCompany from "views/Config/Company.js";
import ConfigInvoice from "views/Config/Invoice.js";
import TeacherList from "views/Admin/Teacher/List.js";
import SubjectList from "views/Admin/Subject/List.js";
import LessionList from "views/Admin/Lession/List.js";
import CourseList from "views/Admin/Course/List.js";
import ClassList from "views/Admin/Class/List.js";
import QuizList from "views/Admin/Quiz/List.js";
import Quiz1List from "views/Admin/Quiz1/List.js";
import Quiz2List from "views/Admin/Quiz2/List.js";
import Quiz3List from "views/Admin/Quiz3/List.js";
import DashBoard from "views/Admin/DashBoard/Invoice.jsx";



var workspaceRoutes = [
  // {
  //   path: "/invoices",
  //   visible:false,
  //   name: "Hoá đơn",
  //   icon: "pe-7s-graph",
  //   component: Invoice
  // },
  {
    path: "/admin/dashboard",
    name: "Thống kê",
    icon: "pe-7s-graph",
    component: DashBoard
  },
  // {
  //   path: "/invoices/edit",
  //   name: "Thông tin hoá đơn",
  //   icon: "pe-7s-graph",
  //   visible: false,
  //   component: InvoiceEdit
  // },
  {
    collapse: true,
    name: "Danh mục",
    state: "openList",
    icon: "pe-7s-plugin",
    views: [
      {
        path: "/admin/teacher/list",
        name: "Giáo viên",
        mini: "GV",
        component: TeacherList
      },
      {
        path: "/admin/subject/list",
        name: "Môn học",
        mini: "MH",
        component: SubjectList
      },
      {
        path: "/admin/course/list",
        name: "Khóa học",
        mini: "KH",
        component: CourseList
      },
      {
        path: "/admin/class/list",
        name: "Lớp học",
        mini: "LH",
        component: ClassList
      }
    ]
  },
  {
      collapse: true,
      name: "Bài giảng và Quiz",
      state: "openLession",
      icon: "pe-7s-helm",
      views: [
        {
          path: "/admin/lession/list",
          name: "Danh sách bài giảng",
          mini: "BG",
          component: LessionList
        },
        {
          path: "/admin/quiz/list",
          name: "Câu hỏi luyện quiz",
          mini: "CQ",
          component: QuizList
        }
      ]
    },
    {
      collapse: true,
        name: "Luyện thi",
        state: "openPracticeTest",
        icon: "pe-7s-file",
        views: [
          {
            path: "/admin/thematic/list",
            name: "Danh sách chuyên đề",
            mini: "BS",
            component: Quiz1List
          },
          {
            path: "/admin/question/list",
            name: "Câu hỏi luyện thi",
            mini: "CT",
            component: QuizList
          },
          {
            path: "/admin/questionlist/list",
            name: "Danh mục luyện thi tuần",
            mini: "LT",
            component: Quiz2List
          }
        ]
      },
      {
        collapse: true,
          name: "Quản trị nội dung",
          state: "openContendManager",
          icon: "pe-7s-note2",
          views: [
            {
              path: "/admin/slide/list",
              name: "Quản lý slide",
              mini: "BI",
              component: Quiz3List
            },
            // {
            //   path: "/admin/new/list",
            //   name: "Tin tức",
            //   mini: "CE",
            //   component: CustomerList
            // },
            // {
            //   path: "/admin/q&a/list",
            //   name: "Hỏi đáp",
            //   mini: "LO",
            //   component: CustomerList
            // }
          ]
        },
  {
    collapse: true,
    name: "Cài đặt",
    mini: "R",
    icon: "pe-7s-plugin",
    state: "openConfig",
    views: [
      {
        path: "/admin/examcf/list",
        name: "Cấu hình đề thi",
        mini: "C",
        component: ConfigCompany
      },
      {
        path: "/admin/resultkq/list",
        name: "Kết quả Xếp loại",
        mini: "K",
        component: ConfigInvoice
      },
    ]
  },
  {
    collapse: true,
    name: "Quản lý tài khoản",
    state: "openSettings",
    icon: "pe-7s-user-female",
    views: [
      {
        path: "/admin/companies/list",
        name: "Danh sách tài khoản",
        mini: "CP",
        component: CompanyList
      },
      {
        path: "/admin/users/list",
        name: "Học viên",
        mini: "US",
        component: UserList
      }
    ]
  },
  { redirect: true, path: "/", pathTo: "/admin/dashboard", name: "Invoice" }
];

export default workspaceRoutes;
