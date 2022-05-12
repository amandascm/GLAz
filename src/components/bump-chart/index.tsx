import { ResponsiveBump } from '@nivo/bump';
import styles from './styles';
import data from './data';

interface BumpChartProps {
  data?: any;
  styles?: any;
}

const BumpChart = (props: BumpChartProps) => {
  const chartData: any = props?.data ?? data;
  return (
    <div style={props?.styles?.chartContainer ?? styles.chartContainer}>
      <ResponsiveBump
        data={chartData}
        colors={{ scheme: 'spectral' }}
        lineWidth={3}
        activeLineWidth={6}
        inactiveLineWidth={3}
        inactiveOpacity={0.15}
        pointSize={10}
        activePointSize={16}
        inactivePointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={3}
        activePointBorderWidth={3}
        pointBorderColor={{ from: 'serie.color' }}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -36
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'ranking',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
        axisRight={null}
      />
    </div>
  );
};

export default BumpChart;
