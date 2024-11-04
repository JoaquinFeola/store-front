import { SalesContext } from "@/context/SalesContext";
import { SaleForHome } from "@/interfaces";
import { LoadingInfo } from "@/ui/components/loadings/LoadingInfo";
import { formatCurrency } from "@/utils/currency.util";
import { useContext, useEffect, useState } from "react";




export const TwoDaySalesGraphic = () => {
  const { getSalesForHome } = useContext(SalesContext);
  const [saleTwoDays, setSaleTwoDays] = useState<SaleForHome>({} as SaleForHome)
  const [isLoading, setIsLoading] = useState(false)
  

  const onInitial = async () => {
    setIsLoading(true)
    const resp = await getSalesForHome()
    console.log(resp);
    if (resp === null) return setIsLoading(false);
    setSaleTwoDays(resp.data)
    setIsLoading(false)

   
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
