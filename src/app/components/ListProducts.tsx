import { useContext } from "react";
import { Button, NoRegistries, Table, TableBody, TableCell, TableHead, TableRow } from "../../ui/components"
import { ProductsContext } from "../../context";
import { ProductsTableItem } from "./ProductsTableItem";

export const ListProducts = () => {
    const { products, productsPagination, handleNextPage, handlePreviousPage, isProductsLoading } = useContext(ProductsContext);

    return (
        <div className="mt-6">
            <Table >
                <TableHead >
                    <TableRow className="sticky top-0 bg-white ">
                        <TableCell colSpan={40}>
                            <div className="flex items-center gap-4">
                                <input 
                                    type="text"
                                    className="text-md font-normal text-gray-600 py-1 ring-2 ring-gray-500 rounded-md focus:ring-2 focus:outline-none focus:ring-blue-400 transition-all px-4 focus:border-hidden" 
                                    placeholder="Buscar productos"
                                />
                                <Button className="rounded-md py-0 h-10 px-3">
                                    <i className="bi bi-search"></i>
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow className="sticky top-16 z-[100]  bg-white shadow-sm ">

                        <TableCell className="w-0" align="left">
                            #
                        </TableCell>
                        <TableCell className="" align="left">
                            Imagen
                        </TableCell>
                        <TableCell align="left" >
                            SKU
                        </TableCell>
                        <TableCell align="left">
                            Descripción
                        </TableCell>
                        <TableCell align="left">
                            Precio de venta
                        </TableCell>
                        <TableCell align="left">
                            Precio de compra
                        </TableCell>
                        <TableCell align="left">
                            Porcentaje de ganancia
                        </TableCell>
                        <TableCell align="left">
                            Categorias del producto
                        </TableCell>
                        <TableCell align="left">
                            proveedores del producto
                        </TableCell>
                        <TableCell align="left">
                            Códigos de barras
                        </TableCell>
                        <TableCell align="left">
                            Acciones
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        (isProductsLoading)
                            ? <TableRow colSpan={10}>
                                <TableCell>Cargando...</TableCell>
                            </TableRow>
                            : (products.length === 0)
                                ? <NoRegistries />
                                : products.map((product) => (
                                    <ProductsTableItem
                                        key={product.id}
                                        product={product}
                                    />))
                    }

                </TableBody>
            </Table>
            <div className="px-4 py-4 border-[1px]">
                <div className="flex justify-end items-center gap-4 *:text-gray-800">
                    <div className="flex gap-10">
                        <p>Elementos por pagina: {products.length}</p>
                        <p>Página {productsPagination.pageIndex} de {productsPagination.totalPages === 0 ? 1 : productsPagination.totalPages} </p>
                    </div>
                    <Button
                        disabled={productsPagination.pageIndex <= 1 ? true : false}

                        onClick={handlePreviousPage}
                        className="disabled:bg-slate-100 bi bi-chevron-left bg-transparent transition-all duration-200  rounded-full hover:bg-slate-100">
                    </Button>
                    <Button
                        disabled={productsPagination.pageIndex < productsPagination.totalPages ? false : true}

                        onClick={handleNextPage}
                        className="disabled:bg-slate-100 bi bi-chevron-right bg-transparent  transition-all duration-200  rounded-full hover:bg-slate-100 ">
                    </Button>
                </div>
            </div>
        </div>

    )
}
