



import { createContext } from "react";
import { Supplier } from "../interfaces";
import { AxiosError } from "axios";

interface SuppliersContextProps {

    suppliers: Supplier[];
    suppliersPagination: {
        pageIndex: number;
        pageSize: number;
        totalPages: number;
        totalSize: number;
    };
    deleteSupplier:(id: number)  => Promise<void>;
    updateSupplier: (newSupplier: Partial<Supplier>,id: number) => Promise<void>;
    createSupplier: (newSupplier: Partial<Supplier>) => Promise<void>;
    handleNextPage: () => void;
    handlePreviousPage: () => void;
    getAllSuppliers: () => Promise<Supplier[]>,
    getSupplierById: (id: number | string) => Promise<Supplier | AxiosError>;
    isSuppliersLoading: boolean;
    suppliersPageIndexInternal: number;
    getSuppliersPaginated: () => Promise<void>
}


export const SuppliersContext = createContext({} as SuppliersContextProps);