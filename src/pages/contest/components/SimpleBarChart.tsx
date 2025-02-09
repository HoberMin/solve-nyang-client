import React from 'react';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from 'recharts';

import { Avatar } from '..';

interface SimpleBarChartProps {
  data: Avatar[];
}

interface ChartData {
  name: string;
  value: number;
  totalVotes: number;
}

type CustomTooltipProps = TooltipProps<number, string> & {
  payload?: Array<{
    value: number;
    payload: ChartData;
  }>;
};

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

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data }) => {
  const totalVotes = data.reduce((sum, avatar) => sum + avatar.votes, 0);

  const chartData: ChartData[] = data.map(avatar => ({
    name: avatar.title,
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
            <linearGradient id='barGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#8B5CF6' stopOpacity={1} />
              <stop offset='100%' stopColor='#3B82F6' stopOpacity={1} />
            </linearGradient>
          </defs>
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Bar dataKey='value' fill='url(#barGradient)' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleBarChart;
