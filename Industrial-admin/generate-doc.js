const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, HeightRule } = require("docx");
const fs = require("fs");

const doc = new Document({
  sections: [{
    properties: {},
    children: [
      new Paragraph({
        text: "Industrial-admin 项目简介",
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
      }),
      new Paragraph({ text: "", spacing: { after: 200 } }),

      new Paragraph({
        text: "一、项目概述",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 200 }
      }),
      new Paragraph({
        text: "Industrial-admin 是一款基于工业互联网 4.0 理念开发的质量追溯平台，旨在通过智能化手段提升生产产品的检测效率和质量控制水平。",
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "平台定位：", bold: true }),
          new TextRun("智能检测与质量追溯系统")
        ],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "核心价值：", bold: true }),
          new TextRun("严格制定检测标准、极大提高生产效率、实现全程质量追溯")
        ],
        spacing: { after: 100 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "适用场景：", bold: true }),
          new TextRun("工厂、车间等工业生产环境")
        ],
        spacing: { after: 200 }
      }),

      new Paragraph({
        text: "二、技术架构",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 200 }
      }),

      new Paragraph({
        text: "2.1 核心技术栈",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 100, after: 100 }
      }),

      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          new TableRow({
            height: { value: 500, rule: HeightRule.EXACT },
            children: [
              new TableCell({ children: [new Paragraph({ text: "技术/框架", bold: true })] }),
              new TableCell({ children: [new Paragraph({ text: "用途", bold: true })] }),
              new TableCell({ children: [new Paragraph({ text: "版本", bold: true })] })
            ]
          }),
          new TableRow({
            height: { value: 400, rule: HeightRule.EXACT },
            children: [
              new TableCell({ children: [new Paragraph({ text: "Vue.js" })] }),
              new TableCell({ children: [new Paragraph({ text: "前端框架" })] }),
              new TableCell({ children: [new Paragraph({ text: "2.x" })] })
            ]
          }),
          new TableRow({
            height: { value: 400, rule: HeightRule.EXACT },
            children: [
              new TableCell({ children: [new Paragraph({ text: "iView" })] }),
              new TableCell({ children: [new Paragraph({ text: "UI组件库" })] }),
              new TableCell({ children: [new Paragraph({ text: "3.x" })] })
            ]
          }),
          new TableRow({
            height: { value: 400, rule: HeightRule.EXACT },
            children: [
              new TableCell({ children: [new Paragraph({ text: "Element UI" })] }),
              new TableCell({ children: [new Paragraph({ text: "UI组件库" })] }),
              new TableCell({ children: [new Paragraph({ text: "2.x" })] })
            ]
          }),
          new TableRow({
            height: { value: 400, rule: HeightRule.EXACT },
            children: [
              new TableCell({ children: [new Paragraph({ text: "VCharts" })] }),
              new TableCell({ children: [new Paragraph({ text: "数据可视化" })] }),
              new TableCell({ children: [new Paragraph({ text: "-" })] })
            ]
          }),
          new TableRow({
            height: { value: 400, rule: HeightRule.EXACT },
            children: [
              new TableCell({ children: [new Paragraph({ text: "Vue Router" })] }),
              new TableCell({ children: [new Paragraph({ text: "路由管理" })] }),
              new TableCell({ children: [new Paragraph({ text: "-" })] })
            ]
          }),
          new TableRow({
            height: { value: 400, rule: HeightRule.EXACT },
            children: [
              new TableCell({ children: [new Paragraph({ text: "Vuex" })] }),
              new TableCell({ children: [new Paragraph({ text: "状态管理" })] }),
              new TableCell({ children: [new Paragraph({ text: "-" })] })
            ]
          }),
          new TableRow({
            height: { value: 400, rule: HeightRule.EXACT },
            children: [
              new TableCell({ children: [new Paragraph({ text: "Mock.js" })] }),
              new TableCell({ children: [new Paragraph({ text: "模拟数据" })] }),
              new TableCell({ children: [new Paragraph({ text: "-" })] })
            ]
          }),
          new TableRow({
            height: { value: 400, rule: HeightRule.EXACT },
            children: [
              new TableCell({ children: [new Paragraph({ text: "xlsx-style" })] }),
              new TableCell({ children: [new Paragraph({ text: "Excel导出" })] }),
              new TableCell({ children: [new Paragraph({ text: "-" })] })
            ]
          })
        ]
      }),

      new Paragraph({ text: "", spacing: { after: 200 } }),

      new Paragraph({
        text: "2.2 项目结构",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 100, after: 100 }
      }),
      new Paragraph({ text: "src/", spacing: { after: 50 } }),
      new Paragraph({ text: "├── api/          # API接口管理", spacing: { after: 50 } }),
      new Paragraph({ text: "├── assets/       # 静态资源（图片、图标等）", spacing: { after: 50 } }),
      new Paragraph({ text: "├── components/   # 公共组件", spacing: { after: 50 } }),
      new Paragraph({ text: "├── config/       # 项目配置", spacing: { after: 50 } }),
      new Paragraph({ text: "├── directive/    # 自定义指令", spacing: { after: 50 } }),
      new Paragraph({ text: "├── libs/         # 工具函数", spacing: { after: 50 } }),
      new Paragraph({ text: "├── locale/       # 国际化配置", spacing: { after: 50 } }),
      new Paragraph({ text: "├── mock/         # 模拟数据", spacing: { after: 50 } }),
      new Paragraph({ text: "├── plugin/       # 插件管理", spacing: { after: 50 } }),
      new Paragraph({ text: "├── router/       # 路由配置", spacing: { after: 50 } }),
      new Paragraph({ text: "├── store/        # 状态管理", spacing: { after: 50 } }),
      new Paragraph({ text: "└── view/         # 页面组件", spacing: { after: 200 } }),

      new Paragraph({
        text: "2.3 核心特性",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 100, after: 100 }
      }),
      new Paragraph({ children: [new TextRun({ text: "1. ", bold: true }), new TextRun("前后端分离架构：支持纯前端模拟数据和后端API联调两种模式，通过isMock配置切换")], spacing: { after: 100 } }),
      new Paragraph({ children: [new TextRun({ text: "2. ", bold: true }), new TextRun("动态路由：从本地存储或后端API获取路由数据，实现权限控制和动态菜单")], spacing: { after: 100 } }),
      new Paragraph({ children: [new TextRun({ text: "3. ", bold: true }), new TextRun("多UI组件库整合：结合iView和Element UI的优势，提供丰富的组件选择")], spacing: { after: 100 } }),
      new Paragraph({ children: [new TextRun({ text: "4. ", bold: true }), new TextRun("数据可视化：基于VCharts实现各类生产数据的图表展示")], spacing: { after: 100 } }),
      new Paragraph({ children: [new TextRun({ text: "5. ", bold: true }), new TextRun("国际化支持：内置中英文切换功能")], spacing: { after: 200 } }),

      new Paragraph({
        text: "三、功能模块",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 200 }
      }),

      new Paragraph({
        text: "3.1 质检管理模块",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 100, after: 100 }
      }),
      new Paragraph({ text: "- 检测查询：支持多种条件查询产品检测记录", spacing: { after: 50 } }),
      new Paragraph({ text: "- 质量统计：实时统计产品合格率、检测数量等关键指标", spacing: { after: 50 } }),
      new Paragraph({ text: "- 控制舱：可视化展示生产线质量状态", spacing: { after: 50 } }),
      new Paragraph({ text: "- 合格率监控：今日合格率和整体合格率的实时监控", spacing: { after: 200 } }),

      new Paragraph({
        text: "3.2 系统管理模块",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 100, after: 100 }
      }),
      new Paragraph({ text: "- 用户管理：多角色用户管理（工程师、管理员、车间主管、产线线长、检测员）", spacing: { after: 50 } }),
      new Paragraph({ text: "- 角色管理：基于角色的权限控制系统", spacing: { after: 50 } }),
      new Paragraph({ text: "- 菜单管理：动态配置系统菜单", spacing: { after: 50 } }),
      new Paragraph({ text: "- 检测标准管理：制定和管理产品检测标准", spacing: { after: 200 } }),

      new Paragraph({
        text: "3.3 生产管理模块",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 100, after: 100 }
      }),
      new Paragraph({ text: "- 生产线管理：生产线信息配置和状态监控", spacing: { after: 50 } }),
      new Paragraph({ text: "- 设备管理：生产设备的维护和管理", spacing: { after: 50 } }),
      new Paragraph({ text: "- 工序管理：生产工序的配置和优化", spacing: { after: 50 } }),
      new Paragraph({ text: "- SN码管理：产品唯一标识的生成和管理", spacing: { after: 200 } }),

      new Paragraph({
        text: "3.4 数据统计模块",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 100, after: 100 }
      }),
      new Paragraph({ text: "- 生产数据图表：柱状图、饼图等多种图表展示生产数据", spacing: { after: 50 } }),
      new Paragraph({ text: "- 质量趋势分析：质量指标的趋势变化分析", spacing: { after: 50 } }),
      new Paragraph({ text: "- 报表导出：支持Excel格式的报表导出功能", spacing: { after: 200 } }),

      new Paragraph({
        text: "四、解决的问题",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 200 }
      }),

      new Paragraph({
        text: "4.1 传统检测痛点",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 100, after: 100 }
      }),
      new Paragraph({ text: "1. 效率低下：人工检测速度慢，容易疲劳出错", spacing: { after: 50 } }),
      new Paragraph({ text: "2. 标准不统一：不同检测员的检测标准存在差异", spacing: { after: 50 } }),
      new Paragraph({ text: "3. 追溯困难：产品质量问题难以追溯到具体环节", spacing: { after: 50 } }),
      new Paragraph({ text: "4. 数据孤岛：生产数据分散，难以整合分析", spacing: { after: 50 } }),
      new Paragraph({ text: "5. 实时性差：质量问题不能及时发现和处理", spacing: { after: 200 } }),

      new Paragraph({
        text: "4.2 平台解决方案",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 100, after: 100 }
      }),
      new Paragraph({ text: "1. 智能化检测：通过系统规范化检测流程，减少人为误差", spacing: { after: 50 } }),
      new Paragraph({ text: "2. 统一标准管理：集中制定和管理检测标准，确保一致性", spacing: { after: 50 } }),
      new Paragraph({ text: "3. 全程追溯：产品从原材料到成品的全生命周期质量追溯", spacing: { after: 50 } }),
      new Paragraph({ text: "4. 数据整合分析：集中管理生产数据，提供多维度分析", spacing: { after: 50 } }),
      new Paragraph({ text: "5. 实时监控预警：实时监控生产线质量状态，及时发现问题", spacing: { after: 200 } }),

      new Paragraph({
        text: "五、使用说明",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 200 }
      }),

      new Paragraph({
        text: "5.1 账户信息",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 100, after: 100 }
      }),
      new Paragraph({ text: "- cestc：工程师角色", spacing: { after: 50 } }),
      new Paragraph({ text: "- admin：管理员角色", spacing: { after: 50 } }),
      new Paragraph({ text: "- workshop_manager：车间主管角色", spacing: { after: 50 } }),
      new Paragraph({ text: "- proline_leader：产线线长角色", spacing: { after: 50 } }),
      new Paragraph({ text: "- test：检测员角色", spacing: { after: 100 } }),
      new Paragraph({
        children: [
          new TextRun({ text: "所有账户密码均为：", bold: true }),
          new TextRun({ text: "2019@cestc", color: "FF0000" })
        ],
        spacing: { after: 200 }
      }),

      new Paragraph({
        text: "5.2 启动方式",
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 100, after: 100 }
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "1. 安装依赖：", bold: true }),
          new TextRun("npm install")
        ],
        spacing: { after: 50 }
      }),
      new Paragraph({ text: "2. 修复xlsx-style插件bug（具体步骤见README.md）", spacing: { after: 50 } }),
      new Paragraph({
        children: [
          new TextRun({ text: "3. 启动开发服务器：", bold: true }),
          new TextRun("npm run dev")
        ],
        spacing: { after: 200 }
      }),

      new Paragraph({
        text: "六、项目优势",
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 200 }
      }),
      new Paragraph({ text: "1. 技术成熟：基于成熟的Vue技术栈，稳定性高", spacing: { after: 50 } }),
      new Paragraph({ text: "2. 扩展性强：模块化设计，便于功能扩展", spacing: { after: 50 } }),
      new Paragraph({ text: "3. 用户友好：直观的界面设计，操作简单", spacing: { after: 50 } }),
      new Paragraph({ text: "4. 灵活配置：支持纯前端模拟和后端联调两种模式", spacing: { after: 50 } }),
      new Paragraph({ text: "5. 安全可靠：完善的权限控制和数据管理机制", spacing: { after: 200 } }),

      new Paragraph({
        text: "Industrial-admin通过将信息化技术与工业生产深度融合，为企业提供了一套完整的质量追溯解决方案，有助于提升生产效率、降低质量成本，实现高质量发展。",
        spacing: { after: 200 }
      }),

      new Paragraph({
        text: "生成时间：2025年12月",
        alignment: AlignmentType.RIGHT,
        spacing: { before: 100 }
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("Industrial-admin项目简介.docx", buffer);
  console.log("Word文档生成成功！文件名为：Industrial-admin项目简介.docx");
});
