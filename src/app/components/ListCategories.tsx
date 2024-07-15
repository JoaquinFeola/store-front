import { useContext, useEffect } from "react";
import { Button, NoRegistries, Table, TableBody, TableCell, TableHead, TableRow } from "../../ui/components"
import { CategoriesTableItem } from "./CategoriesTableItem"
import { CategoriesContext } from "../../context";

export const ListCategories = () => {


    const { categories, categoriesPagination, getCategoriesPaginated, 
        handlePreviousPage, handleNextPage, categoriesPageIndexInternal,
        isCategoriesLoading
    } = useContext(CategoriesContext);

    useEffect(() => {
        getCategoriesPaginated();
        
    }, [categoriesPageIndexInternal])

    return (
        <div className="mt-6 fadeInUp">
            <Table >
                <TableHead>
                    <TableRow className="sticky top-0 bg-white shadow-sm">
                        <TableCell className="w-0" align="left">
                            #
                        </TableCell>
                        <TableCell align="left">
                            Categoría
                        </TableCell>
                        <TableCell align="center">
                            Acciones
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        (isCategoriesLoading == true)
                            ? <TableRow><TableCell colSpan={10}>Cargando</TableCell></TableRow>
                            : (categories.length == 0)
                                ? <NoRegistries />
                                : categories.map((category) => <CategoriesTableItem key={category.id} category={category} />)
                    }

                </TableBody>
            </Table>
            <div className="px-4 py-4 border-[1px]">
                <div className="flex justify-end items-center gap-4 *:text-gray-800">
                    <div className="flex gap-10">
                        <p>Elementos por pagina: {categories?.length}</p>
                        <p>Página {categoriesPagination.pageIndex} de {(categoriesPagination.totalPages === 0) ? 1 : categoriesPagination.totalPages}</p>
                    </div>
                    <Button
                        onClick={handlePreviousPage}
                        disabled={categoriesPagination.pageIndex <= 1 ? true : false}
                        className="disabled:bg-slate-50 bi bi-chevron-left bg-transparent transition-all duration-200  rounded-full hover:bg-slate-100">
                    </Button>
                    <Button
                        onClick={handleNextPage}
                        disabled={categoriesPagination.pageIndex < categoriesPagination.totalPages ? false : true}
                        className="disabled:bg-slate-50 bi bi-chevron-right bg-transparent  transition-all duration-200  rounded-full hover:bg-slate-100 ">
                    </Button>
                </div>
            </div>
        </div>

    )
}
