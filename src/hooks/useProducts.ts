import { useContext, useEffect, useReducer, useState } from "react"
import { AlertsContext } from "../context";
import { ApiResponse } from "../interfaces";
import { httpClient } from "../api/axios-config";
import { PRODUCTS_TYPES } from "../consts";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { productsReducer } from "../reducers/products.reducer";
import { Product, ProductDTO } from "../interfaces/product.interfaces";
import { SEARCH_PRODUCTS_TYPES } from "../consts/product-search-consts";


interface ProductsPaginateResponse {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalSize: number;
    rows: Product[];


}


export const useProducts = () => {
    const [products, productsDispatch] = useReducer(productsReducer, []);
    const { addAlert } = useContext(AlertsContext);
    const [ isProductsLoading, setIsProductsLoading ] = useState(false);
    const [productPageIndexInternal, setProductsPageIndexInternal] = useState(1);
    const [productsPagination, setProductsPagination] = useState({
        pageIndex: 1,
        pageSize: 10,
        totalPages: 0,
        totalSize: 0,
    });
    const [ searchPagination, setSearchPagination ] = useState({
        filter: '',
        search: '',
    })

    const handleSearch = (search: string, filter: keyof typeof SEARCH_PRODUCTS_TYPES ) => {
        setSearchPagination({
            filter: filter,
            search: search
        });
    }



    const navigate = useNavigate();

    const handleNextPage = () => {
        if (productsPagination.pageIndex >= productsPagination.totalPages) return;
        setProductsPageIndexInternal(productPageIndexInternal + 1);


    }
    const handlePreviousPage = () => {
        if (productsPagination.pageIndex <= 1) return;
        setProductsPageIndexInternal(productPageIndexInternal - 1);
    }


    const deleteProduct = async (id: number) => {
        try {
            const { data }: ApiResponse<Product> = await httpClient.delete(`/product/${id}`)
            productsDispatch({
                type: PRODUCTS_TYPES.DELETE,
                payload: { id: id } as Product
            });
            addAlert({
                duration: 4000,
                message: data.message,
                type: 'success'
            });

            await getProductsPaginated();
            if (products.length - 1 === 0) setProductsPageIndexInternal(1);
        }
        catch (error) {

            addAlert({
                duration: 4000,
                message: 'Ocurrió un error inesperado al intentar eliminar un producto',
                type: 'error',
            })
        }
    };


    const updateProduct = async (newProduct: ProductDTO, id: number) => {
        try {
            const { data }: ApiResponse<Product> = await httpClient.put(`/product/${id}`, newProduct)
            
            addAlert({
                duration: 4000,
                message: data.message,
                type: 'success'
            });
            navigate('/products')

            await getProductsPaginated();
        }
        catch (error) {

            addAlert({
                duration: 4000,
                message: 'Ocurrió un error inesperado al intentar editar un producto',
                type: 'error',
            })
        }
    };


    const createProduct = async (newProduct: ProductDTO) => {
        try {
            const { data }: ApiResponse<Product> = await httpClient.post(`/product`, newProduct)
            const newProductResponse = data.data;
            productsDispatch({
                type: PRODUCTS_TYPES.CREATE,
                payload: newProductResponse
            });
            addAlert({
                duration: 6000,
                message: data.message,
                type: 'success'
            });
            navigate('/products')
            await getProductsPaginated()
        }
        catch (error) {

            addAlert({
                duration: 4000,
                message: 'Ocurrió un error inesperado al intentar crear un producto',
                type: 'error',
            })
        }
    };

    const getProductsPaginated = async () => {
        setIsProductsLoading(true)
        try {

            const { data }: ApiResponse<ProductsPaginateResponse> = await httpClient.get(`/product/paginate`, {
                params: {
                    pageSize: 10,
                    pageIndex: productPageIndexInternal
                }
            });
            const { pageIndex, rows, totalPages, totalSize } = data.data;
            setProductsPagination({
                pageIndex: pageIndex,
                pageSize: 10,
                totalPages: totalPages,
                totalSize: totalSize
            })

            productsDispatch({
                type: PRODUCTS_TYPES.INITIALIZER,
                payload: rows,
            })
        }
        catch (error) {

        }
        finally {
            setIsProductsLoading(false)
        }
    };

    const getAllProducts = async () => {
        try {

            const { data }: ApiResponse<Product[]> = await httpClient.get(`/product/all`);
            return data.data;
            
        }
        catch (error) {
            return [];
        }
    };

    const getProductById = async(id: number | string) => {
        try {
            const { data }: ApiResponse<Product> = await httpClient.get(`/product/${id}`);    
    
            return data.data
        } 
        catch (error) {
            return error as AxiosError;
            
        }
    }

    useEffect(() => {
        getProductsPaginated()
    }, [productPageIndexInternal]);



    return {
        isProductsLoading,
        productsPagination,
        products,
        createProduct,
        updateProduct,
        deleteProduct,
        getAllProducts,
        handleNextPage,
        handlePreviousPage,
        getProductById
    }
}
