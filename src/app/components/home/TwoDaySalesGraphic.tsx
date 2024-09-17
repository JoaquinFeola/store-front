import { useContext, useEffect, useState } from "react";
import { BarChart } from "../BarChart"
import { SalesContext } from "../../../context/SalesContext";
import { ChartData } from "chart.js";



export const TwoDaySalesGraphic = () => {
  const { getSalesForHome } = useContext(SalesContext);
  const [_, setError] = useState('')

  const [salesData, setSalesData] = useState<ChartData<"bar">>({
    labels: ['Ayer', 'Hoy'],
    datasets: [
      {
        label: "Ventas",
        data: [3, 324, 4],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const onInitial = async () => {
    const resp = await getSalesForHome()
    console.log(resp);

    if (resp === null) return setError('Ocurrió un error al intentar cargar las ventas');
    setSalesData({
      labels: ['Ayer', 'Hoy'],
      datasets: [
        {
          label: "Ventas",
          data: [resp.data.salesFromYesterday.totalSales, resp.data.salesFromToday.totalSales,],
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,

        },
      ],
    })
  }

  useEffect(() => {
    onInitial()
  }, [])
  return (
    <div className="w-full">
        <BarChart
          chartData={salesData}
        />

    </div>
  )
}
