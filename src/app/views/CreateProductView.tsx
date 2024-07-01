import { Link } from "react-router-dom"
import { Tooltip } from "../../ui/components/tooltip/Tooltip"
import { InputLabel } from "../../ui/components/inputs/InputLabel"
import { SelectWithFilter } from "../../ui/components/inputs/SelectWithFilter"
import { FormEvent, useContext, useEffect, useState } from "react"
import { CategoriesContext, ProductsContext, SuppliersContext } from "../../context"
import { useForm } from "../../hooks/useForm"
import { ImageInput } from "../components/ImageInput"
import { Button } from "../../ui/components"
import { Checkbox } from "../../ui/components/inputs/Checkbox"

export const CreateProductView = () => {

    const { getAllCategories } = useContext(CategoriesContext);
    const { getAllSuppliers } = useContext(SuppliersContext);
    const { createProduct } = useContext(ProductsContext);
    const [categories, setCategories] = useState<{ title: string; img?: string, id: number }[]>([]);
    const [suppliers, setSupliers] = useState<{ title: string; img?: string, id: number }[]>([]);
    const [hasExpirationDate, setHasExpirationDate] = useState(false);
    const { formState, onInputWrite, assignAllNewValues, onInputLoadFile, } = useForm({
        sku: '',
        description: '',
        productCategories: [] as number[],
        productProviders: [] as number[],
        barCodes: [] as string[],
        purchasePrice: '0',
        percentageProfit: '0',
        salePrice: 0,
        image: '',
        inputCodeBar: '',
        expirationDate: '',
    })


    const addProductCategory = (id: number) => {

        if (formState.productCategories.indexOf(id) === -1 && formState.productCategories.length <= 4) {
            assignAllNewValues({
                productCategories: [...formState.productCategories, id]
            })
        } else {
            assignAllNewValues({
                productCategories: formState.productCategories.filter((el) => el !== id)
            })
        }

    }
    const addProductCodeBars = () => {
        if ( formState.inputCodeBar === '' ) return;
        assignAllNewValues({
            barCodes: [...formState.barCodes, formState.inputCodeBar],
            inputCodeBar: ''
        });
    }
    const addProductSupplier = (id: number) => {

        if (formState.productProviders.indexOf(id) === -1 && formState.productProviders.length <= 4) {
            assignAllNewValues({
                productProviders: [...formState.productProviders, id]
            })
        } else {
            assignAllNewValues({
                productProviders: formState.productProviders.filter((el) => el !== id)
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
            setSupliers(
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

    



    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createProduct({
            sku: formState.sku,
            description: formState.description,
            percentageProfit: parseFloat(formState.percentageProfit),
            purchasePrice: parseFloat(formState.purchasePrice),
            salePrice: formState.salePrice,
            image: formState.image === '' ? null : formState.image.split(',')[1],
            barCodes: formState.barCodes.length === 0 ? null : formState.barCodes,
            expirationDate: formState.expirationDate === '' ? null : formState.expirationDate,
            productCategories: formState.productCategories,
            productProviders: formState.productProviders
        })

    }
    const formatCurrency = (value: number, currency: string) => {
        return new Intl.NumberFormat('es-ar', {
            style: 'currency',
            currency: currency
        }).format(value);
    }

    return (
        <div className="pb-10">
            <div className="flex items-center mb-10">
                <Tooltip title="Volver a proveedores" position={{ horizontal: 'right', vertical: 'middle' }}>
                    <Link to="/products" className=" bg-transparent hover:bg-slate-100 transition-colors duration-200 text-gray-800 text-3xl rounded-full"><i className="bi bi-arrow-left"></i></Link>
                </Tooltip>
                <h4 className="flex-grow text-center font-medium text-3xl">Agregar producto</h4>
            </div>
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

                    <div>
                        <div className="flex gap-2 items-end codigoIput">
                            <InputLabel
                                labelText="Codigo de barras"
                                name="inputCodeBar"
                                placeholder="Código de barras"
                                value={formState.inputCodeBar}
                                onChange={onInputWrite}
/>
                            <Button type="button" className="rounded-md py-[5px] " onClick={addProductCodeBars}>Agregar</Button>
                        </div>
                        <ul className="mt-1 pl-5 ">
                            {
                                formState.barCodes.length === 0
                                    ? <li>Sin códigos de barras</li>
                                    : formState.barCodes.map((barcode, index) => (
                                        <li className="list-disc" key={barcode+index}>{barcode}</li>
                                    ))
                            }
                        </ul>
                    </div>
                </div>

                <div className="grid grid-cols-1 items-start">

                    <InputLabel
                        name="description"
                        placeholder="Descripción"
                        labelText="Descripción"
                        value={formState.description}
                        onChange={onInputWrite}
                        required
                    />

                    <div>
                        <div className="col-span-4">
                            <h3 className="font-medium text-lg mt-2 mb-2">Categorías del producto</h3>
                            <SelectWithFilter
                                items={categories}
                                selectionArr={formState.productCategories}
                                select={addProductCategory}

                            />
                        </div>
                        <div>
                            <h3 className="font-medium text-lg mt-2 mb-2 ">Proveedores del producto</h3>
                            <SelectWithFilter
                                items={suppliers}
                                selectionArr={formState.productProviders}
                                select={addProductSupplier}

                            />
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

                <Button className="self-end rounded-md" type="submit">Agregar producto</Button>
            </form>


        </div>
    )
}
