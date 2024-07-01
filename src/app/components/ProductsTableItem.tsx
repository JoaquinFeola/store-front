import React, { useContext } from "react"
import { Button, TableCell, TableRow } from "../../ui/components"
import { Product } from "../../interfaces/product.interfaces"
import { Tooltip } from "../../ui/components/tooltip/Tooltip"
import { ModalsContext, ProductsContext } from "../../context"
import { Link } from "react-router-dom"

interface ProductsTableItemProps {
    product: Product
}

export const ProductsTableItem = React.memo(({ product }: ProductsTableItemProps) => {

    const { deleteProduct } = useContext(ProductsContext);
    const { newModal } = useContext(ModalsContext);


    const openDeleteModal = () => {
        newModal({
            submitFunc: async () => { await deleteProduct(product.id!); },
            confirmLabel: 'Eliminar',
            title: `¿Estás seguro que desesas eliminar este producto?`
        })
    }

    const formatCurrency = (value: number, currency: string) => {
        return new Intl.NumberFormat('es-ar', {
            style: 'currency',
            currency: currency
        }).format(value);
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
                                <img className="cursor-pointer object-contain h-12 w-16" src={product.image} alt={product.description} />
                            </Tooltip>
                        )
                        : 'Sin imagen'
                }

            </TableCell>
            <TableCell>
                {product.sku}
            </TableCell>
            <TableCell  align="left">
                {product.description}
            </TableCell>
            <TableCell align="left">
                {formatCurrency(product.salePrice, 'ARS')}
            </TableCell>
            <TableCell align="left">
                {formatCurrency(product.purchasePrice, 'ARS')}
            </TableCell>
            <TableCell align="left">
                {product.percentageProfit + '%'}
            </TableCell>
            <TableCell align="left">
                <div className="flex gap-3 items-center">
                    {
                        product.productCategories?.length === 0
                        ? 'Sin categorías'
                        : product.productCategories?.slice(0, 2).map((pc) => 
                            <div key={pc.category.id} className="bg-slate-100 px-2 py-1 rounded-md">
                                {pc.category.name}
                            </div>
                        )
                    }
                    {
                        (product.productCategories !== undefined  )
                         && (product.productCategories.length > 2)
                                        && <Link to={`product/${product.id}`} className="text-blue-500 hover:underline">Ver mas...</Link>    
                    }
                </div>
            </TableCell>
            <TableCell align="left">
            <div className="flex gap-3 items-center">
                    {
                        product.productProviders?.length === 0
                        ? 'Sin categorías'
                        : product.productProviders?.slice(0, 2).map((pv) => 
                            <div key={pv.provider.id} className="bg-slate-100 px-2 py-1 rounded-md">
                                {pv.provider.name}
                            </div>
                        )
                    }
                    {
                        (product.productProviders !== undefined  )
                         && (product.productProviders.length > 2)
                                        && <Link to={`product/${product.id}`} className="text-blue-500 hover:underline">Ver mas...</Link>    
                    }
                </div>
            </TableCell>
            <TableCell align="left">
                <div className="flex gap-3 items-center">
            {
                        product.barCodes?.length === 0
                        ? 'Sin códigos de barras'
                        : product.barCodes?.slice(0, 2).map((bc, i) => 
                            <div key={`${bc.code}${i}`} className="bg-slate-100 px-2 py-1 rounded-md">
                                {bc.code}
                            </div>
                        )
                    }
                    {
                        (product.productProviders !== undefined  )
                         && (product.productProviders.length > 2)
                                        && <Link to={`product/${product.id}`} className="text-blue-500 hover:underline">Ver mas...</Link>    
                    }
                </div>
            </TableCell>
            <TableCell align="left">
                <Button className="rounded-sm">
                    <Link
                        to={`/products/edit/${product.id}`}
                    > 
                        <i className="bi bi-pencil-square"></i>
                    </Link>
                </Button>
                <Button onClick={openDeleteModal} className="bg-red-500 ml-3 rounded-sm hover:bg-red-600 transition-colors duration-150">
                    <i className="bi bi-trash3"></i> 
                </Button>
            </TableCell>
        </TableRow >
    )
})
