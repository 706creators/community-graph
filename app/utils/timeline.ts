import * as d3 from 'd3';
import {
  SimulationNode,
  SimulationLink,
  TimeScale,
  Size,
  Margin,
  ParsedEventNode
} from '@/types';

interface TimeScaleResult {
  timeScale: TimeScale | null;
  eventNodes: ParsedEventNode[];
}

/**
 * 解析时间并创建时间比例尺
 */
export const createTimeScale = (nodes: SimulationNode[], size: Size, margin: Margin): TimeScaleResult => {
  const parseTime = d3.timeParse("%Y-%m-%d %H:%M");
  const eventNodes = nodes.filter(d => d.type === 'event' && d.time) as ParsedEventNode[];

  // 为事件节点解析时间
  eventNodes.forEach(d => {
    if (d.time) {
      d.parsedTime = parseTime(d.time)!;
    }
  });

  let timeScale: TimeScale | null = null;
  if (eventNodes.length > 0) {
    const timeExtent = d3.extent(eventNodes, d => d.parsedTime) as [Date, Date];
    timeScale = d3.scaleTime()
      .domain(timeExtent)
      .range([margin.left, size.width - margin.right]) as unknown as TimeScale;
  }

  return { timeScale, eventNodes };
};

/**
 * 创建时间轴
 */
export const createTimeAxis = (
  fixedLayer: d3.Selection<SVGGElement, unknown, null, undefined>,
  timeScale: TimeScale,
  size: Size,
  margin: Margin
): void => {
  if (!timeScale) return;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeAxis = d3.axisBottom(timeScale as any)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .tickFormat(d3.timeFormat("%m/%d %H:%M") as any)
    .ticks(8);

  // 时间轴背景
  fixedLayer.append('rect')
    .attr('x', 0)
    .attr('y', size.height - margin.bottom)
    .attr('width', size.width)
    .attr('height', margin.bottom)
    .attr('fill', '#f8f9fa')
    .attr('stroke', '#e9ecef');

  // 时间轴
  fixedLayer.append('g')
    .attr('class', 'time-axis')
    .attr('transform', `translate(0, ${size.height - margin.bottom + 10})`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .call(timeAxis as any)
    .selectAll('text')
    .style('font-size', '12px')
    .style('fill', '#666')
    .attr('transform', 'rotate(-45)')
    .style('text-anchor', 'end');

  // 时间轴标题
  fixedLayer.append('text')
    .attr('x', size.width / 2)
    .attr('y', size.height - 10)
    .attr('text-anchor', 'middle')
    .style('font-size', '14px')
    .style('font-weight', 'bold')
    .style('fill', '#333')
    .text('Timeline');
};

/**
 * 创建时间网格线
 */
export const createTimeGrid = (
  zoomableContainer: d3.Selection<SVGGElement, unknown, null, undefined>,
  timeScale: TimeScale,
  size: Size,
  margin: Margin
): void => {
  if (!timeScale) return;

  zoomableContainer.append('g')
    .attr('class', 'time-grid')
    .selectAll('line')
    .data(timeScale.ticks(8))
    .enter()
    .append('line')
    .attr('x1', d => timeScale(d))
    .attr('x2', d => timeScale(d))
    .attr('y1', margin.top)
    .attr('y2', size.height - margin.bottom)
    .attr('stroke', '#e9ecef')
    .attr('stroke-dasharray', '2,2')
    .attr('opacity', 0.5);
};

/**
 * 添加时间约束力
 */
export const addTimeConstraints = (
  simulation: d3.Simulation<SimulationNode, SimulationLink>,
  timeScale: TimeScale,
  size: Size,
  margin: Margin
): void => {
  if (!timeScale) return;

  simulation.force('timeConstraint', d3.forceY<SimulationNode>()
    .y(d => {
      if (d.type === 'event' && (d as ParsedEventNode).parsedTime) {
        return size.height * 0.7 + margin.top;
      }
      return size.height / 2 + margin.top;
    })
    .strength(0.3)
  );

  simulation.force('timeX', d3.forceX<SimulationNode>()
    .x(d => {
      if (d.type === 'event' && (d as ParsedEventNode).parsedTime) {
        return timeScale((d as ParsedEventNode).parsedTime);
      }
      return d.x || size.width / 2 + margin.left;
    })
    .strength(d => d.type === 'event' && (d as ParsedEventNode).parsedTime ? 0.8 : 0.1)
  );
};