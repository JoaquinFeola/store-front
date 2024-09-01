import { BulkCreateStock } from "../../interfaces/stock.interfaces"
import { Button, NoRegistries, Table, TableBody, TableCell, TableHead, TableRow } from "../../ui/components"




interface ListImportedStockProps {
    stockImported: BulkCreateStock[];
    errorsList: string[];
    setErrorsList: React.Dispatch<React.SetStateAction<string[]>>;
    setStockExcelImported: React.Dispatch<React.SetStateAction<BulkCreateStock[]>>
}

interface ImportedStockTableItemProps {
    stock: BulkCreateStock;
    hasRowError: boolean;
    handleDeleteRow: (index: number, isErrorRow: boolean) => void;
    index: number;
}
const ImportedStockTableItem = ({ stock, hasRowError = false, handleDeleteRow, index }: ImportedStockTableItemProps) => {
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
                {stock.productId}
            </TableCell>
            <TableCell>
                {stock.quantity}
            </TableCell>
            <TableCell>
                <Button onClick={() => handleDeleteRow(index, hasRowError)} type="button" className="hover:bg-red-600 bg-red-500 rounded-sm"><i className="bi bi-trash"></i></Button>
            </TableCell>
        </TableRow>
    )
}

export const ListImportedStock = ({ stockImported, errorsList, setStockExcelImported , setErrorsList}: ListImportedStockProps) => {

    const errorsListMapped = errorsList.map(value => {
        return value.match(/\d+/g)
    })

    

    const handleDeleteRow = (index: number, isErrorRow: boolean) => {

        if ( isErrorRow ) {
            const errorIndex = errorsListMapped.indexOf(errorsListMapped[index]);
            setErrorsList(errorsList.toSpliced(errorIndex, 1))
        }

        setStockExcelImported(
            stockImported.toSpliced(index, 1)
        )
    }


    return (
        <div className="mt-6 ">
            <Table className=" border-[2px]">
                <TableHead >

                    <TableRow className="sticky top-0 z-[100]  bg-white shadow-sm ">
                        <TableCell align="left">
                            Id del producto
                        </TableCell>
                        <TableCell align="left">
                            Cantidad
                        </TableCell>
                        <TableCell align="left">
                            Acciones
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        (stockImported.length === 0)
                            ? <NoRegistries />
                            : stockImported.map((stock, index) => (
                                <ImportedStockTableItem
                                    index={index}
                                    handleDeleteRow={handleDeleteRow}
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
