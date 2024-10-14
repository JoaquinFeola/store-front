import { FormEvent, ReactNode } from "react";


export interface IModal {
    id?: number;
    title: ReactNode;
    content: ReactNode;
    submitFunc?: (e: FormEvent<HTMLFormElement>) => void;
    confirmLabel?: ReactNode;
    cancelFunc?: () => void;
}
export interface IModalCreate {
    content?: ReactNode;
    title?: ReactNode;
    submitFunc: (e: FormEvent<HTMLFormElement>) => void;
    confirmLabel?: ReactNode;
    cancelFunc?: () => void;
}