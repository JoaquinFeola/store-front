import { ChangeEvent, useRef } from "react";

interface ImageInputProps {
    src?: string;
    inputName: string;
    onLoadFile: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ImageInput = ({ src, inputName, onLoadFile }: ImageInputProps) => {
    const imageFileInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 gap-2">
                <div className="grid  grid-cols-1 items-center gap-4">

                    <div className={`w-40 h-40  break-words border overflow-hidden shadow-md rounded-md before:content-[''] before:top-1/2 before:left-1/2 relative before:-translate-x-1/2 before:-translate-y-1/2 before:text-4xl before:select-none before:pointer-events-none before:text-gray-700 before:absolute  ${src ? '' : 'bi bi-camera-fill'}`}>
                        <img className={`w-full  h-full object-cover  ${src ? '' : 'hidden'}`} src={src} />
                    </div>
                    <button
                        type="button"
                        onClick={() => imageFileInputRef.current?.click()}
                        className="px-4 w-max text-sm h-max py-2 shadow-sm hover:bg-gray-500 transition-colors duration-200 text-white font-medium rounded-md bg-gray-400">
                        Seleccionar imagen
                    </button>
                </div>
                {/* <p className="pointer-events-none  select-none "><span className="font-medium">Nombre de archivo: </span>{filename ? filename : 'Selecciona una imagen'}</p> */}

            </div>
            <input

                ref={imageFileInputRef}
                type="file"
                hidden
                name={inputName}
                onChange={onLoadFile}
                multiple={false}
                accept=".jpg, .jpeg, .png, .gif, .svg"
                className="hidden"
            />

        </>
    )
}
