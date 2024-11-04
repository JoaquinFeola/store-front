import { ProductsContext, SuppliersContext, CategoriesContext } from "@/context";
import { useForm } from "@/hooks/useForm";
import { InputLabel, SelectWithFilter, Button, Table, TableHead, TableRow, TableCell, TableBody, NoRegistries } from "@/ui/components";
import React, { useContext, useState, FormEvent, useEffect } from "react";
import { ProductsTableItem } from "./ProductsTableItem";


interface ListProductsProps {
    isFiltersOpen: boolean;
}


export const ListProducts = React.memo(({ isFiltersOpen }: ListProductsProps) => {
    const {
        products,
        productsPagination,
        handleNextPage,
        handlePreviousPage,
        isProductsLoading,
        handleSearch,
        searchPagination,
        getProductsPaginated
    } = useContext(ProductsContext);

    const {
        formState,
        assignAllNewValues,
        resetFormValues,
        onInputWrite,

    } = useForm({
        sku: '',
        supplierId: 0,
        categoryId: 0,
        barCode: '',
    })


    const { getAllSuppliers } = useContext(SuppliersContext);
    const { getAllCategories } = useContext(CategoriesContext);
    const [suppliers, setSuppliers] = useState<{ img?: string; title: string; id: number }[]>([]);
    const [categories, setCategories] = useState<{ img?: string; title: string; id: number }[]>([]);

    const handleResetFiltersAndSearch = () => {
        resetFormValues();
        handleSearch({
            barcode: '',
            categoryId: 0,
            supplierId: 0,
            sku: ''
        })
    }

    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handleSearch({
            barcode: formState.barCode,
            categoryId: formState.categoryId,
            supplierId: formState.supplierId,
            sku: formState.sku
        })
    }
    const filterSupplier = (id: number) => {


        if (formState.supplierId === id) {
            assignAllNewValues({
                supplierId: 0
            })
            return;
        }
        if (formState.supplierId !== id && formState.supplierId === 0) {
            assignAllNewValues({
                supplierId: id
            })
        } else {
            assignAllNewValues({
                supplierId: id
            })
        }


    };
    const filterCategory = (id: number) => {

        if (formState.categoryId === id) {
            assignAllNewValues({
                categoryId: 0
            });
            return;
        }

        if (formState.categoryId !== id && formState.categoryId === 0) {
            assignAllNewValues({
                categoryId: id
            })
        } else {
            assignAllNewValues({
                categoryId: id
            })
        }

    };

    useEffect(() => {
        const mapCategories = async () => {
            const categoriesGetted = await getAllCategories();
            setCategories(
                categoriesGetted.map(category => ({
                    id: category.id!,
                    title: category.name!,
                    img: '',
                }))

            );
        }
        const mapSuppliers = async () => {
            const suppliersGetted = await getAllSuppliers();
            setSuppliers(
                suppliersGetted.map(supplier => ({
                    id: supplier.id!,
                    title: supplier.name!,
                    img: supplier.image || '',
                }))

            );
        }
        mapSuppliers();
        mapCategories();
    }, []);

    useEffect(() => {
        getProductsPaginated();
    }, [searchPagination.filters]);

    return (
        <div className="mt-6 fadeInUp">
            <div className={`mb-5 flex flex-col relative z-[200] h-0 transition-all duration-200 ${isFiltersOpen ? 'h-auto fadeInUp w-full px-3' : 'overflow-hidden '}`}>
                <div>
                    <h4 className="font-medium text-2xl  px-2 py-2 rounded-md shadow-sm border-b-[1px]">Filtros</h4>
                </div>
                <form onSubmit={onFormSubmit} className={`grid  items-center gap-4   `}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <InputLabel
                            labelText="SKU"
                            placeholder="SKU del producto"
                            onChange={onInputWrite}
                            value={formState.sku}
                            name="sku"
                        />
                        <InputLabel
                            labelText="Código de barra"
                            value={formState.barCode}
                            name="barCode"
                            placeholder="Código de barra del producto"
                            onChange={onInputWrite}
                        />
                        <SelectWithFilter
                            labelText="Categorías"
                            items={categories}
                            select={filterCategory}
                            selectionArr={formState.categoryId === 0 ? [] : [formState.categoryId]}
                        />
                        <SelectWithFilter
                            labelText="Proveedores"
                            items={suppliers}
                            select={filterSupplier}
                            selectionArr={formState.supplierId === 0 ? [] : [formState.supplierId]}
                        />
                        <Button type="submit"><i className="bi bi-search"></i> Buscar</Button>
                        <Button type="button" onClick={handleResetFiltersAndSearch} ><i className="bi bi-arrow-clockwise"></i> Reiniciar filtros</Button>
                    </div>
                </form>

            </div>
            <Table >
                <TableHead >

                    <TableRow className="sticky top-0 z-[100]  bg-white shadow-sm ">

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
                        {/* <TableCell align="left">
                            Precio de compra
                        </TableCell>
                        <TableCell align="left">
                            % de ganancia
                        </TableCell> */}
                        <TableCell align="left">
                            Categorías
                        </TableCell>
                        <TableCell align="left">
                            Proveedor
                        </TableCell>
                        <TableCell align="left">
                            Códigos de barras
                        </TableCell>
                        <TableCell align="center">Estado</TableCell>
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
                        isButtonLoading={isProductsLoading}

                        onClick={handlePreviousPage}
                        className="disabled:bg-slate-100 bi bi-chevron-left bg-transparent transition-all duration-200  rounded-full hover:bg-slate-100">
                    </Button>
                    <Button
                        disabled={productsPagination.pageIndex < productsPagination.totalPages ? false : true}
                        isButtonLoading={isProductsLoading}
                        onClick={handleNextPage}
                        className="disabled:bg-slate-100 bi bi-chevron-right bg-transparent  transition-all duration-200  rounded-full hover:bg-slate-100 ">
                    </Button>
                </div>
            </div>
        </div>

    )
})
