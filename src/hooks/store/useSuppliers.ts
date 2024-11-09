import { useContext, useReducer, useState } from "react"
import { suppliersReducer } from "../../reducers/suppliers.reducer";
import { AlertsContext } from "../../context";
import { ApiResponse, Supplier } from "../../interfaces";
import { SUPPLIERS_TYPES } from "../../consts";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { httpClient } from "../../api/axios-config";


interface SuppliersPaginateResponse {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalSize: number;
    rows: Supplier[];


}


export const useSuppliers = () => {
    const [suppliers, suppliersDispatch] = useReducer(suppliersReducer, []);
    const [isSuppliersLoading, setIsSuppliersLoading] = useState(false)
    const { addAlert } = useContext(AlertsContext);
    const [suppliersPageIndexInternal, setSuppliersPageIndexInternal] = useState(1);
    const [suppliersPagination, setSuppliersPagination] = useState({
        pageIndex: 1,
        pageSize: 10,
        totalPages: 0,
        totalSize: 0,
    });
    const navigate = useNavigate();

    const handleNextPage = () => {
        if (suppliersPagination.pageIndex >= suppliersPagination.totalPages) return;
        setSuppliersPageIndexInternal(suppliersPageIndexInternal + 1);


    }
    const handlePreviousPage = () => {
        if (suppliersPagination.pageIndex <= 1) return;
        setSuppliersPageIndexInternal(suppliersPageIndexInternal - 1);



    }


    const deleteSupplier = async (id: number) => {
        try {
            const { data }: ApiResponse<Supplier> = await httpClient.delete(`/supplier/${id}`)
            suppliersDispatch({
                type: SUPPLIERS_TYPES.DELETE,
                payload: { id: id } as Supplier
            });
            addAlert({
                duration: 4000,
                message: data.message,
                type: 'success'
            });

            await getSuppliersPaginated();
            if (suppliers.length - 1 === 0) setSuppliersPageIndexInternal(1);
        }
        catch (error) {

            addAlert({
                duration: 4000,
                message: 'Ocurrió un error inesperado al intentar eliminar un proveedor',
                type: 'error',
            })
        }
    };


    const updateSupplier = async (newSupplier: Partial<Supplier>, id: number) => {
        try {
            const { data }: ApiResponse<Supplier> = await httpClient.put(`/supplier/${id}`, newSupplier)
            const newSupplierResponse = data.data;
            suppliersDispatch({
                type: SUPPLIERS_TYPES.UPDATE,
                payload: newSupplierResponse
            });
            addAlert({
                duration: 4000,
                message: data.message,
                type: 'success'
            });
            navigate('/suppliers')

            await getSuppliersPaginated();
        }
        catch (error) {

            addAlert({
                duration: 4000,
                message: 'Ocurrió un error inesperado al intentar editar un proveedor',
                type: 'error',
            })
        }
    };


    const createSupplier = async (newSupplier: Partial<Supplier>) => {
        
        try {
            const { data }: ApiResponse<Supplier> = await httpClient.post(`/supplier`, newSupplier)
            const newSupplierResponse = data.data;
            suppliersDispatch({
                type: SUPPLIERS_TYPES.CREATE,
                payload: newSupplierResponse
            });
            addAlert({
                duration: 6000,
                message: data.message,
                type: 'success'
            });
            navigate('/suppliers')
            await getSuppliersPaginated()
        }
        catch (error) {

            addAlert({
                duration: 4000,
                message: 'Ocurrió un error inesperado al intentar crear un proveedor',
                type: 'error',
            })
        }
    };

    const getSuppliersPaginated = async () => {
        setIsSuppliersLoading(true)
        try {

            const { data }: ApiResponse<SuppliersPaginateResponse> = await httpClient.get(`/supplier/paginate`, {
                params: {
                    pageSize: 10,
                    pageIndex: suppliersPageIndexInternal
                }
            });
            const { pageIndex, rows, totalPages, totalSize } = data.data;
            setSuppliersPagination({
                pageIndex: pageIndex,
                pageSize: 10,
                totalPages: totalPages,
                totalSize: totalSize
            })

            suppliersDispatch({
                type: SUPPLIERS_TYPES.INITIALIZER,
                payload: rows,
            })
        }
        catch (error) {
            console.error(error);
            
        }
        finally {
            setIsSuppliersLoading(false)
        }
    };

    const getAllSuppliers = async () => {
        try {

            const { data }: ApiResponse<Supplier[]> = await httpClient.get(`/supplier/all`);
            return data.data;
        }
        catch (error) {
            return [];
        }
    };

    const getSupplierById = async(id: number | string) => {
        try {
            const { data }: ApiResponse<Supplier> = await httpClient.get(`/supplier/${id}`);    
    
            return data.data
        } 
        catch (error) {
            return error as AxiosError;
            
        }
    }
    // useEffect(() => {
    //     getSuppliersPaginated()
    // }, [suppliersPageIndexInternal]);




    return {
        isSuppliersLoading,
        suppliersPagination,
        suppliers,
        suppliersPageIndexInternal,
        createSupplier,
        updateSupplier,
        deleteSupplier,
        getAllSuppliers,
        handleNextPage,
        handlePreviousPage,
        getSupplierById,
        getSuppliersPaginated,

    }
}
