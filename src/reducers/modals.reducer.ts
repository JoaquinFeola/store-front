import { MODAL_TYPES } from "../consts/modals-consts";
import { Action, IModal } from "../interfaces";



export const modalsReducer = <T extends IModal>(state: IModal[], action: Action<T> ): IModal[] => {
  
    switch (action.type) {
        case MODAL_TYPES.CREATE: {
            return [action.payload] as typeof state
        }    

        case MODAL_TYPES.DELETE: {
            return [];
        }
    
        default:
            return state;
    }

}
