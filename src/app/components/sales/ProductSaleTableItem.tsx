import { ProductInCart } from "@/interfaces"
import { TableRow, TableCell, Button } from "@/ui/components"
import { formatCurrency } from "@/utils/currency.util"

interface Props {
    product: ProductInCart;
    aumentOrDecrementProductQuantity: (id: number, isDecrementing?: boolean) => void;
    handleRetireProduct: (id: number) => void 
}

export const ProductSaleTableItem = ({ product, aumentOrDecrementProductQuantity, handleRetireProduct }: Props) => {
    return (
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
                <Button onClick={() => aumentOrDecrementProductQuantity(product.id, true)} type="button" className="bg-transparent hover:bg-slate-100 rounded-full mr-1 " style={{ color: 'black' }}>-</Button>
                {product.quantity}
                <Button onClick={() => aumentOrDecrementProductQuantity(product.id)} style={{ color: 'black' }} type="button" className="ml-1 rounded-full hover:bg-slate-100 bg-transparent">+</Button>
            </TableCell>
            <TableCell>
                {
                    formatCurrency(parseFloat((product.salePrice * product.quantity).toFixed(2)), 'ARS')
                }
            </TableCell>
            <TableCell>
                <Button type="button" style={{ color: 'black' }} className="bg-transparent text-black hover:bg-slate-100 rounded-full" onClick={() => handleRetireProduct(product.id)}>
                    <i className="bi bi-trash text-red-600"></i>
                </Button>

            </TableCell>
        </TableRow>
    )
}
