import { CATEGORIES_TYPES } from "@/consts";
import { Action, Category } from "@/interfaces";



export const categoriesReducer = <T extends Category>(state: Category[], action: Action<T | T[]>) => {

    switch (action.type) {
        case CATEGORIES_TYPES.CREATE: {
            
            return [action.payload, ...state ] as Category[]
        }
        case CATEGORIES_TYPES.UPDATE: {
            const UpdatedAtCategory = action.payload as Category;
            const categoriesMutable = structuredClone(state);
            const indexOfUpdateCategory = categoriesMutable.findIndex((category) => category.id === UpdatedAtCategory.id);

            if ( indexOfUpdateCategory === -1 ) return state;

            categoriesMutable[indexOfUpdateCategory].name = UpdatedAtCategory.name;

            
            return categoriesMutable as Category[]
        }


        case CATEGORIES_TYPES.DELETE: {
            const inputCategory =  action.payload as Category
            const  indexOfItemToDelete = state.findIndex((category) => category.id === inputCategory.id);

            if  ( indexOfItemToDelete === -1 ) return state;
            return state.toSpliced(indexOfItemToDelete, 1)
        }
        case CATEGORIES_TYPES .INITIALIZER: {
            return action.payload as Category[]
        }

        default:            
            return state;
    }




}
