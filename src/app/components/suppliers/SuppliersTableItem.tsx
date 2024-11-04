import { SuppliersContext, ModalsContext } from "@/context";
import { Supplier } from "@/interfaces";
import { TableRow, TableCell, FullScreenImage, Button } from "@/ui/components";
import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";


interface Props {
    supplier: Supplier;
}




export const SuppliersTableItem = React.memo(({ supplier }: Props) => {
    const { deleteSupplier } = useContext(SuppliersContext);

    const { newModal } = useContext(ModalsContext);
    const [imgSrc, setImgSrc] = useState<null | string>(null);

    const visualizeImageBig = (img: string) => {
        setImgSrc(img);
    }

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
            <TableCell align="center">
                {
                    (supplier.image)
                        ? <img

                            onClick={() => visualizeImageBig(supplier.image!)}
                            className="max-w-12 cursor-pointer"
                            src={supplier.image}
                            alt=""
                        />
                        : <span >Sin imagen</span>
                }
                {
                    (imgSrc) && createPortal(
                        <FullScreenImage closeBtn={() => setImgSrc(null)} src={imgSrc} />,
                        document.body
                    )
                }
            </TableCell>
            <TableCell align="left">{supplier.name}</TableCell>
            <TableCell align="center">{supplier.busisnessName}</TableCell>
            <TableCell align="center">{supplier.telephone}</TableCell>
            <TableCell align="center">{supplier.email}</TableCell>
            <TableCell align="center" >
                <span className={`${!supplier.isDeleted ? 'text-green-600' : 'text-red-600'}`}>{!supplier.isDeleted ? 'Activo' : 'Inactivo'}</span>
                {/* <div className={`${category.isDeleted ? 'bg-green-400' : 'bg-red-400'} w-[15px] shadow-md h-[15px] rounded-full `}></div> */}
            </TableCell>
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
