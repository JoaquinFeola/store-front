import { SalesContext } from "@/context";
import { Sale } from "@/interfaces";
import { Table, TableHead, TableRow, TableCell, TableBody, NoRegistries, Button } from "@/ui/components";
import React, { useContext } from "react";
import { SaleTableItem } from "./SaleTableItem";



interface ListSalesProps {
    sales: Sale[]
}

export const ListSales = React.memo(({ sales }: ListSalesProps) => {
    const { isSalesLoading, salesPagination, handleNextPage, handlePreviousPage} = useContext(SalesContext);
    return (
        <div className="mt-6 fadeInUp">

            <Table >
                <TableHead >

                    <TableRow className="sticky top-0 z-[100]  bg-white shadow-sm ">

                        <TableCell className="w-0" align="left">
                            #
                        </TableCell>
                        <TableCell className="w-0" align="center">
                            Fecha de venta
                        </TableCell>
                        <TableCell className="w-0" align="center">
                            Total de venta
                        </TableCell>
                        <TableCell className="w-0" align="center">
                            Metodo de pago
                        </TableCell>
                        <TableCell className="w-0" align="center">
                            Estado
                        </TableCell>
                        <TableCell className="w-0" align="center">
                            Acciones
                        </TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        (isSalesLoading)
                            ? <TableRow colSpan={10}>
                                <TableCell>Cargando...</TableCell>
                            </TableRow>
                            : (sales.length === 0)
                                ? <NoRegistries />
                                : sales?.map((sale) => (
                                    <SaleTableItem
                                        key={sale.id}
                                        sale={sale}
                                    />))
                    }

                </TableBody>
            </Table>
            <div className="px-4 py-4 border-[1px]">
                <div className="flex justify-end items-center gap-4 *:text-gray-800">
                    <div className="flex gap-10">
                        <p>Elementos por pagina: {sales.length}</p>
                        <p>Página {salesPagination.pageIndex} de {salesPagination.totalPages === 0 ? 1 : salesPagination.totalPages} </p>
                    </div>
                    <Button
                        disabled={salesPagination.pageIndex <= 1 ? true : false}
                        isButtonLoading={isSalesLoading}

                        onClick={handlePreviousPage}
                        className="disabled:bg-slate-100 bi bi-chevron-left bg-transparent transition-all duration-200  rounded-full hover:bg-slate-100">
                    </Button>
                    <Button
                        disabled={salesPagination.pageIndex < salesPagination.totalPages ? false : true}
                        isButtonLoading={isSalesLoading}
                        onClick={handleNextPage}
                        className="disabled:bg-slate-100 bi bi-chevron-right bg-transparent  transition-all duration-200  rounded-full hover:bg-slate-100 ">
                    </Button>
                </div>
            </div>
        </div>
    )
})
