import { createContext } from "react";
import { IModalCreate } from "../interfaces";



interface ModalsContextProps {

    newModal: <T>(d: IModalCreate) => void
}


export const ModalsContext = createContext({} as ModalsContextProps);