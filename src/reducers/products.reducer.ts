import { PRODUCTS_TYPES } from "../consts";
import { Action } from "../interfaces";
import { Product } from "../interfaces/product.interfaces";



export const productsReducer = <T extends Product>(state: T[], action: Action<T | T[]>): T[] => {

    switch (action.type) {





        case PRODUCTS_TYPES.CREATE:
            return [action.payload as T, ...state];

        case PRODUCTS_TYPES.UPDATE: {
            const updatedProduct = action.payload as Product;
            const productsMutable = structuredClone(state);
            const indexOfUpdateProduct = productsMutable.findIndex((product) => product.id === updatedProduct.id);

            productsMutable[indexOfUpdateProduct] = {
                ...productsMutable[indexOfUpdateProduct],

            }
            return productsMutable;
        }
        case PRODUCTS_TYPES.DELETE: {
            const { id } = action.payload as Product;
            const productsMutable = structuredClone(state);
            const indexOfItemToDelete = productsMutable.findIndex(product => product.id === id);
            const itemsWithoutRemoved = productsMutable.toSpliced(indexOfItemToDelete, 1);

            return itemsWithoutRemoved

        }



        case PRODUCTS_TYPES.INITIALIZER:
            return action.payload as T[];


        default:
            return state;
    }


}   
