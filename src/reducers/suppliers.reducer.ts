import { SUPPLIERS_TYPES } from "../consts";
import { Action, Supplier } from "../interfaces";



export const suppliersReducer = <T extends Partial<Supplier>>(state: T[], action: Action<T | T[]>): T[] => {

    switch (action.type) {





        case SUPPLIERS_TYPES.CREATE:
            return [action.payload as T, ...state];

        case SUPPLIERS_TYPES.UPDATE: {
            const updatedSupplier = action.payload as Supplier;
            const suppliersMutable = structuredClone(state);
            const indexOfUpdateSupplier = suppliersMutable.findIndex((supplier) => supplier.id === updatedSupplier.id);
            
            suppliersMutable[indexOfUpdateSupplier] = {
                ...suppliersMutable[indexOfUpdateSupplier],

            }
            return suppliersMutable;
        }



        case SUPPLIERS_TYPES.INITIALIZER:
            return action.payload as T[];


        default:
            return state;
    }


}   