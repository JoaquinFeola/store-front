import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  LineElement,
  PointElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  chartData: ChartData<"line">;
}

export const LineChart = ({ chartData }: LineChartProps) => {
  return (
    <Line
      height={500}
      options={{
        aspectRatio: 1.5,
        maintainAspectRatio: false,
        responsive: true       
      }}

      data={chartData}
    />
  )
}
