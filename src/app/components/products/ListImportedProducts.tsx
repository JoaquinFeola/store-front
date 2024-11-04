import { ProductToImport } from "@/interfaces/product.interfaces";
import { TableRow, TableCell,  Table, TableHead, TableBody, NoRegistries } from "@/ui/components";
import { ImportedProductTableItem } from "./ImportedProductTableItem";




interface Props {
    productsImported: ProductToImport[];
    errorsList: string[];
    setErrorsList: React.Dispatch<React.SetStateAction<string[]>>;
    setProductsExcelImported: React.Dispatch<React.SetStateAction<ProductToImport[]>>


}




export const ListImportedProducts = ({ productsImported, errorsList, setErrorsList, setProductsExcelImported }: Props) => {

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
                                <ImportedProductTableItem
                                    handleDeleteRow={handleDeleteRow}
                                    hasRowError={false}
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
