import React from 'react';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from 'recharts';

interface ChartData {
  name: string;
  value: number;
  totalVotes: number;
  fill: string;
}

interface SimpleBarChartProps {
  data: {
    id: number;
    imageUrl: string;
    username: string;
    votes: number;
  }[];
}

interface Coordinates {
  x: number;
  y: number;
}

type CustomTooltipProps = TooltipProps<number, string> & {
  payload?: Array<{
    value: number;
    payload: ChartData;
  }>;
  coordinate?: Coordinates;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  coordinate,
}) => {
  if (active && payload && payload.length > 0) {
    const totalVotes = payload[0].payload.totalVotes;
    const votes = payload[0].value;
    const percentage = ((votes / totalVotes) * 100).toFixed(1);

    return (
      <div
        className='rounded-lg bg-gray-900/80 px-3 py-2 shadow-lg backdrop-blur-sm'
        style={{
          transform: coordinate
            ? `translate(${coordinate.x}px, ${coordinate.y - 40}px)`
            : undefined,
          position: 'fixed',
        }}
      >
        <p className='text-sm font-medium text-white'>
          {votes.toLocaleString()}표 ({percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data }) => {
  const totalVotes = data.reduce((sum, avatar) => sum + avatar.votes, 0);

  // Define harmonious gradient colors for three bars
  const gradients = [
    { start: '#7C83FD', end: '#96A5FD' }, // Royal Blue
    { start: '#FF9999', end: '#FFB5B5' }, // Coral Pink
    { start: '#96DED1', end: '#B5E8E0' }, // Soft Mint
  ];

  const chartData: ChartData[] = data.map((avatar, index) => ({
    name: avatar.username,
    value: avatar.votes,
    totalVotes: totalVotes,
    fill: `url(#gradient-${index})`,
  }));

  return (
    <div className='flex h-64 w-full justify-center'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 5,
          }}
          barCategoryGap={45}
        >
          <defs>
            {gradients.map((gradient, index) => (
              <linearGradient
                key={`gradient-${index}`}
                id={`gradient-${index}`}
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop offset='0%' stopColor={gradient.start} />
                <stop offset='100%' stopColor={gradient.end} />
              </linearGradient>
            ))}
          </defs>
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
            position={{ x: 0, y: 0 }}
          />
          <Bar
            dataKey='value'
            radius={[4, 4, 0, 0]}
            fill={chartData[0]?.fill}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleBarChart;
