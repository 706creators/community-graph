# Community Graph - 社区网络图谱可视化分析平台

一个基于Next.js和D3.js的智能社区关系网络可视化分析平台，集成了AI驱动的社区分析功能，帮助社区组织者理解成员参与模式和优化社区策略。

## 🌟 核心功能

### 🔗 交互式网络可视化
- **多层级关系展示** - 成员、活动、场地之间的关系网络
- **动态节点类型** - 不同类型节点使用不同的视觉符号
- **实时交互** - 节点选择、高亮、拖拽等交互操作
- **时间线集成** - 支持基于时间的网络演化分析

### 🤖 AI智能分析
- **多AI提供商支持** - 集成DeepSeek和Gemini API
- **实时流式响应** - 基于SSE的实时AI分析对话
- **上下文感知** - 基于上传的图谱数据进行智能分析
- **社区指标分析**:
  - 成员参与度追踪
  - 活动分布分析
  - 关键意见领袖识别
  - 网络健康度评估

### 📊 数据处理能力
- **CSV批量导入** - 支持社区活动数据的批量处理
- **智能数据解析** - 自动处理多发起人、多参与者的复杂活动数据
- **错误处理** - 详细的数据解析反馈和错误提示
- **样本数据** - 提供测试和演示用的样本数据下载

### 📈 高级图谱分析
- **网络指标计算** - 中心性、参与率等关键指标
- **下游节点追踪** - 从发起人追踪影响链
- **时间约束过滤** - 支持基于时间的条件筛选
- **响应式设计** - 自动适应不同屏幕尺寸

## 🛠 技术栈

### 前端框架
- **Next.js 15.1.4** - React全栈框架，使用App Router
- **React 19.1.1** - 现代React UI库
- **TypeScript** - 类型安全的JavaScript

### 可视化与UI
- **D3.js 7.9.0** - 数据可视化和图形渲染
- **Tailwind CSS 3.4.1** - 实用优先的CSS框架
- **Heroicons** - 现代图标库

### 开发工具
- **ESLint 9** - 代码质量检查
- **PostCSS** - CSS处理
- **Turbopack** - 快速打包工具

## 📁 项目结构

```
├── app/                      # Next.js App Router目录
│   ├── api/chat/route.ts    # AI聊天API端点
│   ├── components/          # React组件
│   │   ├── CommunityGraph.tsx # 主要的D3.js图形组件
│   │   ├── AIChat.tsx       # AI聊天界面
│   │   └── Sidebar.tsx      # 数据上传侧边栏
│   ├── types/               # TypeScript类型定义
│   │   └── index.ts         # 核心数据类型接口
│   ├── utils/              # TypeScript工具函数
│   │   ├── graph.ts        # D3图形工具
│   │   ├── csvParser.ts    # CSV数据解析
│   │   └── timeline.ts     # 时间线可视化
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 主页面
│   └── globals.css         # 全局样式
├── public/                 # 静态资源和数据
│   ├── data2.json          # 样本图形数据
│   ├── graph_data.json     # 图形可视化数据
│   └── mock_data1.json     # 额外样本数据
├── python/                 # Python数据处理脚本
│   ├── graph_model.py      # 图形数据建模
│   ├── mock_data.py        # 模拟数据生成
│   └── mock_community_events.csv # 样本CSV数据
├── package.json            # 依赖和脚本
├── tsconfig.json           # TypeScript配置
├── next.config.ts          # Next.js配置
└── tailwind.config.ts      # Tailwind CSS配置
```

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 配置环境变量
创建 `.env.local` 文件并配置AI API密钥：
```env
DEEPSEEK_API_KEY=your_deepseek_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### 启动开发服务器
```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📖 使用指南

### 1. 数据导入
- 支持CSV格式的社区活动数据
- 点击侧边栏的"上传CSV"按钮导入数据
- 可以下载样本数据进行测试

### 2. 图形交互
- 点击节点查看详细信息
- 拖拽节点调整布局
- 使用时间线筛选特定时间段的数据

### 3. AI分析
- 在AI聊天面板中询问关于社区的问题
- AI会基于当前的图形数据提供分析建议
- 支持参与度分析、活跃成员识别等查询

## 🎯 数据格式

### CSV数据格式
```csv
event_name,initiators,participants,topics,venue,start_time
社区分享会,张三;李四,王五;赵六;钱七,技术分享,咖啡厅,2024-01-15 14:00
```

### 图形数据结构
```typescript
interface Node {
  id: string;
  type: 'member' | 'event' | 'space';
  name: string;
  time: string | null;
}

interface Edge {
  source: string;
  target: string;
  relationship: 'initiates' | 'participates' | 'hosts';
  value: number;
}
```

## 🔧 开发指南

### 主要组件
- `app/page.tsx` - 主应用入口，管理三面板布局
- `app/components/CommunityGraph.tsx` - D3.js图形渲染组件（TypeScript重构）
- `app/api/chat/route.ts` - AI分析API端点

### 添加新的AI提供商
1. 在 `app/api/chat/route.ts` 中添加新的provider配置
2. 实现对应的API调用逻辑
3. 更新前端provider选择器

### 自定义图形样式
修改 `app/utils/graph.ts` 中的D3配置来自定义节点和边的样式。

### TypeScript开发优势
- **类型安全** - 所有组件和函数都有严格的类型定义
- **更好的IDE支持** - 自动补全和错误检查
- **易于维护** - 清晰的接口定义提高代码可读性
- **重构友好** - 类型系统帮助安全地进行代码重构

## 📚 API文档

### AI聊天API
- **端点**: `/api/chat`
- **方法**: POST
- **请求体**:
```json
{
  "messages": [{"role": "user", "content": "分析社区参与度"}],
  "provider": "deepseek" | "gemini",
  "graphData": {...}
}
```

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙋‍♂️ 适用场景

这个项目特别适合：

- **社区运营者** - 理解社区成员参与模式
- **活动组织者** - 分析活动效果和参与度
- **社交网络分析师** - 研究社区网络结构
- **产品经理** - 了解用户社区的健康状况
- **研究人员** - 社交网络和数据可视化研究

## 🐛 问题反馈

如果您遇到问题或有建议，请在 [GitHub Issues](https://github.com/your-repo/community-graph/issues) 中提出。
