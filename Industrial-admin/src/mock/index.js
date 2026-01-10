import Mock from "mockjs";
import { login, logout, getUserInfo, loginLineUser, getLineUsers } from "./login";
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
// 检测员登录和获取检测员列表
Mock.mock(/\/api\/line\/loginLineUser/, loginLineUser);
Mock.mock(/\/api\/line\/getLineUsers/, getLineUsers);

// 追溯查询相关
Mock.mock(/\/api\/testprocess\/findSnWithPage/, {
  status: 200,
  data: {
    data: {
      pageData: [
        {
          sn: 'SN1234567890',
          productName: '智能控制器',
          proLine: '生产线A',
          workstation: '检测工位1',
          inspector: '张三',
          checkTime: '2026-01-08 10:00:00',
          status: '合格',
          process: '已完成'
        },
        {
          sn: 'SN0987654321',
          productName: '智能控制器',
          proLine: '生产线B',
          workstation: '检测工位2',
          inspector: '李四',
          checkTime: '2026-01-08 09:30:00',
          status: '合格',
          process: '已完成'
        }
      ],
      pageIndex: 1,
      dataCount: 2
    }
  }
});

Mock.mock(/\/api\/testprocess\/addSn/, {
  status: 200,
  message: '添加成功'
});

Mock.mock(/\/api\/testprocess\/editsn/, {
  status: 200,
  message: '更新成功'
});

Mock.mock(/\/api\/testprocess\/removeSn/, {
  status: 200,
  message: '删除成功'
});

// 标准相关
Mock.mock(/\/api\/standardValues\/findSopTagsByQcIndex/, {
  status: 200,
  data: {
    data: [
      {
        value: '16',
        label: 'JS-9-1.9',
        children: [
          {
            value: '9257234587ba4a8e9768c68127eea66d',
            label: 'S型-M型-Q型综合测试'
          }
        ]
      },
      {
        value: '6',
        label: 'JS-9-1.11',
        children: [
          {
            value: '462d78514e2d4ee29c9bb60372814f65',
            label: 'R型综合测试'
          }
        ]
      }
    ]
  }
});

// 追溯查询相关
Mock.mock(/\/api\/qcResult\/findByBarcode/, {
  status: 200,
  data: {
    qc1_Result: {
      qcItems: [],
      qcStartTime: '2026-01-08 10:00:00',
      qcEndTime: '2026-01-08 10:05:00',
      qcStatus: 1,
      name: '综合检测',
      qcUser: '张三'
    },
    qc2_Result: {
      qcItems: [],
      qcStartTime: '2026-01-08 10:10:00',
      qcEndTime: '2026-01-08 10:15:00',
      qcStatus: 1,
      name: '静音检测',
      qcUser: '李四'
    },
    qc3_Result: {
      qcStartTime: '2026-01-08 10:20:00',
      qcEndTime: '2026-01-08 10:25:00',
      qcStatus: 1,
      name: '外观检测',
      qcUser: '王五'
    },
    result: 101,
    barcode: '22Y1309070209'
  }
});

Mock.mock(/\/api\/qcResult\/findQcResultByBarcode/, {
  status: 200,
  data: {
    data: [
      {
        test_group_name: '电机性能检测',
        qc_result: 1,
        item_group_value: [
          {
            test_item_name: '电压',
            curr_value: '220V',
            down_value: '210',
            up_value: '230',
            result: 1
          },
          {
            test_item_name: '电流',
            curr_value: '1.5A',
            down_value: '1.0',
            up_value: '2.0',
            result: 1
          },
          {
            test_item_name: '转速',
            curr_value: '1450rpm',
            down_value: '1400',
            up_value: '1500',
            result: 1
          }
        ]
      },
      {
        test_group_name: '噪音检测',
        qc_result: 1,
        item_group_value: [
          {
            test_item_name: '噪音值',
            curr_value: '45dB',
            down_value: '0',
            up_value: '50',
            result: 1
          }
        ]
      }
    ]
  }
});

Mock.mock(/\/api\/product\/updateQc3/, {
  status: 200,
  data: {
    message: '更新成功'
  }
});

export default Mock;
