import store from "@/store";
// mockData
import { userList } from "@/view/3manage/mockData/role"; // 用户列表

/**
 * 模拟事件
 */

// 检测员登录（产线用户登录）
export const loginLineUser = req => {
  req = JSON.parse(req.body);
  const testUser = userList.find(user => user.userName === req.username);
  if (testUser !== undefined) {
    // 允许密码为123456
    if (req.password !== '123456') {
      return {
        status: 500,
        message: "用户名或密码错误！",
        data: null
      };
    }
    const testRole = testUser.roles.find(role => role.name === "test");
    if (testRole !== undefined) {
      if (testUser.lockFlag === 0) {
        return {
          status: 200,
          message: "成功！",
          data: {
            username: testUser.userName,
            qcid: parseInt(req.qcid)
          }
        };
      } else {
        return {
          status: 500,
          message: "该用户已被锁定，请登录其他账号解锁",
          data: null
        };
      }
    } else {
      return {
        status: 500,
        message: "该用户不是检测员角色，无法在此登录",
        data: null
      };
    }
  } else {
    return {
      status: 500,
      message: "用户名或密码错误！",
      data: null
    };
  }
};

// 获取已登录的检测员列表
export const getLineUsers = req => {
  const lineUsers = [];
  const loginKeys = ["formQC1_1", "formQC1_2", "formQC2", "formQC3"];

  loginKeys.forEach(key => {
    const loginData = localStorage.getItem(key);
    if (loginData !== null) {
      try {
        const data = JSON.parse(loginData);
        if (data.username && data.qcid) {
          lineUsers.push({
            username: data.username,
            qcid: parseInt(data.qcid)
          });
        }
      } catch (e) {
        console.error("解析localStorage数据失败:", e);
      }
    }
  });

  return {
    status: 200,
    message: "成功！",
    data: lineUsers
  };
};

// 用户登录 -> 将用户名设置为token
const USER_MAP = {};
userList.forEach(user => {
  USER_MAP[user.userName] = user;
});

/**
 * 模拟事件
 */

// 用户登录 -> 将用户名设置为token
export const login = req => {
  req = JSON.parse(req.body);
  if (USER_MAP[req.userName] !== undefined) {
    // 允许密码为123456
    if (req.password !== '123456') {
      return {
        status: 500,
        message: "用户名或密码错误！",
        data: null
      };
    }
    if (USER_MAP[req.userName].lockFlag === 0) {
      return {
        status: 200,
        message: "成功！",
        data: USER_MAP[req.userName].userName
      };
    } else {
      return {
        status: 500,
        message: "该用户已被锁定，请登录其他账号解锁",
        data: null
      };
    }
  } else {
    return {
      status: 500,
      message: "用户名或密码错误！",
      data: null
    };
  }
};

// 获取用户信息 -> 用store.state.user.token去查询
export const getUserInfo = req => {
  // console.log(store.state.user.token);
  if (store.state.user.token !== null) {
    return {
      status: 200,
      message: "成功！",
      data: USER_MAP[store.state.user.token]
    };
  }
};

export const logout = req => {
  return null;
};
