import { ProductToImport } from "@/interfaces/product.interfaces";
import { TableRow, TableCell, Button } from "@/ui/components";
import { formatCurrency } from "@/utils/currency.util";

interface Props {
    product: ProductToImport;
    hasRowError: boolean;
    index: number;
    handleDeleteRow: (index: number, isErrorRow: boolean) => void;

}

export const ImportedProductTableItem = ({ product, hasRowError = false, handleDeleteRow, index }: Props) => {

    const salePrice = (product.purchasePrice + product.percentageProfit) / 100;
    return (
        <TableRow style={{
            ...hasRowError
                ? {
                    backgroundColor: '#f87171',
                    color: '#fff'
                }
                : {}
        }}>

            <TableCell>
                {product.sku}
            </TableCell>
            <TableCell>
                {product.description}
            </TableCell>
            <TableCell>
                {product.barCode}
            </TableCell>
            <TableCell>
                {product.supplierId}
            </TableCell>
            <TableCell>
                {product.categoryId}
            </TableCell>
            <TableCell>
                {formatCurrency(salePrice, 'ARS')}
            </TableCell>
            <TableCell>
                <Button onClick={() => handleDeleteRow(index, hasRowError)} type="button" className="hover:bg-red-600 bg-red-500 rounded-sm"><i className="bi bi-trash"></i></Button>
            </TableCell>
        </TableRow>
    )
}
