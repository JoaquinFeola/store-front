import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { SalesContext } from "../../context/SalesContext";
import { Sale } from "../../interfaces";

export const SaleInfoView =  () => {
  const { saleId } = useParams();
  const { getSaleById } = useContext(SalesContext);
  const [ sale, setSale] = useState<null | Sale>({} as Sale);

  const loadSale = async() => {
    const resp = await getSaleById(parseInt(saleId!));
    console.log(resp);
    
    setSale(resp)
  }

  useEffect(() => {
    loadSale()
  }, [])

  if (sale == null) return <div>Ocurrió un error inesperado al cargar la venta</div>


  return (
    <div>
      <div className="">
        <h4>Compra</h4>
      </div>
    </div>
  )
}
