import { LineChart } from '../LineChart'
import { months } from '../../../consts/datetimes-consts'
import { useContext, useEffect, useState } from 'react';
import { ChartData } from 'chart.js';
import { SalesContext } from '../../../context/SalesContext';


export const YearSalesGraphic = () => {
    
    const { getSalesForHomeYear } = useContext(SalesContext);
    const [_, setError ] = useState('')

    const [salesData, setSalesData] = useState<ChartData<"line">>({
        labels: ['Ayer', 'Hoy'],
        datasets: [
          {
            label: "Ventas",
            data: [3,324,4],
            backgroundColor: "rgb(20,200,150)",
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 2,
          },
        ],
      });


      const onInitial = async () => {
        const resp = await getSalesForHomeYear()
        console.log(resp);  
        
        if (resp === null) return setError('Ocurrió un error al intentar cargar las ventas');
        setSalesData({
          labels: months,
          datasets: [
            {
              label: "Ganancias",
              data: resp.salesMonth,
              backgroundColor: "rgb(20,200,150)",
              borderColor: "rgb(75, 192, 192)",
              borderWidth: 2,
              tension: .1,
              fill: false
            },
          ],
        })
      }
    
      useEffect(() => {
        onInitial()
      }, [])

  return (
        <div className='w-full'>
            <LineChart 
                chartData={salesData}
            />
        </div>

  )
}
