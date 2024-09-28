import { useContext, useEffect, useState } from "react";
// import { BarChart } from "../BarChart"
import { SalesContext } from "../../../context/SalesContext";
// import { ChartData } from "chart.js";
import { SaleForHome } from "../../../interfaces";
import { formatCurrency } from "../../../utils/currency.util";
import { LoadingInfo } from "../../../ui/components/loadings/LoadingInfo";



export const TwoDaySalesGraphic = () => {
  const { getSalesForHome } = useContext(SalesContext);
  // const [_, setError] = useState('')
  const [saleTwoDays, setSaleTwoDays] = useState<SaleForHome>({} as SaleForHome)
  const [isLoading, setIsLoading] = useState(false)
  // const [salesData, setSalesData] = useState<ChartData<"bar">>({
  //   labels: ['Ayer', 'Hoy'],
  //   datasets: [
  //     {
  //       label: "Ventas",
  //       data: [3, 324, 4],
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",
  //         "#ecf0f1",
  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0",
  //       ],
  //       borderColor: "black",
  //       borderWidth: 2,
  //     },
  //   ],
  // });

  const onInitial = async () => {
    setIsLoading(true)
    const resp = await getSalesForHome()
    console.log(resp);
    if (resp === null) return setIsLoading(false);
    setSaleTwoDays(resp.data)
    setIsLoading(false)

    // if (resp === null) return setError('Ocurrió un error al intentar cargar las ventas');
    // setSalesData({
    //   labels: ['Ayer', 'Hoy'],
    //   datasets: [
    //     {
    //       label: "Ventas",
    //       data: [resp.data.salesFromYesterday.totalSales, resp.data.salesFromToday.totalSales,],
    //       backgroundColor: [
    //         "rgba(75,192,192,1)",
    //         "#ecf0f1",
    //         "#50AF95",
    //         "#f3ba2f",
    //         "#2a71d0",
    //       ],
    //       borderColor: "black",
    //       borderWidth: 2,

    //     },
    //   ],
    // })
  }

  useEffect(() => {
    onInitial()
  }, []);

  if ( isLoading ) return <LoadingInfo />
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
      {/* <BarChart
          chartData={salesData}
        /> */}
      <div className="bg-slate-100 rounded-md shadow-md p-2 ">
        <h2 className="text-xl font-medium">Ayer</h2>
        <div>
          <h3>Total de ventas: {saleTwoDays.salesFromYesterday?.totalSales}</h3>
          <h3>Total de ganancias: {formatCurrency(saleTwoDays.salesFromYesterday?.totalAmount, 'ARS')}</h3>
        </div>
      </div>
      <div className="bg-slate-100 rounded-md shadow-md p-2 ">
        <h2 className="text-xl font-medium">Hoy</h2>
        
        <div>
          <h3>Total de ventas: {saleTwoDays.salesFromToday?.totalSales}</h3>
          <h3>Total de ganancias: {formatCurrency(saleTwoDays.salesFromToday?.totalAmount, 'ARS')}</h3>
        </div>
      </div>
    </div>
  )
}
