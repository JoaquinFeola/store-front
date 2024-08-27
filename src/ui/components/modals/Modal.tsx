import { useEffect, useRef } from "react";
import { IModal } from "../../../interfaces";
import { Button } from "../button";


export const Modal = ({ content, submitFunc, cancelFunc, confirmLabel, title }: IModal) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const activeElement = document.activeElement as HTMLElement;
        activeElement.blur();
        return () => {
            document.body.style.overflow = 'auto';

        }
    }, []);



    return (
        <div className="h-dvh w-full bg-gradient-to-br px-5  from-black/40 to-black/60 backdrop-blur-sm fixed top-0 left-0 z-[1000] grid place-content-center      ">
            <div className="bg-white min-w-[290px] rounded-lg shadow-md  px-4 py-2  fadeInUp     ">
                <div className="">
                    <h3 className="font-medium text-3xl text-center break-words">{title}</h3>
                </div>
                <form accessKey="s" onSubmit={submitFunc}>
                    <div className="my-4">
                        {content}
                    </div>
                    <div className="flex gap-4 justify-center ">
                        <Button type="button" onClick={cancelFunc} className="bg-gray-500 rounded-sm hover:bg-gray-600 transition-all duration-150">Cancelar</Button>
                        <Button type="submit" className="rounded-sm">{confirmLabel}</Button>
                    </div>

                </form>
            </div>
        </div>
    )
}
