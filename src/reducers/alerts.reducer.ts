import { ALERTS_TYPES } from "../consts";
import { Action } from "../interfaces/action.interfaces";
import { IAlert } from "../interfaces/alerts.interfaces";




export const alertsReducer = <T extends IAlert>(state: IAlert[], action: Action<T>): IAlert[] => {

    switch (action.type) {
        case ALERTS_TYPES.CREATE: {
            const newAlerts = structuredClone(state);
            newAlerts.push(action.payload!);
            return newAlerts;
        }
        case ALERTS_TYPES.REMOVE: {  
            const newAlerts = structuredClone(state);
            const findElementToRemove = newAlerts.findIndex((alert) => alert.id === action.payload!.id);
            if ( findElementToRemove == -1 ) return state;
            return newAlerts.toSpliced(findElementToRemove, 1)

            
        }
            
    
        default:
            return state
    }

};

