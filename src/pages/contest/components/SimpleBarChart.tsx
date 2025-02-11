import React from 'react';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from 'recharts';

// 차트 데이터 인터페이스
interface ChartData {
  name: string;
  value: number;
  totalVotes: number;
}

// SimpleBarChart Props 인터페이스
interface SimpleBarChartProps {
  data: {
    id: number;
    imageUrl: string;
    username: string;
    votes: number;
  }[];
}

// CustomTooltip Props 타입
type CustomTooltipProps = TooltipProps<number, string> & {
  payload?: Array<{
    value: number;
    payload: ChartData;
  }>;
};

// CustomBar Props 인터페이스
interface CustomBarProps {
  fill?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  background?: boolean;
  index?: number;
  payload?: ChartData;
  className?: string;
  maxBarSize?: number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length > 0) {
    const totalVotes = payload[0].payload.totalVotes;
    const votes = payload[0].value;
    const percentage = ((votes / totalVotes) * 100).toFixed(1);

    return (
      <div className='rounded-lg bg-gray-900/60 px-3 py-2 shadow-lg'>
        <p className='text-sm text-white'>
          {votes.toLocaleString()}표 ({percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

const CustomBar: React.FC<CustomBarProps> = props => {
  const { fill, x, y, width, height } = props;

  if (
    typeof x === 'undefined' ||
    typeof y === 'undefined' ||
    typeof width === 'undefined' ||
    typeof height === 'undefined'
  ) {
    return null;
  }

  const pixelSize = 4;

  const topLeftCorner = `
    M ${x} ${y + pixelSize}
    L ${x} ${y + pixelSize}
    L ${x + pixelSize} ${y}
    L ${x + width - pixelSize} ${y}
  `;

  const topRightCorner = `
    L ${x + width - pixelSize} ${y}
    L ${x + width} ${y + pixelSize}
    L ${x + width} ${y + height}
  `;

  const bottom = `
    L ${x} ${y + height}
    Z
  `;

  const path = topLeftCorner + topRightCorner + bottom;

  return (
    <g>
      <path d={path} fill={fill} stroke='#BAE6FD' strokeWidth={0} />
    </g>
  );
};

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data }) => {
  const totalVotes = data.reduce((sum, avatar) => sum + avatar.votes, 0);

  const chartData: ChartData[] = data.map(avatar => ({
    name: avatar.username,
    value: avatar.votes,
    totalVotes: totalVotes,
  }));

  return (
    <div className='flex h-64 w-full justify-center'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 5,
          }}
          barCategoryGap={45}
        >
          <defs>
            <linearGradient id='barFill' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#BAE6FD' />
              <stop offset='100%' stopColor='#7DD3FC' />
            </linearGradient>
          </defs>
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Bar dataKey='value' shape={<CustomBar />} fill='url(#barFill)' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleBarChart;
