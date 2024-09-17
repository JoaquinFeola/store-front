import React from "react";
import { Tooltip } from "../../ui/components/tooltip/Tooltip";


interface FullScreenImageProps {
    src: string;
    closeBtn: () => void
};

export const FullScreenImage = React.memo(({ src, closeBtn  }: FullScreenImageProps) => {
  return (
    <div className="flex flex-col  w-full h-dvh bg-black/50 fixed top-0 left-0 z-[2000]">
        <div className="mb-2 z-[300] absolute top-2 right-2">
            <Tooltip title="Cerrar" position={{horizontal: 'left', vertical: 'middle'}}>
                <button onClick={closeBtn} className="bg-slate-900/80 rounded-full w-12 h-12 hover:bg-slate-950/80 transition-all ">
                    <i className="bi bi-x text-4xl text-white"></i>

                </button>
            </Tooltip>
        </div>
        <div className=" flex-grow  flex items-center justify-center ">
            <img className="fadeInUp min-w-72 min-h-72   object-contain max-w-[60%] rounded-md" src={src} alt={"Imagen"} />

        </div>


    </div>
  )
})
