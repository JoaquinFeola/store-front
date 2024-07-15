import { useContext, useEffect, useReducer, useState } from "react";
import { categoriesReducer } from "../reducers/categories.reducer";
import { httpClient } from "../api/axios-config";
import { ApiResponse, Category } from "../interfaces";
import { CATEGORIES_TYPES } from "../consts";
import { AlertsContext } from "../context";



interface CategoriesPaginateResponse {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalSize: number;
    rows: Category[];


}

export const useCategories = () => {

    const [categories, categoriesDispatch] = useReducer(categoriesReducer, []);
    const [ isCategoriesLoading, setIsCategoriesLoading ] = useState(true)
    const { addAlert } = useContext(AlertsContext);
    const [categoriesPageIndexInternal, setCategoriesPageIndexInternal] = useState(1);
    const [categoriesPagination, setCategoriesPagination] = useState({
        pageIndex: 1,
        pageSize: 10,
        totalPages: 0,
        totalSize: 0,
    });

    const handleNextPage = () => {
        if (categoriesPagination.pageIndex >= categoriesPagination.totalPages) return;
        setCategoriesPageIndexInternal(categoriesPageIndexInternal + 1);


    }
    const handlePreviousPage = () => {
        if (categoriesPagination.pageIndex <= 1) return;
        setCategoriesPageIndexInternal(categoriesPageIndexInternal - 1);



    }


    const deleteCategory = async (id: number) => {
        try {
            const { data }: ApiResponse<Category> = await httpClient.delete(`/category/${id}`)
            categoriesDispatch({
                type: CATEGORIES_TYPES.DELETE,
                payload: { id: id } as Category
            });
            addAlert({
                duration: 4000,
                message: data.message,
                type: 'success'
            });
            
            await getCategoriesPaginated();
            if ( categories.length - 1 === 0 ) setCategoriesPageIndexInternal(1);
        }
        catch (error) {

            addAlert({
                duration: 4000,
                message: 'Ocurrió un error inesperado al intentar eliminar una categoría',
                type: 'error',
            })
        }
    };


    const updateCategory = async (newCategory: string, id: number) => {
        try {
            const { data }: ApiResponse<Category> = await httpClient.put(`/category/${id}`, { name: newCategory })
            const newCategoryResponse = data.data;
            categoriesDispatch({
                type: CATEGORIES_TYPES.UPDATE,
                payload: newCategoryResponse
            });
            addAlert({
                duration: 4000,
                message: data.message,
                type: 'success'
            });

            await getCategoriesPaginated();
        }
        catch (error) {

            addAlert({
                duration: 4000,
                message: 'Ocurrió un error inesperado al intentar editar una categoría',
                type: 'error',
            })
        }
    };


    const createCategory = async (newCategory: string) => {
        try {
            const { data }: ApiResponse<Category> = await httpClient.post(`/category`, { name: newCategory })
            const newCategoryResponse = data.data;
            categoriesDispatch({
                type: CATEGORIES_TYPES.CREATE,
                payload: newCategoryResponse
            });
            addAlert({
                duration: 6000,
                message: data.message,
                type: 'success'
            });
            await getCategoriesPaginated()
        }
        catch (error) {

            addAlert({
                duration: 4000,
                message: 'Ocurrió un error inesperado al intentar crear una categoría',
                type: 'error',
            })
        }
    };

    const getCategoriesPaginated = async () => {
        setIsCategoriesLoading(true)
        try {

            const { data }: ApiResponse<CategoriesPaginateResponse> = await httpClient.get(`/category/paginate`, {
                params: {
                    pageSize: 10,
                    pageIndex: categoriesPageIndexInternal
                }
            });
            const { pageIndex, pageSize, rows, totalPages, totalSize } = data.data;
            setCategoriesPagination({
                pageIndex: pageIndex,
                pageSize: 10,
                totalPages: totalPages,
                totalSize: totalSize
            })

            categoriesDispatch({
                type: CATEGORIES_TYPES.INITIALIZER,
                payload: rows,
            })
        }
        catch (error) {

        }
        finally {
            setIsCategoriesLoading(false)
        }
    };

    const getAllCategories = async () => {
        try {

            const { data }: ApiResponse<Category[]> = await httpClient.get(`/category/all`);
            return data.data;
        }
        catch (error) {
            return [];
        }
    };

    // useEffect(() => {
    //     getCategoriesPaginated();
    // }, [categoriesPageIndexInternal]);

    return {
        categories,
        categoriesPagination,
        isCategoriesLoading,
        categoriesPageIndexInternal,
        createCategory,
        deleteCategory,
        updateCategory,
        handlePreviousPage,
        handleNextPage,
        getAllCategories,
        getCategoriesPaginated,

    }



}
