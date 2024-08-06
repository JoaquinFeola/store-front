import { ReactNode, useReducer } from "react"
import { AlertsContext } from "../AlertsContext"
import { alertsReducer } from "../../reducers/alerts.reducer"
import { IAlert } from "../../interfaces";
import { ALERTS_TYPES } from "../../consts";
import { createPortal } from "react-dom";
import { FlotatingAlert } from "../../ui/components";






export const AlertsProvider = ({ children }: { children: ReactNode }) => {

    const [alerts, alertsDispatch] = useReducer(alertsReducer, []);

    const addAlert = (newAlert: IAlert) => {
        alertsDispatch({
            type: ALERTS_TYPES.CREATE,
            payload: {
                ...newAlert,
            }
        });

        setTimeout(() => {
            alertsDispatch({
                type: ALERTS_TYPES.REMOVE,
                payload: {...newAlert}
            })
        }, newAlert.duration);
    }

    return (
        <AlertsContext.Provider value={{
            alerts,
            addAlert
        }} >
            {
                createPortal(
                    <div className="fixed justify-end top-3 flex flex-col gap-3 z-[1500] right-2">
                        {
                            alerts.map((alert, index) => <FlotatingAlert key={index} message={alert.message} type={alert.type} />)
                        }
                    </div>,
                    document.body
                )
            }
            {children}
        </AlertsContext.Provider>
    )
}
