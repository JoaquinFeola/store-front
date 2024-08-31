import { createContext } from "react";
import { IModalCreate } from "../interfaces";



interface ModalsContextProps {

    newModal: (d: IModalCreate) => void
}


export const ModalsContext = createContext({} as ModalsContextProps);