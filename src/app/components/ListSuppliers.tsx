import React, { useContext, useEffect } from "react";
import { Button, NoRegistries, Table, TableBody, TableCell, TableHead, TableRow } from "../../ui/components"
import { SuppliersContext } from "../../context";
import { SuppliersTableItem } from "./SuppliersTableItem";

export const ListSuppliers = React.memo(() => {
    const { 
        suppliers, 
        suppliersPagination, 
        isSuppliersLoading, 
        suppliersPageIndexInternal,
        handleNextPage, 
        handlePreviousPage ,
        getSuppliersPaginated,
    } = useContext(SuppliersContext);


    useEffect(() => {
        getSuppliersPaginated();
    }, [suppliersPageIndexInternal]);

    return (
        <div className="mt-6 fadeInUp">
            <Table >
                <TableHead>

                    <TableRow className="sticky top-0 z-[100]  bg-white shadow-sm">
                        
                        <TableCell className="w-0" align="left">
                            #
                        </TableCell>
                        <TableCell className="" align="left">
                            Imagen
                        </TableCell>
                        <TableCell align="left" >
                            Proveedor
                        </TableCell>
                        <TableCell align="center">
                            Nombre de empresa
                        </TableCell>
                        <TableCell align="center">
                            Teléfono
                        </TableCell>


                        <TableCell align="center">
                            Correo electrónico
                        </TableCell>
                        <TableCell align="center">Estado</TableCell>
                        <TableCell align="center">
                            Acciones
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                        (isSuppliersLoading)
                            ? <TableRow colSpan={10}>
                                <TableCell>Cargando...</TableCell>
                            </TableRow>
                            : (suppliers.length === 0)
                                ? <NoRegistries />
                                : suppliers.map((supplier) => (
                                    <SuppliersTableItem
                                        key={supplier.id}
                                        supplier={supplier}
                                    />))
                    }

                </TableBody>
            </Table>
            <div className="px-4 py-4 border-[1px]">
                <div className="flex justify-end items-center gap-4 *:text-gray-800">
                    <div className="flex gap-10">
                        <p>Elementos por pagina: {suppliers.length}</p>
                        <p>Página {suppliersPagination.pageIndex} de {suppliersPagination.totalPages === 0 ? 1 : suppliersPagination.totalPages} </p>
                    </div>
                    <Button
                        disabled={suppliersPagination.pageIndex <= 1 ? true : false}

                        onClick={handlePreviousPage}
                        className="disabled:bg-slate-100 bi bi-chevron-left bg-transparent transition-all duration-200  rounded-full hover:bg-slate-100">
                    </Button>
                    <Button
                        disabled={suppliersPagination.pageIndex < suppliersPagination.totalPages ? false : true}

                        onClick={handleNextPage}
                        className="disabled:bg-slate-100 bi bi-chevron-right bg-transparent  transition-all duration-200  rounded-full hover:bg-slate-100 ">
                    </Button>
                </div>
            </div>
        </div>

    )
})
