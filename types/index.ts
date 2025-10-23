// 核心图数据结构类型定义

export type NodeType = 'event' | 'space' | 'member' | 'person' | 'act' | 'area';

export interface GraphNode {
  id: string;
  name?: string;
  type: NodeType;
  group?: string;
  time?: string;
  parsedTime?: Date;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  [key: string]: any; // 允许额外属性
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  value?: number;
  type?: string;
  [key: string]: any; // 允许额外属性
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphLink[];
}

// D3.js 相关类型
export interface SimulationNode extends GraphNode {
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface SimulationLink extends GraphLink {
  source: SimulationNode | string;
  target: SimulationNode | string;
  index?: number;
}

// 力导向图配置类型
export interface ForceConfig {
  linkDistance?: number | ((d: SimulationLink) => number);
  chargeStrength?: number;
  collisionRadius?: number;
  centerStrength?: number;
}

// 时间轴相关类型
export interface TimeScale {
  (date: Date): number;
  domain(): [Date, Date];
  range(): [number, number];
  ticks(count: number): Date[];
  invert(x: number): Date;
}

export interface ParsedEventNode extends GraphNode {
  parsedTime: Date;
  type: 'event';
}

// 下游节点查找结果类型
export interface DownstreamResult {
  nodes: Set<string>;
  edges: Set<GraphLink>;
}

// 组件 Props 类型
export interface CommunityGraphProps {
  width?: number;
  height?: number;
  data?: GraphData | null;
}

// 尺寸相关类型
export interface Size {
  width: number;
  height: number;
}

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

// 符号类型映射
export interface SymbolTypeMap {
  [key: string]: d3.SymbolType;
}

// 选中状态类型
export interface SelectionState {
  selectedNode: GraphNode | null;
  highlightedNodes: Set<string>;
  highlightedEdges: Set<GraphLink>;
}

// D3 选择集引用类型
export interface D3SelectionRefs {
  linkSelection?: any;
  nodeSelection?: any;
  labelSelection?: any;
  originalEdges?: SimulationLink[];
}

// 缩放和变换类型
export interface ZoomTransform {
  x: number;
  y: number;
  k: number;
}

// 工具函数类型
export type TooltipFunction = d3.Selection<HTMLDivElement, unknown, HTMLElement, any>;

export type NodeLabelFunction = (d: SimulationNode) => string;

export type LinkDistanceFunction = (d: SimulationLink) => number;