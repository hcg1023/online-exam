// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";
import { IdentityEnum } from "/@/enums";

// http://mockjs.com/examples.html#Object
const systemRouter = {
  path: "/system",
  meta: {
    icon: "setting",
    title: "menus.hssysManagement",
    rank: 11
  },
  children: [
    {
      path: "/system/testPaper/index",
      name: "TestPaper",
      meta: {
        icon: "expand",
        title: "menus.hsTestPaper"
      }
    },
    {
      path: "/system/question/index",
      name: "Question",
      meta: {
        icon: "unExpand",
        title: "menus.hsQuestion"
      }
    },
    {
      path: "/system/task/index",
      name: "Task",
      meta: {
        icon: "location-company",
        title: "menus.hsTask"
      }
    },
    {
      path: "/system/subject/index",
      name: "Subject",
      meta: {
        icon: "role",
        title: "menus.hsSubject"
      }
    },
    {
      path: "/system/grade/index",
      name: "Grade",
      meta: {
        icon: "role",
        title: "menus.hsGrade"
      }
    },
    {
      path: "/system/dept/index",
      name: "Dept",
      meta: {
        icon: "dept",
        title: "menus.hsDept"
      }
    }
  ]
};
const getUserRouter = (admin = false) => {
  const result = {
    path: "/user",
    meta: {
      icon: "setting",
      title: "menus.hsUser",
      rank: 12
    },
    children: [
      {
        path: "/user/students/index",
        name: "Students",
        meta: {
          icon: "role",
          title: "menus.hsStudents"
        }
      }
    ]
  };
  if (admin) {
    result.children.push(
      {
        path: "/user/teachers/index",
        name: "Teachers",
        meta: {
          icon: "flUser",
          title: "menus.hsTeachers"
        }
      },
      {
        path: "/user/administrator/index",
        name: "Administrator",
        meta: {
          icon: "setting",
          title: "menus.hsAdministrator"
        }
      }
    );
  }
  return result;
};

const studentRouter = {
  path: "/student",
  meta: {
    icon: "setting",
    title: "menus.hssysManagement",
    rank: 12
  },
  children: [
    {
      path: "/student/exam-write",
      name: "ExamWrite",
      meta: {
        showLink: false,
        icon: "expand",
        title: "考试"
      }
    },
    {
      path: "/student/exam-read",
      name: "ExamRead",
      meta: {
        showLink: false,
        icon: "expand",
        title: "查看考试"
      }
    },
    {
      path: "/student/exam-list",
      name: "ExamList",
      meta: {
        icon: "expand",
        title: "考试列表"
      }
    }
  ]
};

const permissionRouter = {
  path: "/permission",
  meta: {
    title: "menus.permission",
    icon: "lollipop",
    rank: 7
  },
  children: [
    {
      path: "/permission/page/index",
      name: "PermissionPage",
      meta: {
        title: "menus.permissionPage"
      }
    },
    {
      path: "/permission/button/index",
      name: "PermissionButton",
      meta: {
        title: "menus.permissionButton",
        authority: []
      }
    }
  ]
};

const teacherRouter = {
  path: "/teacher",
  meta: {
    icon: "setting",
    title: "信息管理",
    rank: 11
  },
  children: [
    {
      path: "/teacher/testPaper/index",
      name: "TestPaper",
      meta: {
        icon: "expand",
        title: "menus.hsTestPaper"
      }
    },
    {
      path: "/teacher/question/index",
      name: "Question",
      meta: {
        icon: "unExpand",
        title: "menus.hsQuestion"
      }
    },
    {
      path: "/teacher/task/index",
      name: "Task",
      meta: {
        icon: "location-company",
        title: "menus.hsTask"
      }
    },
    {
      path: "/teacher/dept/index",
      name: "Dept",
      meta: {
        icon: "dept",
        title: "menus.hsDept"
      }
    }
  ]
};

const answerRouter = {
  path: "/answer",
  meta: {
    icon: "setting",
    title: "答卷管理",
    rank: 11
  },
  children: [
    {
      path: "/answer/judgeList/index",
      name: "judgeList",
      meta: {
        icon: "expand",
        title: "批改列表"
      }
    },
    {
      path: "/answer/completeList/index",
      name: "completeList",
      meta: {
        icon: "expand",
        title: "答卷列表"
      }
    },
    {
      path: "/answer/judge-exam",
      name: "judgeExam",
      meta: {
        icon: "expand",
        showLink: false,
        title: "批改试卷"
      }
    },
    {
      path: "/answer/view-exam",
      name: "viewExam",
      meta: {
        showLink: false,
        icon: "expand",
        title: "查看试卷"
      }
    }
  ]
};

const tabsRouter = {
  path: "/tabs",
  meta: {
    icon: "IF-team-icontabs",
    title: "menus.hstabs",
    rank: 13
  },
  children: [
    {
      path: "/tabs/index",
      name: "Tabs",
      meta: {
        title: "menus.hstabs"
      }
    },
    {
      path: "/tabs/query-detail",
      name: "TabQueryDetail",
      meta: {
        // 不在menu菜单中显示
        showLink: false
      }
    },
    {
      path: "/tabs/params-detail/:id",
      component: "params-detail",
      name: "TabParamsDetail",
      meta: {
        showLink: false
      }
    }
  ]
};

// 添加不同按钮权限到/permission/button页面中
function setDifAuthority(authority, routes) {
  routes.children[1].meta.authority = [authority];
  return routes;
}

export default [
  {
    url: "/getAsyncRoutes",
    method: "get",
    response: ({ query }) => {
      const identity = parseInt(query.identity);
      if (identity === IdentityEnum.ADMIN) {
        return {
          code: 0,
          info: [
            getUserRouter(true),
            systemRouter
            // setDifAuthority("v-admin", permissionRouter)
          ]
        };
      } else if (identity === IdentityEnum.TEACHER) {
        return {
          code: 0,
          info: [getUserRouter(false), teacherRouter, answerRouter]
        };
      } else if (identity === IdentityEnum.STUDENT) {
        return {
          code: 0,
          info: [studentRouter]
        };
      } else {
        return {
          code: 0,
          info: [tabsRouter, setDifAuthority("v-test", permissionRouter)]
        };
      }
    }
  }
] as MockMethod[];
