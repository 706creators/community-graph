# Claude Memory - Community Graph 项目记忆文件

## 项目概览
这是一个社区网络图谱可视化分析平台，基于Next.js 15 + React 19 + TypeScript构建，使用D3.js进行数据可视化，集成了AI驱动的社区分析功能。

## 核心技术架构

### 前端技术栈
- **Next.js 15.1.4** - 全栈React框架，使用App Router
- **React 19.1.1** - 现代React UI库
- **TypeScript** - 类型安全的JavaScript
- **D3.js 7.9.0** - 数据可视化和图形渲染
- **Tailwind CSS 3.4.1** - 样式框架

### 关键依赖
- @heroicons/react 2.2.0 - 图标库
- d3 7.9.0 - 数据可视化核心
- next 15.1.4 - 框架核心
- react 19.1.1 - UI库
- tailwindcss 3.4.1 - CSS框架

## 项目结构详解

### 主要目录结构
```
/app                           # Next.js App Router根目录
├── api/chat/route.ts          # AI聊天API端点 - 核心分析功能
├── components/                 # React组件目录
│   ├── CommunityGraph2.js     # 主要D3.js图形组件 - 最重要的可视化组件
│   ├── AIChat.tsx             # AI聊天界面组件
│   └── Sidebar.tsx            # 数据上传侧边栏
├── types/graph.ts             # TypeScript类型定义
├── utils/                     # 工具函数库
│   ├── graphUtils.js          # D3图形工具函数
│   ├── csvParser.ts           # CSV数据解析逻辑
│   ├── timelineUtils.js       # 时间线可视化工具
│   └── renderUtils.js         # 渲染辅助函数
├── layout.tsx                 # 根布局组件
├── page.tsx                   # 主应用入口 - 三面板布局管理
└── globals.css                # 全局样式定义

/public                        # 静态资源目录
├── data2.json                 # 样本图形数据
├── graph_data.json           # 图形可视化数据
└── mock_data1.json            # 额外样本数据

/python/                       # Python数据处理脚本
├── graph_model.py             # 图形数据建模逻辑
├── mock_data.py               # 模拟数据生成
└── mock_community_events.csv # 样本CSV数据文件
```

## 核心功能模块

### 1. 图形可视化系统 (CommunityGraph2.js)
- **D3.js力导向图** - 实现节点和边的动态布局
- **节点类型系统** - member(成员)、event(活动)、space(场地)三种类型
- **关系类型** - initiates(发起)、participates(参与)、hosts(主办)
- **交互功能** - 节点点击、拖拽、高亮、缩放
- **时间线集成** - 支持时间过滤和动态更新

### 2. AI分析系统 (app/api/chat/route.ts)
- **多AI提供商** - 支持DeepSeek和Gemini API
- **流式响应** - 使用Server-Sent Events实现实时对话
- **上下文感知** - 基于当前图形数据进行分析
- **分析能力** - 社区健康度、成员参与度、关键人物识别等

### 3. 数据处理系统
- **CSV解析器** (csvParser.ts) - 处理复杂的社区活动数据
- **数据结构转换** - CSV到图形数据的转换逻辑
- **错误处理** - 详细的解析错误反馈

## 关键数据结构

### TypeScript接口定义 (types/graph.ts)
```typescript
interface Node {
  id: string;                  // 唯一标识符
  type: 'member' | 'event' | 'space';  // 节点类型
  name: string;                // 显示名称
  time: string | null;         // 时间信息(仅活动节点)
}

interface Edge {
  source: string;              // 源节点ID
  target: string;              // 目标节点ID
  relationship: 'initiates' | 'participates' | 'hosts';  // 关系类型
  value: number;               // 关系权重
}

interface GraphData {
  nodes: Node[];               // 节点数组
  edges: Edge[];               // 边数组
}
```

## 开发要点

### 环境配置
- 需要配置AI API密钥在.env.local文件中
- DEEPSEEK_API_KEY和GEMINI_API_KEY
- Node.js 18+环境

### 开发命令
- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run lint` - 代码检查

### 主要开发注意事项

1. **D3.js集成** - CommunityGraph2.js是核心组件，处理所有图形渲染逻辑
2. **状态管理** - 主要状态在page.tsx中管理，通过props传递给子组件
3. **AI API集成** - 需要处理不同AI提供商的API格式差异
4. **数据处理** - CSV解析需要处理多值字段(如多个发起人用分号分隔)
5. **TypeScript类型** - 严格遵循types/graph.ts中定义的接口

### 扩展指南

#### 添加新的节点类型
1. 更新types/graph.ts中的Node接口
2. 在CommunityGraph2.js中添加对应的视觉样式
3. 更新CSV解析逻辑以支持新类型

#### 添加新的AI提供商
1. 在app/api/chat/route.ts中添加新的provider配置
2. 实现对应的API调用函数
3. 更新AIChat.tsx中的provider选择器

#### 自定义图形样式
主要修改CommunityGraph2.js中的D3配置：
- 节点颜色、大小、形状
- 边的样式、宽度、颜色
- 力导向图参数

## 常见问题解决

### 性能优化
- 大数据集时考虑使用虚拟化
- D3.js计算密集操作使用Web Workers
- 图形更新时使用requestAnimationFrame

### 数据一致性
- CSV解析时验证数据格式
- 节点ID生成确保唯一性
- 时间格式标准化处理

### 调试技巧
- 使用React DevTools查看组件状态
- D3.js调试使用console.log输出中间数据
- AI API调用检查网络请求和响应

## 测试数据
- public/data2.json - 基础测试数据
- public/graph_data.json - 完整图形数据
- python/mock_community_events.csv - CSV格式测试数据

## 未来扩展方向
1. 实时数据更新支持
2. 更多网络分析算法集成
3. 图形导出功能(PNG/SVG)
4. 更丰富的AI分析功能
5. 移动端适配优化
6. 数据持久化存储

## 文件修改提醒
- 修改CommunityGraph2.js时需要小心D3.js的DOM操作逻辑
- API路由修改需要保持向后兼容性
- TypeScript类型定义更新需要同步修改相关实现
- CSS样式修改需要注意响应式设计