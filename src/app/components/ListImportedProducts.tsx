import { Button, NoRegistries, Table, TableBody, TableCell, TableHead, TableRow } from "../../ui/components"
import { ProductToImport } from "../../interfaces/product.interfaces";
import { formatCurrency } from "../../utils/currency.util";




interface ListImportedProductkProps {
    productsImported: ProductToImport[];
    errorsList: string[];
    setErrorsList: React.Dispatch<React.SetStateAction<string[]>>;
    setProductsExcelImported: React.Dispatch<React.SetStateAction<ProductToImport[]>>


}

interface ImportedProductkTableItemProps {
    product: ProductToImport;
    hasRowError: boolean;
    index: number;
    handleDeleteRow: (index: number, isErrorRow: boolean) => void;

}
const ImportedproductkTableItem = ({ product, hasRowError = false, handleDeleteRow, index }: ImportedProductkTableItemProps) => {

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
                {product.providerId}
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

export const ListImportedProducts = ({ productsImported, errorsList, setErrorsList, setProductsExcelImported }: ListImportedProductkProps) => {

    const errorsListMapped = errorsList.map(value => {
        return value.match(/\d+/g)
    })

    const handleDeleteRow = (index: number, isErrorRow: boolean) => {

        if (isErrorRow) {
            const errorIndex = errorsListMapped.indexOf(errorsListMapped[index]);
            setErrorsList(errorsList.toSpliced(errorIndex, 1))
        }

        setProductsExcelImported((prev) => prev.toSpliced(index, 1))
    }



    return (
        <div className="mt-6 ">
            <Table className=" border-[2px] ">
                <TableHead >

                    <TableRow className="sticky top-0 z-[100]  bg-white shadow-sm ">

                        <TableCell align="left">

                            SKU
                        </TableCell>
                        <TableCell align="left">
                            Descripción
                        </TableCell>
                        <TableCell align="left">
                            Código de barras
                        </TableCell>
                        <TableCell align="left">
                            IdPoveedor
                        </TableCell>
                        <TableCell align="left">
                            IdCategoría
                        </TableCell>
                        <TableCell align="left">
                            Precio de venta
                        </TableCell>


                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        (productsImported.length === 0)
                            ? <NoRegistries />
                            : productsImported.map((product, index) => (
                                <ImportedproductkTableItem
                                    handleDeleteRow={handleDeleteRow}
                                    hasRowError={errorsListMapped.findIndex(val => parseInt(val![0]) == index + 1 && parseInt(val![1]) == product.productId) !== -1 ? true : false}
                                    product={product}
                                    index={index}
                                    key={`${product.productId}${index + 1}`}
                                />))
                    }

                </TableBody>
            </Table>
        </div>
    )
}
