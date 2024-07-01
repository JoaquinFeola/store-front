import { createContext } from "react";
import { Category } from "../interfaces";

interface CategoriesContextProps {
    categories: Category[];
    categoriesPagination: {
        pageIndex: number;
        pageSize: number;
        totalPages: number;
        totalSize: number;
    };
    deleteCategory:(id: number)  => Promise<void>;
    updateCategory: (newCategory: string,id: number) => Promise<void>;
    createCategory: (newCategory: string) => Promise<void>;
    handleNextPage: () => void;
    handlePreviousPage: () => void;
    getAllCategories: () => Promise<Category[]>,
    isCategoriesLoading: boolean;

}


export const CategoriesContext = createContext({} as CategoriesContextProps);