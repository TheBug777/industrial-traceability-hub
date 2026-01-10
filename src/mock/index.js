import Mock from "mockjs";
import { login, logout, getUserInfo } from "./login";
import {
  getTableData,
  getDragList,
  uploadImage,
  getOrgData,
  getTreeSelectData,
  getMockMenuData
} from "./data";
import {
  getMessageInit,
  getContentByMsgId,
  hasRead,
  removeReaded,
  restoreTrash,
  messageCount
} from "./user";

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
});

// 登录相关和获取用户信息
// Mock.mock(/\/login/, login);
Mock.mock(/\/api\/token/, login);
// Mock.mock(/\/get_info/, getUserInfo);
Mock.mock(/\/api\/user\/getUserInfo/, getUserInfo);
Mock.mock(/\/logout/, logout);
Mock.mock(/\/get_table_data/, getTableData);
Mock.mock(/\/get_drag_list/, getDragList);
Mock.mock(/\/save_error_logger/, "success");
Mock.mock(/\/image\/upload/, uploadImage);
Mock.mock(/\/message\/init/, getMessageInit);
Mock.mock(/\/message\/content/, getContentByMsgId);
Mock.mock(/\/message\/has_read/, hasRead);
Mock.mock(/\/message\/remove_readed/, removeReaded);
Mock.mock(/\/message\/restore/, restoreTrash);
Mock.mock(/\/message\/count/, messageCount);
Mock.mock(/\/get_org_data/, getOrgData);
Mock.mock(/\/get_tree_select_data/, getTreeSelectData);
Mock.mock(/\/get_mock_menu_data/, getMockMenuData);

// 追溯查询相关
Mock.mock(/\/api\/qcResult\/findByBarcode/, {
  status: 200,
  data: {
    qc1_Result: {
      qcItems: [],
      qcStartTime: "2024-01-01 08:00:00",
      qcEndTime: "2024-01-01 08:10:00",
      qcStatus: 1,
      qcUser: "张三",
      name: "电机性能检测"
    },
    qc2_Result: {
      qcItems: [],
      qcStartTime: "2024-01-01 08:15:00",
      qcEndTime: "2024-01-01 08:25:00",
      qcStatus: 1,
      qcUser: "李四",
      name: "电机噪音检测"
    },
    qc3_Result: {
      qcStartTime: "2024-01-01 08:30:00",
      qcEndTime: "2024-01-01 08:35:00",
      qcStatus: 1,
      qcUser: "王五",
      name: "外观检测"
    },
    result: 101,
    barcode: "22Y1309070209"
  }
});

Mock.mock(/\/api\/qcResult\/findQcResultByBarcode/, {
  status: 200,
  data: [
    {
      test_group_name: "电机绕组测试",
      qc_result: 1,
      item_group_value: [
        {
          test_item_name: "绕组电阻",
          curr_value: 2.5,
          down_value: 2.0,
          up_value: 3.0,
          result: 1
        },
        {
          test_item_name: "绝缘电阻",
          curr_value: 500,
          down_value: 400,
          up_value: 600,
          result: 1
        }
      ]
    },
    {
      test_group_name: "电机负载测试",
      qc_result: 1,
      item_group_value: [
        {
          test_item_name: "空载电流",
          curr_value: 1.2,
          down_value: 1.0,
          up_value: 1.5,
          result: 1
        },
        {
          test_item_name: "满载电流",
          curr_value: 5.8,
          down_value: 5.0,
          up_value: 6.5,
          result: 1
        }
      ]
    }
  ]
});

Mock.mock(/\/api\/product\/updateQc3/, {
  status: 200,
  data: { message: "更新成功" }
});

// SOP相关
Mock.mock(/\/api\/testprocess\/getLineSn/, {
  "status": 200,
  "data": {
    "sn": "1009",
    "lineNo": "22",
    "qc1Sop": "JS-9-1.11",
    "qc1SopTagId": "A型",
    "qc2Sop": "JS-9-1.146",
    "qc2SopTagId": "SS型"
  }
});

Mock.mock(/\/api\/standardValues\/getSopTagFilteByEquipment/, {
  "status": 200,
  "data": [
    {
      "value": "JS-9-1.11",
      "label": "JS-9-1.11",
      "children": [
        {
          "value": "A型",
          "label": "A型",
          "children": null
        },
        {
          "value": "B型",
          "label": "B型",
          "children": null
        }
      ]
    },
    {
      "value": "JS-9-1.146",
      "label": "JS-9-1.146",
      "children": [
        {
          "value": "SS型",
          "label": "SS型",
          "children": null
        },
        {
          "value": "A型",
          "label": "A型",
          "children": null
        }
      ]
    }
  ]
});

export default Mock;
