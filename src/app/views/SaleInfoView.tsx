import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { SalesContext } from "../../context/SalesContext";
import { Sale, SaleInSaleDetail } from "../../interfaces";
import { LoadingInfo } from "../../ui/components/loadings/LoadingInfo";
import { NoRegistries, Table, TableBody, TableCell, TableHead, TableRow } from "../../ui/components";
import { formatCurrency } from "../../utils/currency.util";












interface SalesInfoItemsTableProps {
  sale: SaleInSaleDetail[]
}

const SalesInfoItemsTable = ({ sale }: SalesInfoItemsTableProps) => {

  return (
    <div className="mt-3 ">

      <Table className="text-black">
        <TableHead>
          <TableRow>
            <TableCell>SKU</TableCell>
            <TableCell>Imagen</TableCell>
            <TableCell>Item</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Cantidad</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            (sale.length == 0)
              ? <NoRegistries />
              : sale.map(({ product, quantity }) => (
                <TableRow key={product.id} size="little" >
                  <TableCell>
                    {product.sku}
                  </TableCell>
                  <TableCell>
                    {
                      (product.image)
                        ? <img width={50} className="" src={product.image} />
                        : <span>Sin imagen</span>
                    }
                  </TableCell>
                  <TableCell>
                    {product.description}
                  </TableCell>
                  <TableCell>
                    {formatCurrency(product.salePrice, 'ARS')}
                  </TableCell>
                  <TableCell className="">
                    {quantity}
                  </TableCell>
                  <TableCell>
                    {
                      formatCurrency(parseFloat((product.salePrice * quantity).toFixed(2)), 'ARS')
                    }
                  </TableCell>

                </TableRow>
              ))
          }
        </TableBody>
      </Table>
    </div>
  )
}




export const SaleInfoView = () => {
  const { saleId } = useParams();
  const { getSaleById } = useContext(SalesContext);
  const [sale, setSale] = useState<null | Sale>({} as Sale);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSale = async () => {
      setIsLoading(true);
      const resp = await getSaleById(parseInt(saleId!));
      setIsLoading(false);

      setSale(resp)
    }
    loadSale()
  }, [getSaleById, saleId]);

  if (isLoading) return <LoadingInfo />
  if (sale == null) return (<div>Ocurrió un error inesperado al cargar la venta</div>);


  return (
    <div>
      <div className="">
        <h4 className="text-center font-medium text-3xl">Información de la venta</h4>
        <hr className="mt-1" />
        <div className="h-[50vh] overflow-auto">
          <SalesInfoItemsTable sale={sale.salesDetail} />
        </div>
          <div>
            <h3 className="font-medium text-2xl mt-10 text-end ">Total de venta: {sale.total}</h3>
          </div>
      </div>
    </div>
  )
}
