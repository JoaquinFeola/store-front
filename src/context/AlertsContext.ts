import { createContext } from "react";
import { IAlert } from "../interfaces";


interface AlertsContextProps {
    alerts: IAlert[]
    addAlert: (newAlert: IAlert) => void;
};

export const AlertsContext = createContext({ } as AlertsContextProps);