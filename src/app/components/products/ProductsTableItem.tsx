import { ProductsContext, ModalsContext } from "@/context";
import { Product } from "@/interfaces/product.interfaces";
import { TableRow, TableCell, FullScreenImage, Button } from "@/ui/components";
import { TextBadge } from "@/ui/components/alerts/TextBadge";
import { formatCurrency } from "@/utils/currency.util";
import { Tooltip } from "@/ui/components/";
import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";


interface Props {
    product: Product
}

export const ProductsTableItem = React.memo(({ product }: Props) => {

    const { deleteProduct } = useContext(ProductsContext);
    const { newModal } = useContext(ModalsContext);
    const [imgSrc, setImgSrc] = useState<null | string>(null);

    const visualizeImageBig = (img: string) => {
        setImgSrc(img);
    }

    const openDeleteModal = () => {
        newModal({
            submitFunc: async () => { await deleteProduct(product.id!); },
            confirmLabel: 'Eliminar',
            title: `¿Estás seguro que desesas eliminar este producto?`
        })
    }


    return (
        <TableRow className="border-b-[1px] last:border-b-transparent max-h-20 h-20 min-h-20">
            <TableCell className="font-medium">
                {product.id}
            </TableCell>
            <TableCell>
                {
                    product.image
                        ? (
                            <Tooltip title="Visualizar en grande">
                                <img onClick={() => visualizeImageBig(product.image!)} className="cursor-pointer object-contain h-12 w-16" src={product.image} alt={product.description} />

                            </Tooltip>
                        )
                        : 'Sin imagen'
                }
                {
                    (imgSrc) && createPortal(
                        <FullScreenImage closeBtn={() => setImgSrc(null)} src={imgSrc} />,
                        document.body
                    )
                }
            </TableCell>
            <TableCell>
                {product.sku}
            </TableCell>
            <TableCell align="left">
                {product.description}
            </TableCell>
            <TableCell align="left">
                {formatCurrency(product.salePrice, 'ARS')}
            </TableCell>
            {/* <TableCell align="left">
                {formatCurrency(product.purchasePrice, 'ARS')}
            </TableCell>
            <TableCell align="left">
                {product.percentageProfit + '%'}
            </TableCell> */}
            <TableCell align="left">
                <div className="flex gap-3 items-center">
                    {
                        product.productCategories?.length === 0
                            ? 'Sin categorías'
                            : product.productCategories?.slice(0, 2).map((pc, i) => (
                                <TextBadge
                                    key={i.toString() + pc.category}
                                    text={pc.category.name!}
                                />
                            ))
                    }
                    {
                        (product.productCategories !== undefined)
                        && (product.productCategories.length > 2)
                        && <Link to={`${product.id}`} className="text-blue-500  hover:underline">Más...</Link>
                    }
                </div>
            </TableCell>
            <TableCell align="left">
                {
                    (product.supplier === null)
                        ? 'Sin proveedor'
                        : product.supplier?.name
                }
            </TableCell>
            <TableCell align="left">
                <div className="flex gap-3 items-center">
                    {
                        product.barCodes?.length === 0
                            ? 'Sin códigos de barras'
                            : product.barCodes?.slice(0, 2).map((bc, i) => <TextBadge key={i.toString() + bc.code} text={bc.code} />)
                    }
                    {
                        (product.barCodes !== undefined)
                        && (product.barCodes.length > 2)
                        && <Link to={`${product.id}`} className="text-blue-500  hover:underline">Más...</Link>
                    }
                </div>
            </TableCell>
            <TableCell align="center" >
                <span className={`${!product.isDeleted ? 'text-green-600' : 'text-red-600'}`}>{!product.isDeleted ? 'Activo' : 'Inactivo'}</span>
                {/* <div className={`${category.isDeleted ? 'bg-green-400' : 'bg-red-400'} w-[15px] shadow-md h-[15px] rounded-full `}></div> */}
            </TableCell>
            <TableCell align="left">
                <Link to={`${product.id}`} className="mr-3">
                    <Button className="ml-3 rounded-sm bg-transparent hover:bg-slate-300 hover:shadow-sm ">
                        <i className="bi bi-search text-black text-md"></i>
                    </Button>
                </Link>
                <Link to={`/products/edit/${product.id}`} >
                    <Button className="rounded-sm">
                        <i className="bi bi-pencil-square"></i>
                    </Button>
                </Link>
                <Button onClick={openDeleteModal} className="bg-red-500 ml-3 rounded-sm hover:bg-red-600 transition-colors duration-150">
                    <i className="bi bi-trash3"></i>
                </Button>
            </TableCell>
        </TableRow >
    )
})
