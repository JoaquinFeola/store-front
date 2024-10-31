import { useEffect } from "react";
import { useAdjustmenStock } from "../../hooks/useAdjustmenStock"
import {  Button, Table, TableBody, TableCell, TableHead, TableRow } from "../../ui/components"




export const ListAdjustment = () => {

    const {  
        adjustmentStockPagination, 
        handleNextPage, 
        handlePreviousPage, 
        isLoading,
        adjustmentStock,
        getAdjustmentStockPaginated
    } = useAdjustmenStock();
    

    
    useEffect(() => {
        getAdjustmentStockPaginated()
    }, [])
    
    return (
        <div className="mt-6    ">
            <Table className=" border-[2px]">
                <TableHead >

                    <TableRow className="sticky top-0 z-[100]  bg-white shadow-sm ">

                        <TableCell align="left">
                            #
                        </TableCell>
                        <TableCell align="left">
                            ProductoId
                        </TableCell>
                        <TableCell align="left">
                            Tipo de ajuste
                        </TableCell>
                        <TableCell align="left">
                            Cantidad
                        </TableCell>
                        <TableCell align="left">
                            Motivo
                        </TableCell>
                        <TableCell align="left">
                            Acciones
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        adjustmentStock.map((stock, index) => (
                            <TableRow key={index} className="border-b-[1px] border-gray-200 ">
                                <TableCell align="left">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left">
                                    {stock.productId}
                                </TableCell>
                                <TableCell align="left">
                                    {stock.quantity}
                                </TableCell>
                                <TableCell align="left">
                                    <Button
                                        isButtonLoading={isLoading}
                                        className="bi bi-pencil-square bg-transparent rounded-full hover:bg-slate-100 transition-all duration-200">
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <div className="px-4 py-4 border-[1px]">
                <div className="flex justify-end items-center gap-4 *:text-gray-800">
                    <div className="flex gap-10">
                        <p>Elementos por pagina: {adjustmentStock.length}</p>
                        <p>Página {adjustmentStockPagination.pageIndex} de {adjustmentStockPagination.totalPages === 0 ? 1 : adjustmentStockPagination.totalPages} </p>
                    </div>
                    
                    <Button
                        disabled={adjustmentStockPagination.pageIndex <= 1 ? true : false}
                        isButtonLoading={isLoading}

                        onClick={handlePreviousPage}
                        className="disabled:bg-slate-100 bi bi-chevron-left bg-transparent transition-all duration-200  rounded-full hover:bg-slate-100">
                    </Button>
                    <Button
                        disabled={adjustmentStockPagination.pageIndex < adjustmentStockPagination.totalPages ? false : true}
                        isButtonLoading={isLoading}
                        onClick={handleNextPage}
                        className="disabled:bg-slate-100 bi bi-chevron-right bg-transparent  transition-all duration-200  rounded-full hover:bg-slate-100 ">
                    </Button>
                </div>
            </div>
        </div>
    )
}
