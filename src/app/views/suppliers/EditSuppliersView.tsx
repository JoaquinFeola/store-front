import { ImageInput } from "@/app/components/ImageInput";
import { SuppliersContext } from "@/context";
import { useForm } from "@/hooks/store/useForm";
import { Supplier } from "@/interfaces";
import { Button } from "@/ui/components";
import { LoadingInfo } from "@/ui/components/";
import { Tooltip } from "@/ui/components";
import { useState, useContext, FormEvent, useEffect } from "react";
import { useParams, Link } from "react-router-dom";



export const EditSuppliersView = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const { updateSupplier, getSupplierById } = useContext(SuppliersContext);
    const { supplierId } = useParams();
    const [supplier, setSupplier] = useState({} as Supplier);

    const { onInputWrite, onInputLoadFile, assignAllNewValues, formState } = useForm({
        name: '',
        image: '',
        email: '',
        telephone: '',
        businessName: ''
    });

    useEffect(() => {

        const getSupplier = async () => {
            setIsLoading(true)
            try {
                setSupplier(await getSupplierById(supplierId!))

            }
            catch (error) {
                return error;
            }
            finally {
                setIsLoading(false)
            }

        };
        getSupplier();
    }, []);

    useEffect(() => {
        const setInitialFormState = () => {
            setIsLoading(true)
            assignAllNewValues({
                businessName: supplier.busisnessName!,
                email: supplier.email!,
                name: supplier.name,
                image: supplier.image || '',
                telephone: supplier.telephone!
            })
            setIsLoading(false)
        }
        setInitialFormState()
    }, [supplier])


    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (formState.name === '') return;
        await updateSupplier({
            busisnessName: formState.businessName === '' ? null : formState.businessName,
            email: formState.email === '' ? null : formState.email,
            image: formState.image === supplier.image ? null : formState.image.split(',')[1],
            telephone: formState.telephone === '' ? null : formState.telephone,
            name: formState.name,
        }, parseInt(supplierId!));
        setIsSubmitting(false);

    };



    if (supplierId === undefined) return <h3>Ocurrió un error, por favor vuelve atrás e intentalo nuevamente</h3>


    if (isLoading) return (<LoadingInfo />)
    return (

        <div>
            <div className="flex items-center mb-10">
                <Tooltip title="Volver a proveedores" position={{ horizontal: 'right', vertical: 'middle' }}>
                    <Link to="/suppliers" className=" bg-transparent hover:bg-slate-100 transition-colors duration-200 text-gray-800 text-3xl rounded-full"><i className="bi bi-arrow-left"></i></Link>
                </Tooltip>
                <h4 className="flex-grow text-center font-medium text-3xl">Editar proveedor "{supplier?.name}"</h4>
            </div>
            <div className="">
                <form action="" autoComplete="off" onSubmit={handleSubmitForm}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        <label htmlFor="name" className="grid gap-2">
                            <span className="font-medium text-lg">Nombre</span>
                            <input
                                required
                                id="name"
                                type="text"
                                name="name"
                                value={formState.name ?? ''}
                                onChange={(e) => onInputWrite(e, 100)}
                                placeholder="nombre"
                                className="focus:ring-2 focus:ring-blue-400 focus:outline-none px-3 py-1 rounded-sm border"
                            />
                        </label>
                        <label htmlFor="telephone" className="grid gap-2">
                            <span className="font-medium text-lg">Teléfono</span>
                            <input
                                type="tel"
                                id="telephone"
                                name="telephone"
                                value={formState.telephone ?? ''}
                                onChange={(e) => onInputWrite(e, 50)}
                                placeholder="telefono"
                                className="focus:ring-2 focus:ring-blue-400 focus:outline-none px-3 py-1 rounded-sm border"

                            />
                        </label>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        <label htmlFor="email" className="grid gap-2">
                            <span className="font-medium text-lg">Email</span>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formState.email ?? ''}
                                onChange={onInputWrite}
                                placeholder="email"
                                className="focus:ring-2 focus:ring-blue-400 focus:outline-none px-3 py-1 rounded-sm border"

                            />
                        </label>
                        <label htmlFor="businessName" className="grid gap-2">
                            <span className="font-medium text-lg">Nombre de empresa</span>
                            <input
                                type="text"
                                id="businessName"
                                name="businessName"
                                value={formState.businessName ?? ''}
                                onChange={(e) => onInputWrite(e, 100)}
                                placeholder="Nombre de empresa"
                                className="focus:ring-2 focus:ring-blue-400 focus:outline-none px-3 py-1 rounded-sm border"


                            />
                        </label>
                    </div>
                    <div className="mb-10 ">
                        <ImageInput
                            onLoadFile={onInputLoadFile}
                            src={formState.image}
                            inputName="image"
                        />
                    </div>
                    <Button disabled={isSubmitting} className="disabled:bg-blue-500/40 rounded-md" type="submit">Editar proveedor</Button>
                </form>
            </div>
        </div>

    )
}
