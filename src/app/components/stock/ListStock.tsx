import { ProductsContext, StockContext } from "@/context";
import { useForm } from "@/hooks/useForm";
import { InputLabel, SelectWithFilter, Button, Table, TableHead, TableRow, TableCell, TableBody, NoRegistries } from "@/ui/components";
import React, { useContext, useState, FormEvent, useEffect } from "react";
import { StockTableItem } from "./StockTableItem";



interface ListStockProps {
    isFiltersOpen: boolean;
}


export const ListStock = React.memo(({ isFiltersOpen }: ListStockProps) => {
    
    const { getAllProducts } = useContext(ProductsContext);
    
    const {
        stockList,
        stockPagination,
        handleNextPage,
        handlePreviousPage,
        isStockLoading,
        handleSearch,
        searchPagination,
        getStockPaginated,
    } = useContext(StockContext);

    const {
        formState,
        assignAllNewValues,
        resetFormValues,
        onInputWrite,

    } = useForm({
        productId: 0,
        barCode: '',
    })

    const [products, setProducts] = useState<{ img?: string; title: string; id: number }[]>([]);


    const handleResetFiltersAndSearch = () => {
        resetFormValues();
        handleSearch({
            barcode: '',
            productId: 0,
        })
    }
    
    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        handleSearch({
            barcode: formState.barCode,
            productId: formState.productId,
        });
    }
    const filterProduct = (id: number) => {


        if (formState.productId === id) {
            assignAllNewValues({
                productId: 0
            })
            return;
        }
        if (formState.productId !== id && formState.productId === 0) {
            assignAllNewValues({
                productId: id
            })
        } else {
            assignAllNewValues({
                productId: id
            })
        }


    };


    useEffect(() => {
        
        const mapProducts = async () => {
            const suppliersGetted = await getAllProducts();
            setProducts(
                suppliersGetted.map(supplier => ({
                    id: supplier.id!,
                    title: supplier.sku!,
                    img: supplier.image || '',
                }))

            );
        }
        mapProducts();
    }, []);

    useEffect(() => {
        getStockPaginated();

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
                            labelText="Código de barra"
                            value={formState.barCode}
                            name="barCode"
                            placeholder="Código de barra del producto"
                            onChange={onInputWrite}
                        />
                        
                        <SelectWithFilter
                            labelText="Productos"
                            items={products}
                            select={filterProduct}
                            selectionArr={formState.productId === 0 ? [] : [formState.productId]}
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

                        <TableCell align="left">
                            IdProducto
                        </TableCell>
                        <TableCell align="left">
                            SKU 
                        </TableCell>
                        <TableCell align="left">
                            Códigos de barras 
                        </TableCell>
                        <TableCell align="left">
                            Stock 
                        </TableCell>
                      
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                    {
                        (isStockLoading)
                            ? <TableRow colSpan={10}>
                                <TableCell>Cargando...</TableCell>
                            </TableRow>
                            : (stockList.length === 0)
                                ? <NoRegistries />
                                : stockList.map((stock) => (
                                    <StockTableItem
                                        stock={stock}
                                        key={stock.id}
                                    />))
                    }

                </TableBody>
            </Table>
            <div className="px-4 py-4 border-[1px]">
                <div className="flex justify-end items-center gap-4 *:text-gray-800">
                    <div className="flex gap-10">
                        <p>Elementos por pagina: {stockList.length}</p>
                        <p>Página {stockPagination.pageIndex} de {stockPagination.totalPages === 0 ? 1 : stockPagination.totalPages} </p>
                    </div>
                    
                    <Button
                        disabled={stockPagination.pageIndex <= 1 ? true : false}
                        isButtonLoading={isStockLoading}

                        onClick={handlePreviousPage}
                        className="disabled:bg-slate-100 bi bi-chevron-left bg-transparent transition-all duration-200  rounded-full hover:bg-slate-100">
                    </Button>
                    <Button
                        disabled={stockPagination.pageIndex < stockPagination.totalPages ? false : true}
                        isButtonLoading={isStockLoading}
                        onClick={handleNextPage}
                        className="disabled:bg-slate-100 bi bi-chevron-right bg-transparent  transition-all duration-200  rounded-full hover:bg-slate-100 ">
                    </Button>
                </div>
            </div>
        </div>

    )
})
