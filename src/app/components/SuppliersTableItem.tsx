import React, { useContext } from "react"
import { Supplier } from "../../interfaces"
import { Button, TableCell, TableRow } from "../../ui/components"
import { ModalsContext, SuppliersContext } from "../../context";
import { Link } from "react-router-dom";

interface SuppliersTableItemProps {
    supplier: Supplier;
}




export const SuppliersTableItem = React.memo(({ supplier }: SuppliersTableItemProps) => {
    const { deleteSupplier } = useContext(SuppliersContext);

    const { newModal } = useContext(ModalsContext);


    const openDeleteModal = () => {
        newModal({
            submitFunc: async () => { await deleteSupplier(supplier.id!); },
            confirmLabel: 'Eliminar',
            title: `¿Estás seguro que desesas eliminar este proveedor?`
        })
    }

    return (
        <TableRow className="border-b last:border-b-0">
            <TableCell className="font-medium" align="left">{supplier.id}</TableCell>
            <TableCell align="center">{(supplier.image) ? <img className="max-w-12" src={supplier.image} alt="" /> : <span >Sin imagen</span>}</TableCell>
            <TableCell align="left">{supplier.name}</TableCell>
            <TableCell align="center">{supplier.busisnessName}</TableCell>
            <TableCell align="center">{supplier.telephone}</TableCell>
            <TableCell align="center">{supplier.email}</TableCell>
            <TableCell align="center">
                <Link to={`edit/${supplier.id}`}>
                    <Button className="ml-3 rounded-sm shadow-md" >
                        <i className="bi bi-pencil-square"></i>
                    </Button>
                </Link>
                <Button onClick={openDeleteModal} className="ml-3 rounded-sm hover:bg-red-600 bg-red-500 shadow-md ">
                    <i className="bi bi-trash3"></i>
                </Button>
            </TableCell>

        </TableRow>
    )
})
