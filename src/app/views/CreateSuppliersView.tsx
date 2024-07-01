import { Link } from "react-router-dom"
import { Tooltip } from "../../ui/components/tooltip/Tooltip"
import { FormEvent, useContext, useRef, useState } from "react"
import { Button } from "../../ui/components";
import { useForm } from "../../hooks/useForm";
import { SuppliersContext } from "../../context";
import { ImageInput } from "../components/ImageInput";


const initialFormState = {
    name: '',
    image: '',
    email: '',
    telephone: '',
    businessName: ''
}

export const CreateSuppliersView = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { onInputWrite, onInputLoadFile, formState } = useForm(initialFormState);
    const { createSupplier } = useContext(SuppliersContext);

    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formState.name === '') return;
        setIsSubmitting(true)

        await createSupplier({
            bussinessName: formState.businessName === '' ? null : formState.businessName,
            email: formState.email === '' ? null : formState.email,
            image: formState.image === '' ? null : formState.image.split(',')[1],
            telephone: formState.telephone === '' ? null : formState.telephone,
            name: formState.name,
        });
        setIsSubmitting(true)

    }

    return (
        <div>
            <div className="flex items-center mb-10">
                <Tooltip title="Volver a proveedores" position={{ horizontal: 'right', vertical: 'middle' }}>
                    <Link to="/suppliers" className=" bg-transparent hover:bg-slate-100 transition-colors duration-200 text-gray-800 text-3xl rounded-full"><i className="bi bi-arrow-left"></i></Link>
                </Tooltip>
                <h4 className="flex-grow text-center font-medium text-3xl">Agregar proveedor</h4>
            </div>
            <div className="">
                <form action="" autoComplete="off" onSubmit={handleSubmitForm}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                        <label htmlFor="nombre" className="grid gap-2">
                            <span className="font-medium text-lg">Nombre</span>
                            <input
                                type="tex"
                                id="nombre"
                                name="name"
                                value={formState.name}
                                onChange={(e) => onInputWrite(e, 50)}
                                placeholder="Nombre"
                                className="focus:ring-2 focus:ring-blue-400 focus:outline-none px-3 py-1 rounded-sm border"

                            />
                        </label>
                        <label htmlFor="telephone" className="grid gap-2">
                            <span className="font-medium text-lg">Teléfono</span>
                            <input
                                type="tel"
                                id="telephone"
                                name="telephone"
                                value={formState.telephone}
                                onChange={(e) => onInputWrite(e, 50)}
                                placeholder="Telefono"
                                className="focus:ring-2 focus:ring-blue-400 focus:outline-none px-3 py-1 rounded-sm border"

                            />
                        </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                        <label htmlFor="email" className="grid gap-2">
                            <span className="font-medium text-lg">Email</span>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formState.email}
                                onChange={onInputWrite}
                                placeholder="Email"
                                className="focus:ring-2 focus:ring-blue-400 focus:outline-none px-3 py-1 rounded-sm border"

                            />
                        </label>
                        <label htmlFor="businessName" className="grid gap-2">
                            <span className="font-medium text-lg">Nombre de empresa</span>
                            <input
                                type="text"
                                id="businessName"
                                name="businessName"
                                value={formState.businessName}
                                onChange={(e) => onInputWrite(e, 100)}
                                placeholder="Nombre de empresa"
                                className="focus:ring-2 focus:ring-blue-400 focus:outline-none px-3 py-1 rounded-sm border"


                            />
                        </label>
                    </div>
                    <div className="mb-10 ">
                        <ImageInput 
                            inputName="image"
                            onLoadFile={onInputLoadFile}
                            src={formState.image}
                        />
                    </div>
                    <Button disabled={isSubmitting} className="disabled:bg-blue-500/30 rounded-md" type="submit">Agregar proveedor</Button>
                </form>
            </div>
        </div>
    )
}
