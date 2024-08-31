import { BulkCreateStock } from "../../interfaces/stock.interfaces"
import { NoRegistries, Table, TableBody, TableCell, TableHead, TableRow } from "../../ui/components"




interface ListImportedStockProps {
    stockImported: BulkCreateStock[];
    errorsList: string[]
}

interface ImportedStockTableItemProps {
    stock: BulkCreateStock;
    hasRowError: boolean
}
const ImportedStockTableItem = ({ stock, hasRowError = false }: ImportedStockTableItemProps) => {
    return (
        <TableRow  style={{
            ...hasRowError
                ? {
                    backgroundColor: '#f87171',
                    color: '#fff'
                }
                : {}
        }}>
            <TableCell>
                {stock.productId}
            </TableCell>
            <TableCell>
                {stock.quantity}
            </TableCell>
            <TableCell>
                {stock.quantity}
            </TableCell>
        </TableRow>
    )
}

export const ListImportedStock = ({ stockImported, errorsList }: ListImportedStockProps) => {
    
        const errorsListMapped = errorsList.map(value => {
            return value.match(/\d+/g)
        })
        


    return (
        <div className="mt-6    ">
            <Table className=" border-[2px]">
                <TableHead >

                    <TableRow className="sticky top-0 z-[100]  bg-white shadow-sm ">
                        <TableCell align="left">
                            Id del producto
                        </TableCell>
                        <TableCell align="left">
                            Cantidad
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        (stockImported.length === 0)
                            ? <NoRegistries />
                            : stockImported.map((stock, index) => (
                                <ImportedStockTableItem
                                    hasRowError={errorsListMapped.findIndex(val => parseInt(val![0]) == index + 1 && parseInt(val![1]) == stock.productId) !== -1 ? true : false}
                                    stock={stock}
                                    key={`${stock.productId}${index + 1}`}
                                />))
                    }

                </TableBody>
            </Table>
        </div>
    )
}
