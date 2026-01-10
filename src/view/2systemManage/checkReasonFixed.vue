<template>
  <div class="dooya-container">
    <Card>
      <Tabs value="1"
            @on-click="tabSelect">
        <!-- 综合检测 -->
        <TabPane label="综合检测"
                 name="1">
          <!-- 选择框 -->
          <div style="margin-bottom: 10px">
            <Select v-model="isResolvedui"
                    style="width:200px"
                    placeholder="已 / 未填写错误原因"
                    @on-change="resolveChange">
              <Option v-for="(item,i) in resolvedSelect"
                      :value="item.value"
                      :key="i">{{ item.label }}</Option>
            </Select>
          </div>
          <!-- table -->
          <Table :data="tableData"
                 :columns="tableColumns_qc1"
                 :loading="tableLoading"
                 stripe
                 @on-selection-change="onSelectChange">
          </Table>
          <!-- 分页 -->
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page show-sizer
                    transfer
                    placement="top"
                    :total="tableDataFilter.length"
                    :current.sync="pageNum"
                    :page-size-opts="[10, 20, 50, 100]"
                    :page-size="pageSize"
                    @on-change="changePage"
                    @on-page-size-change="changePageSize"></Page>
            </div>
          </div>
        </TabPane>
        <!-- 静音检测 -->
        <TabPane label="静音检测"
                 name="2">
          <!-- 选择框 -->
          <div style="margin-bottom: 10px">
            <Select v-model="isResolvedui"
                    style="width:200px"
                    placeholder="已 / 未填写错误原因"
                    @on-change="resolveChange">
              <Option v-for="(item,i) in resolvedSelect"
                      :value="item.value"
                      :key="i">{{ item.label }}</Option>
            </Select>
          </div>
          <!-- table -->
          <Table :data="tableData"
                 :columns="tableColumns_qc2"
                 :loading="tableLoading"
                 stripe>
          </Table>
          <!-- 分页 -->
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page show-sizer
                    transfer
                    placement="top"
                    :total="tableDataFilter.length"
                    :current.sync="pageNum"
                    :page-size-opts="[10, 20, 50, 100]"
                    :page-size="pageSize"
                    @on-change="changePage"
                    @on-page-size-change="changePageSize"></Page>
            </div>
          </div>
        </TabPane>
        <!-- 外观检测 -->
        <TabPane label="外观检测"
                 name="3">
          <!-- 选择框 -->
          <div style="margin-bottom: 10px">
            <Select v-model="isResolvedui"
                    style="width:200px"
                    placeholder="已 / 未填写错误原因"
                    @on-change="resolveChange">
              <Option v-for="(item,i) in resolvedSelect"
                      :value="item.value"
                      :key="i">{{ item.label }}</Option>
            </Select>
          </div>
          <!-- table -->
          <Table :data="tableData"
                 :columns="tableColumns_qc3"
                 :loading="tableLoading"
                 stripe>
          </Table>
          <!-- 分页 -->
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page show-sizer
                    transfer
                    placement="top"
                    :total="tableDataFilter.length"
                    :current.sync="pageNum"
                    :page-size-opts="[10, 20, 50, 100]"
                    :page-size="pageSize"
                    @on-change="changePage"
                    @on-page-size-change="changePageSize"></Page>
            </div>
          </div>
        </TabPane>
      </Tabs>
      <!-- 检测标准form -->
      <Modal v-model="modalShow"
             title="请选择错误原因"
             footer-hide>
        <Form :model="modalData"
              :label-width="80"
              ref="modalData"
              :rules="modalDataRule">
          <FormItem label="异常原因"
                    prop="reason">
            <Select v-model="modalData.reason">
              <Option v-for="item in checkReasonList"
                      :value="item"
                      :key="item">{{ item }}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary"
                    @click="checkReasonConfirm">确定</Button>
            <Button style="margin-left: 8px"
                    @click="modalShow=false">取消</Button>
          </FormItem>
        </Form>
      </Modal>
    </Card>
  </div>
</template>

<script>
// Print.js
// import printJS from "print-js"; // 移除未使用的导入
// mockData
import { resolvedSelect } from "./mockData/checkReason";
import { Message } from "iview";

/* eslint-disable*/
export default {
  data() {
    return {
      /* 全局 */
      tabList: ["综合检测", "静音检测", "外观检测"], // 顶部tab列表
      tabSelected: "1", // 顶部tab切换
      checkReasonList: [
        "绕组电阻超标",
        "绝缘电阻不达标",
        "空载电流异常",
        "满载电流异常",
        "噪音超标",
        "外观缺陷",
        "其他原因"
      ], // 错误原因select列表
      resolvedSelect: resolvedSelect, // 筛选 - 下拉框list
      isResolvedui: 0, // 筛选 - 界面绑定的值
      isResolved: "", // 筛选 - 要传给后台的值
      lineNo: "", // 产线号
      /* 每页 */
      tableDataOrg: [], // 原始数据
      tableDataFilter: [], // 筛选后的所有数据
      dataResult: {},
      tableData: [], // 处理后的当页数据
      tableColumns_qc1: [
        {
          title: "编号",
          key: "barcode",
          align: "center",
          minWidth: 150
        },
        {
          title: "线号",
          key: "lineno",
          align: "center",
          minWidth: 80
        },
        {
          title: "检测结果",
          key: "qc1_result",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const color =
              row.qc1_result === 0
                ? "default"
                : row.qc1_result === 1
                ? "success"
                : "error";
            const text =
              row.qc1_result === 0
                ? "未检测"
                : row.qc1_result === 1
                ? "合格"
                : "不合格";
            return h(
              "Tag",
              {
                props: {
                  color: color
                }
              },
              text
            );
          },
          minWidth: 100
        },
        {
          title: "异常原因",
          key: "mark_reason_qc1",
          align: "center",
          minWidth: 100
        },
        {
          title: "日期时间",
          key: "record_time",
          align: "center",
          minWidth: 100
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row);
                    }
                  }
                },
                "异常原因"
              )
            ]);
          }
        }
      ], // 表头列项 - qc1
      tableColumns_qc2: [
        {
          title: "编号",
          key: "barcode",
          align: "center",
          minWidth: 150
        },
        {
          title: "线号",
          key: "lineno",
          align: "center",
          minWidth: 80
        },
        {
          title: "静音检测",
          key: "qc2_result",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const color =
              row.qc2_result === 0
                ? "default"
                : row.qc2_result === 1
                ? "success"
                : "error";
            const text =
              row.qc2_result === 0
                ? "未检测"
                : row.qc2_result === 1
                ? "合格"
                : "不合格";
            return h(
              "Tag",
              {
                props: {
                  color: color
                }
              },
              text
            );
          },
          minWidth: 100
        },
        {
          title: "异常原因",
          key: "mark_reason_qc2",
          align: "center",
          minWidth: 100
        },
        {
          title: "日期时间",
          key: "record_time",
          align: "center",
          minWidth: 100
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row);
                    }
                  }
                },
                "异常原因"
              )
            ]);
          }
        }
      ], // 表头列项 - qc2
      tableColumns_qc3: [
        {
          title: "编号",
          key: "barcode",
          align: "center",
          minWidth: 150
        },
        {
          title: "线号",
          key: "lineno",
          align: "center",
          minWidth: 80
        },
        {
          title: "外观检测",
          key: "qc3_result",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const color =
              row.qc3_result === 0
                ? "default"
                : row.qc3_result === 1
                ? "success"
                : "error";
            const text =
              row.qc3_result === 0
                ? "未检测"
                : row.qc3_result === 1
                ? "合格"
                : "不合格";
            return h(
              "Tag",
              {
                props: {
                  color: color
                }
              },
              text
            );
          },
          minWidth: 100
        },
        {
          title: "异常原因",
          key: "mark_reason_qc3",
          align: "center",
          minWidth: 100
        },
        {
          title: "日期时间",
          key: "record_time",
          align: "center",
          minWidth: 100
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row);
                    }
                  }
                },
                "异常原因"
              )
            ]);
          }
        }
      ], // 表头列项 - qc3
      pageNum: 1, // 页码
      pageSize: 10, // 每页显示数量
      // 选中的选项 - 当前
      selectionChange: [],
      // loading
      tableLoading: false,
      /* modal弹框 */
      modalShow: false, //是否显示
      modalData: {
        reason: ""
      }, //电机型号form
      modalDataRule: {
        reason: [
          { required: true, message: "请选择异常原因", trigger: "change" }
        ]
      }, //电机型号form规则
      printable: ""
    };
  },
  async created() {
    this.lineNo = localStorage.getItem("loginLineNo") || "22";
    this.getData();
  },
  methods: {
    // 顶部tab被选择
    tabSelect(name) {
      this.tabSelected = name;
      this.isResolvedui = 0;
      this.isResolved = "";
      this.pageNum = 1;
      this.pageSize = 10;
      this.getData();
    },
    // 获取首页数据
    async getData() {
      this.tableLoading = true;
      // 模拟数据
      this.tableDataFilter = [
        {
          record_time: "2024-01-01 10:00:00",
          barcode: "22Y10012401010001",
          lineno: "22",
          result: 2,
          qc1_result: 2,
          qc1_user_name: "张三",
          qc2_result: 1,
          qc2_user_name: "李四",
          qc3_result: 0,
          qc3_user_name: null,
          mark_result_qc1: 0,
          mark_reason_qc1: null,
          mark_result_qc2: 0,
          mark_reason_qc2: null,
          mark_result_qc3: 0,
          mark_reason_qc3: null
        },
        {
          record_time: "2024-01-01 10:05:00",
          barcode: "22Y10012401010002",
          lineno: "22",
          result: 2,
          qc1_result: 1,
          qc1_user_name: "张三",
          qc2_result: 2,
          qc2_user_name: "李四",
          qc3_result: 0,
          qc3_user_name: null,
          mark_result_qc1: 0,
          mark_reason_qc1: null,
          mark_result_qc2: 0,
          mark_reason_qc2: null,
          mark_result_qc3: 0,
          mark_reason_qc3: null
        },
        {
          record_time: "2024-01-01 10:10:00",
          barcode: "22Y10012401010003",
          lineno: "22",
          result: 2,
          qc1_result: 1,
          qc1_user_name: "张三",
          qc2_result: 1,
          qc2_user_name: "李四",
          qc3_result: 2,
          qc3_user_name: "王五",
          mark_result_qc1: 0,
          mark_reason_qc1: null,
          mark_result_qc2: 0,
          mark_reason_qc2: null,
          mark_result_qc3: 0,
          mark_reason_qc3: null
        }
      ];
      this.refreshData();
      this.tableLoading = false;
    },
    // 顶部下拉框筛选
    resolveChange(value) {
      this.isResolved = value === 0 ? "" : value === 1 ? "true" : "false";
      this.pageNum = 1;
      this.getData();
    },
    // 根据条件刷新数据
    refreshData() {
      // 分页 & 每页数量
      this.tableData = this.tableDataFilter.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageNum * this.pageSize
      );
    },
    // 分页
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.getData();
    },
    // 每页条数变化
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      this.getData();
    },
    // 选项发生变化
    onSelectChange(selection) {
      this.selectionChange = [];
      selection.forEach(row => {
        this.selectionChange.push(row.barcode);
      });
    },
    // 点击按钮 - 编辑
    edit(row) {
      console.log("点击了异常原因按钮", row);
      console.log("当前tabSelected", this.tabSelected);
      // 重置表单（如果引用已初始化）
      if (this.$refs.modalData) {
        try {
          this.$refs.modalData.resetFields();
          console.log("表单重置成功");
        } catch (error) {
          console.error("表单重置失败", error);
        }
      }
      this.modalData = {
        barcode: row.barcode,
        qcIndex: parseInt(this.tabSelected),
        reason:
          this.tabSelected === "1"
            ? row.mark_reason_qc1 || ""
            : this.tabSelected === "2"
            ? row.mark_reason_qc2 || ""
            : row.mark_reason_qc3 || ""
      };
      console.log("modalData", this.modalData);
      this.modalShow = true;
      console.log("modalShow设置为", this.modalShow);
    },
    // 异常原因确认
    async checkReasonConfirm() {
      if (this.$refs.modalData) {
        this.$refs.modalData.validate(async valid => {
          if (valid) {
            this.modalShow = false;
            Message.success("修改成功！");
            this.getData();
          }
        });
      } else {
        // 如果引用未初始化，直接关闭模态框
        this.modalShow = false;
        Message.success("修改成功！");
        this.getData();
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dooya-container ::v-deep {
  .ivu-table-cell {
    padding: 0;
    a {
      color: #2db7f5;
      text-decoration: underline;
    }
  }
}
</style>