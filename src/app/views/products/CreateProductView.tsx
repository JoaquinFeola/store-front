import { useState, useContext, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom"
import { CategoriesContext, SuppliersContext, ProductsContext } from "../../../context";
import { useForm } from "../../../hooks/store/useForm";
import { Button } from "../../../ui/components";
import { Alert } from "../../../ui/components/alerts/Alert";
import { Checkbox } from "../../../ui/components/inputs/Checkbox";
import { InputLabel } from "../../../ui/components/inputs/InputLabel";
import { SelectWithFilter } from "../../../ui/components/inputs/SelectWithFilter";
import { formatCurrency } from "../../../utils/currency.util";
import { BarcodesList } from "../../components/BarcodesList";
import { ImageInput } from "../../components/ImageInput";
import { Tooltip } from "../../../ui/components/tooltip/Tooltip";



export const CreateProductView = () => {
    const [formErrors, setFormErrors ] = useState<string[]>([]);

    const { getAllCategories } = useContext(CategoriesContext);
    const { getAllSuppliers } = useContext(SuppliersContext);
    const { createProduct } = useContext(ProductsContext);
    const [categories, setCategories] = useState<{ title: string; img?: string, id: number }[]>([]);
    const [suppliers, setSuppliers] = useState<{ title: string; img?: string, id: number }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);


    
    const [hasExpirationDate, setHasExpirationDate] = useState(false);

    const { formState, formValidation, onInputWrite, assignAllNewValues, onInputLoadFile, } = useForm({
        sku: '',
        description: '',
        categoriesIds: [] as number[],
        supplierId: 0,
        barCodes: [] as string[],
        purchasePrice: '0',
        percentageProfit: '0',
        salePrice: 0,
        image: '',
        inputCodeBar: '',
        expirationDate: '',
    }, {
        categoriesIds: [(value) => value.length <= 0, 'El campo es requerido'],
        supplierId: [(value) => value === 0, 'El campo es requerido'],
        sku: [(value) => value.length === 0, ''],
        description: [(value) => value.length === 0, ''],
        barCodes: [(value) => value.length === 0, 'error'],
        purchasePrice: [(value) => value.length === 0, 'error'],
        percentageProfit: [(value) => value.length === 0, 'error'],
        salePrice: [(value) => value === 0, 'error'],
        image: [(value) => value.length === 0, ''],
        inputCodeBar: [(value) => value.length < 8 && value.length > 13, 'El codigo de barras no tiene un formato valido, por favor intentelo de nuevo'],
        expirationDate: [(value) => value.length === 0, ''],
    })


    const addProductCategory = (id: number) => {

        if (formState.categoriesIds.indexOf(id) === -1 && formState.categoriesIds.length <= 4) {
            assignAllNewValues({
                categoriesIds: [...formState.categoriesIds, id]
            })
        } else {
            assignAllNewValues({
                categoriesIds: formState.categoriesIds.filter((el) => el !== id)
            })
        }

    };
    
    const addProductCodeBars = () => {
        if (formValidation.isInputCodeBarValid !== null) return;
        const isAlreadyCodeBarExists = formState.barCodes.indexOf(formState.inputCodeBar);

        if ( isAlreadyCodeBarExists !== -1 ) return;
        assignAllNewValues({
            barCodes: [...formState.barCodes, formState.inputCodeBar],
            inputCodeBar: ''
        });
    };

    const handleDeleteProductCodeBar = (codebar: string) => {
        const codeBarToDelete = formState.barCodes.indexOf(codebar);

        if ( codeBarToDelete === -1 ) return;
        assignAllNewValues({
            barCodes: formState.barCodes.toSpliced(codeBarToDelete, 1),
        });
    }
    const addProductSupplier = (id: number) => {

        if ( formState.supplierId === id ) {
            assignAllNewValues({
                supplierId: 0
            })
            return;
        }
        if (formState.supplierId !== id ) {
            assignAllNewValues({
                supplierId:  id
            })
        } 
    };

    useEffect(() => {
        const mapCategories = async () => {
            const categoriesGetted = await getAllCategories();
            setCategories(
                categoriesGetted.map(category => ({
                    id: category.id!,
                    title: category.name!,
                    img: '',
                }))

            );
        }
        const mapSuppliers = async () => {
            const suppliersGetted = await getAllSuppliers();
            setSuppliers(
                suppliersGetted.map(supplier => ({
                    id: supplier.id!,
                    title: supplier.name!,
                    img: supplier.image || '',
                }))

            );
        }
        mapSuppliers();
        mapCategories();
    }, []);

    useEffect(() => {
        const createSalePrice = () => {
            const purchasePrice: number = parseFloat(formState.purchasePrice);
            const percentageProfit: number = parseFloat(formState.percentageProfit);
            assignAllNewValues({
                salePrice: purchasePrice + ((percentageProfit * purchasePrice) / 100) || 0
            })
        }
        createSalePrice()
    }, [formState.purchasePrice, formState.percentageProfit])





    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formValidation.isCategoriesIdsValid !== null) return;
        if (formValidation.isSupplierIdValid !== null) return;
        setIsSubmitting(true);
        const productResponse = await createProduct({
                sku: formState.sku,
                description: formState.description,
                percentageProfit: parseFloat(formState.percentageProfit),
                purchasePrice: parseFloat(formState.purchasePrice),
                image: formState.image === '' ? null : formState.image.split(',')[1],
                barCodes: formState.barCodes.length === 0 ? [] : formState.barCodes,
                expirationDate: formState.expirationDate === '' ? null : formState.expirationDate,
                categoriesIds: formState.categoriesIds,
                supplierId: formState.supplierId
            })
        
            if ( productResponse !== null ) {
                setFormErrors(productResponse.response?.data.errors as string[]);
                scrollTo({ top: 0 })
            }
        
            
            setIsSubmitting(false)

    };


    useEffect(() => {
        if (hasExpirationDate === false) {
            assignAllNewValues({
                expirationDate: ''
            })
        }

    }, [hasExpirationDate]);

    return (
        <div className="pb-10">
            <div className="flex items-center mb-10">
                <Tooltip title="Volver a productos" position={{ horizontal: 'right', vertical: 'middle' }}>
                    <Link to="/products" className=" bg-transparent hover:bg-slate-100 transition-colors duration-200 text-gray-800 text-3xl rounded-full"><i className="bi bi-arrow-left"></i></Link>
                </Tooltip>
                <h4 className="flex-grow text-center font-medium text-3xl">Agregar producto</h4>
            </div>

            {
                formErrors.length > 0 
                    && formErrors.map((formError) => (
                        <Alert message={formError} key={formError} type="warning"  />
                    ))
            }

            <form onSubmit={handleSubmit} action="" className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 items-start ">
                <div className="grid grid-cols-1 items-start ">
                    <InputLabel
                        name="sku"
                        required
                        labelText="SKU"
                        value={formState.sku}
                        onChange={(e) => onInputWrite(e, 50)}
                        placeholder="SKU"

                    />

                    <InputLabel
                        labelText="Precio de compra"
                        value={formState.purchasePrice}
                        name="purchasePrice"
                        onChange={onInputWrite}
                        type="number"
                        required
                    />
                    <InputLabel
                        labelText="Porcentaje de ganancia (%)"
                        value={formState.percentageProfit}
                        name="percentageProfit"
                        onChange={onInputWrite}
                        type="number"
                        required
                    />
                    <InputLabel
                        disabled
                        labelText="Precio de venta"
                        value={formState.salePrice === 0 ? formState.purchasePrice : formatCurrency(formState.salePrice, 'ARS')}
                        name="salePrice"
                        type="text"
                        required
                    />
                    <div className="grid grid-cols-1 mt-2">

                        <div className="flex gap-4 mt-3">
                            <Checkbox
                                onChange={() => setHasExpirationDate(!hasExpirationDate)}
                                checked={hasExpirationDate}
                            />
                            <h4>¿Tiene vencimiento?</h4>
                        </div>
                        {
                            (hasExpirationDate)
                            &&
                            <InputLabel
                                value={formState.expirationDate}
                                name="expirationDate"
                                onChange={onInputWrite}
                                labelText="Fecha de expiración"
                                type="date"
                            />
                        }
                    </div>

                    <div className="">
                        <div className="flex gap-2 items-end  codigoIput">
                            <InputLabel
                                className=""
                                labelText="Codigo de barras"
                                name="inputCodeBar"
                                placeholder="Código de barras"
                                value={formState.inputCodeBar}
                                onChange={(e) => onInputWrite(e, 20)}
                            />
                            <Button type="button" className="rounded-md py-[5px] " onClick={addProductCodeBars}>Agregar</Button>
                        </div>
                        <BarcodesList 
                            deleteFunc={handleDeleteProductCodeBar}
                            barcodes={formState.barCodes}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 items-start">

                    <InputLabel
                        name="description"
                        placeholder="Descripción"
                        labelText="Descripción"
                        value={formState.description}
                        onChange={(e) => onInputWrite(e, 2000)}
                        required
                    />

                    <div>
                        <div className="col-span-4">
                            <h3 className="font-medium text-lg mt-2 mb-2 fter:content-['*'] after:text-red-500 after:ml-1">Categorías del producto</h3>
                            <SelectWithFilter
                                items={categories}
                                selectionArr={formState.categoriesIds}
                                select={addProductCategory}
                            />
                            {
                                formValidation.isCategoriesIdsValid !== null && isSubmitting
                                && (
                                    <p className="text-red-500">
                                        {formValidation.isCategoriesIdsValid}
                                    </p>
                                )
                            }
                        </div>
                        <div>
                            <h3 className="font-medium text-lg mt-2 mb-2 after:content-['*'] after:text-red-500 after:ml-1">Proveedores del producto</h3>
                            <SelectWithFilter
                                items={suppliers}
                                selectionArr={(formState.supplierId == 0) ? [] : [ formState.supplierId ]}
                                select={addProductSupplier}

                            />
                            {
                                formValidation.isSupplierIdValid !== null && isSubmitting
                                && (
                                    <p className="text-red-500">
                                        {formValidation.isSupplierIdValid}
                                    </p>
                                )
                            }
                        </div>
                    </div>

                    <div className="self-end mt-3 justify-self-center">
                        <ImageInput
                            inputName="image"
                            onLoadFile={onInputLoadFile}
                            src={formState.image}
                        />
                    </div>


                </div>

                <Button className="self-end rounded-md " type="submit" isButtonLoading={ isSubmitting } >Agregar producto</Button>
            </form>


        </div>
    )
}
