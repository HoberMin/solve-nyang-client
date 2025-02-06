import { Bar, BarChart, ResponsiveContainer } from 'recharts';

const SimpleBarChart = ({ data }) => {
  return (
    <div className='flex h-64 w-full justify-center'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barCategoryGap={30}
        >
          <Bar dataKey='value' fill='#FFFFFF' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleBarChart;
