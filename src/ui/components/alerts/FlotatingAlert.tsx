import { ReactNode } from "react";
import { IAlertType } from "../../../interfaces"


export interface FlotatingAlertProps {
    type: IAlertType;
    message: ReactNode | string;
}



const setPriorityClasses = (priority: IAlertType) => {
    switch (priority) {
        case 'error':
            return 'bg-red-500 text-white bi bi-x-circle before:text-xl'
        case 'info':
            return 'bg-sky-500 before:text-xl bi bi-info-circle'
        case 'warning':
            return 'bg-yellow-500 text-white bi bi-exclamation-triangle before:text-xl'
        case 'success':
            return 'bg-green-500 bi bi-check2-circle before:text-xl'
    }



}


export const FlotatingAlert = ({ message, type  }: FlotatingAlertProps) => {
  return (
    <div className={`fadeInUp px-3 py-2  rounded-md shadow-md flex gap-3 items-center ${setPriorityClasses(type)} `} >
        <p className="whitespace-pre-line">{message}</p>
    </div>
  )
}
