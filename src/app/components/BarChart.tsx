import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  chartData: ChartData<"bar">
}
export const BarChart = ({ chartData }: BarChartProps) => {
  return (
    <Bar
      data={chartData}
      options={{
        responsive: true, 
      }}
    />
  )
}