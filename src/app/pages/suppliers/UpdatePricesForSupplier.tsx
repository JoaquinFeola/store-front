import { SuppliersContext, ProductsContext } from "@/context";
import { useForm } from "@/hooks/store/useForm";
import { SelectWithFilter, InputLabel, Button } from "@/ui/components";
import { FormEvent, useContext, useEffect, useState } from "react"


export const UpdatePricesForSupplier = () => {

    const { getAllSuppliers } = useContext(SuppliersContext);
    const { updateSalePriceForSupplierId } = useContext(ProductsContext);
    const { formState, onInputWrite, assignAllNewValues, formValidation, resetFormValues } = useForm({
        percentageToUp: '0',
        supplierId: 0
    }, {
        percentageToUp: [(value) => value === '0', 'El valor no puede ser 0'],
        supplierId: [(value) => value === 0, '¡El campo de proveedores es requerido!']
    })
    const [suppliers, setSuppliers] = useState<{ title: string, id: number, img?: string }[]>([]);
    const [isSubmitting, setSubmittingState] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);

    const addProductSupplier = (id: number) => {

        if (formState.supplierId === id) {
            assignAllNewValues({
                supplierId: 0
            });
        }

        if (formState.supplierId !== id) {
            assignAllNewValues({
                supplierId: id
            });
        }
    };

    useEffect(() => {
        const fetchSuppliers = async () => {
            const response = await getAllSuppliers();
            if (!response) return setSuppliers([]);

            const suppliersMapped = response.map((supplier) => {
                return {
                    id: supplier.id!,
                    title: supplier.name,
                }
            })
            setSuppliers(suppliersMapped)
        };
        fetchSuppliers()
    }, []);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formValidation.isSupplierIdValid !== null || formValidation.isPercentageToUpValid !== null) return setIsSubmit(true);
        setSubmittingState(true);

        await updateSalePriceForSupplierId({
            percentageToUp: parseFloat(formState.percentageToUp),
            supplierId: formState.supplierId
        });
        setIsSubmit(false)
        resetFormValues()
        
        setSubmittingState(false);

    };

    return (
        <div>
            <h3 className="mb-4 font-medium text-3xl text-center">Actualización por proveedor</h3>

            <form className="grid grid-cols-1 gap-4 md:grid-cols-2 " onSubmit={handleSubmit}>
                <div className="">
                    <div className="flex flex-col gap-2 mt-3 relative">

                        <h3 className="font-medium text-lg  after:content-['*'] after:ml-1 after:text-red-500">Proveedores</h3>
                        <SelectWithFilter
                            items={suppliers}
                            select={addProductSupplier}
                            selectionArr={formState.supplierId !== 0 ? [formState.supplierId] : []}

                        />
                    </div>
                    {
                        (formValidation.isSupplierIdValid !== null && isSubmit)
                        && (
                            <p className="relative  text-red-500">
                                {formValidation.isSupplierIdValid}
                            </p>
                        )
                    }
                </div>
                <div className="relative">
                    <InputLabel
                        required
                        type="number"
                        value={formState.percentageToUp}
                        name="percentageToUp"
                        onChange={onInputWrite}
                        labelText="Porcentaje de aumento (%)"
                    />
                    {
                        (formValidation.isPercentageToUpValid !== null && isSubmit )
                        && (
                            <p className="relative  text-red-500">
                                {formValidation.isPercentageToUpValid}
                            </p>
                        )
                    }
                </div>

                <Button type="submit" className="mt-6 flex gap-3 justify-center items-center rounded-md" isButtonLoading={isSubmitting}>
                    Guardar
                    <i className="bi bi-floppy"></i>
                </Button>
            </form>
        </div>
    )
}
