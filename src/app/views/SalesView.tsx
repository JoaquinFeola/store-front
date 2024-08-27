import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import { Button, NoRegistries, Table, TableBody, TableCell, TableHead, TableRow } from "../../ui/components"
import { InputLabel } from "../../ui/components/inputs/InputLabel"
import { ProdcutInCart } from "../../interfaces/product.interfaces";
import { useForm } from "../../hooks/useForm";
import { httpClient } from "../../api/axios-config";
import { ApiResponseBody, SaleDetail } from "../../interfaces";
import { ModalsContext } from "../../context";
import { formatCurrency } from "../../utils/currency.util";
import { SalesContext } from "../../context/SalesContext";


const ListSaleProducts = ({ products, handleRetireProduct }: { products: ProdcutInCart[]; handleRetireProduct: (id: number) => void }) => {

    return (
        <div>
            <Table className="text-black">
                <TableHead>
                    <TableRow>
                        <TableCell>SKU</TableCell>
                        <TableCell>Imagen</TableCell>
                        <TableCell>Item</TableCell>
                        <TableCell>Precio</TableCell>
                        <TableCell>Cantidad</TableCell>
                        <TableCell>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        (products.length == 0)
                            ? <NoRegistries />
                            : products.map(product => (
                                <TableRow key={product.id} size="little" >
                                    <TableCell>
                                        {product.sku}
                                    </TableCell>
                                    <TableCell>
                                        {
                                            (product.image)
                                                ? <img width={50} className="" src={product.image} />
                                                : <span>Sin imagen</span>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {product.description}
                                    </TableCell>
                                    <TableCell>
                                        {formatCurrency(product.salePrice, 'ARS')}
                                    </TableCell>
                                    <TableCell>
                                        {product.quantity}
                                    </TableCell>
                                    <TableCell>
                                        {
                                            formatCurrency(parseFloat((product.salePrice * product.quantity).toFixed(2)), 'ARS')
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <Button type="button" style={{ color: 'black' }} className="bg-transparent text-black hover:bg-slate-100 rounded-full" onClick={() => handleRetireProduct(product.id)}>
                                            <i className="bi bi-trash text-red-600"></i>
                                        </Button>

                                    </TableCell>
                                </TableRow>
                            ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}


export const SalesView = () => {


    const { getProductsForSale, scanProductCodebar, createSale } = useContext(SalesContext);
    const [isProductFound, setIsProductFound] = useState(false);
    const { newModal } = useContext(ModalsContext)
    const [paidMethods, setPaidMethods] = useState<{ title: string, img?: string; id: number; }[]>([]);

    const [productsFound, setProductsFound] = useState<ProdcutInCart[]>([]);
    const { formState, onInputWrite, resetFormValues, assignAllNewValues } = useForm({
        search: '',
        note: '',
        paymentMethod: 1,
        cash: 0
    });

    const handleWriteChange = (e: ChangeEvent<HTMLInputElement>) => {

        let value = e.target.value.replace(/[^'0'-9.]/g, '');
        console.log(value)

        assignAllNewValues({
            cash: parseFloat(value) || 0
        })

    }


    const handleSelectPaymentMethod = (e: ChangeEvent<HTMLSelectElement>) => {
        if (parseInt(e.target.value) != 1) {
            assignAllNewValues({ cash: 0, paymentMethod: parseInt(e.target.value) })
            return;
        }
        assignAllNewValues({ paymentMethod: parseInt(e.target.value) })

    }

    const handleResetForm = () => {
        resetFormValues();
        setProductsFound([])
    }
    const handleDeleteProduct = (id: number) => {
        setProductsFound(productsFound.filter(product => product.id !== id))
    };



    const handleScanProduct = (e: ChangeEvent<HTMLInputElement>) => {
        const newEventValues = e
        newEventValues.target.value = e.target.value.trim()
        onInputWrite(newEventValues);


        if (e.target.value === '') return;
        const productFound = scanProductCodebar(e.target.value.trim());
        if (productFound == null) {
            setIsProductFound(false)
            return;
        };



        const isProductExists = productsFound.findIndex((product) => product.id == productFound.id);
        if (isProductExists === -1) {
            setProductsFound([{ ...productFound, quantity: 1 }, ...productsFound]);

            setIsProductFound(true)
        }
        else {

            setProductsFound(
                productsFound.map((product) => {
                    if (product.id == productFound.id) {
                        return {
                            ...product,
                            quantity: product.quantity += 1
                        }
                    }
                    return { ...product }
                })
            )
            setIsProductFound(true)
        }
        resetFormValues();
    };

    const calculateTotal = (products: ProdcutInCart[]) => {
        return products.reduce((prev, current) => {
            return current.salePrice * current.quantity + prev
        }, 0);
    };

    const total = calculateTotal(productsFound);


    const calculateTotalCashChange = () => {
        const change = formState.cash - total;

        return (formState.cash == 0) ? 0 : change
    };

    const totalCashChange = calculateTotalCashChange()

    useEffect(() => {

        const fetchPaidMethods = async () => {
            try {
                const { data } = await httpClient.get<ApiResponseBody<{ name: string, id: number; }[]>>('payment-type/all');



                let mappedPaymentMethods: { title: string, img?: string; id: number; }[] = [];
                for (let paymentMethod of data.data) {
                    mappedPaymentMethods.push({ id: paymentMethod.id, title: paymentMethod.name })
                };

                setPaidMethods(mappedPaymentMethods);
            }
            catch (error) {
                setPaidMethods([]);
            }
        }

        getProductsForSale();
        fetchPaidMethods();
    }, []);


    const buildSaleTemplate = async() => {
        const salesDetail: SaleDetail[] = [];


        for ( const product of productsFound ) {
            salesDetail.push({
                productId: product.id,
                quantity: product.quantity,
                salePrice: product.salePrice
            })
        }



        return await createSale({
            amountPaid: ( formState.paymentMethod === 1 ) ? formState.cash : total,
            changeReturned: ( formState.paymentMethod === 1 ) ? formState.cash : 0,
            note: formState.note,
            paymentTypeId: 1,
            salesDetail: salesDetail
        })
        
    }

    const onFormSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(productsFound, 'ha llegado aqui')
        if ( productsFound.length === 0 ) return;
        const response = await buildSaleTemplate();
        newModal({
            submitFunc: (ev) => {
                handleResetForm()
                ev.currentTarget.remove();
                
            },
            confirmLabel: 'Iniciar nueva venta',
            title: !response.hasErrors ? response.message :'Ocurrió un error inesperado',
        });

    }



    return (
            <form  onSubmit={onFormSubmit}>

                <div className="flex flex-wrap gap-x-2 items-end  ">
                    <div className="relative">

                        <InputLabel
                            autoFocus
                            tabIndex={1}
                            autoComplete="off"
                            type="search"
                            labelText="Busqueda de productos"
                            name="search"
                            onChange={handleScanProduct}
                            value={formState.search}
                            className="min-w-[300px]"
                            placeholder="Escaneá o ingresá para buscar..."
                        />
                        {
                            (!isProductFound && formState.search !== '')
                            && (
                                <span className="text-red-600 absolute -bottom-5 text-sm leading-none text-nowrap seect-none pointer-events-none">
                                    Producto no encontrado con ese codigo de barras
                                </span>
                            )
                        }

                    </div>
                    <div className="mt-3">
                        <h4 className="font-medium">
                            Forma de pago:
                        </h4>
                        <select
                            required
                            onChange={handleSelectPaymentMethod}
                            className="border-2 px-2 py-1 rounded-md"
                            name="paymentMethod"
                            id="">
                            {
                                paidMethods.map((paidMethod) => (
                                    <option key={paidMethod.id} value={paidMethod.id}>
                                        {paidMethod.title}
                                    </option>
                                ))
                            }
                        </select>

                    </div>
                </div>

                <div className="grid grid-cols-1 grid-rows-6 md:grid-cols-12  h-72 mt-8">
                    <div className="border-[1px]  md:col-span-9 row-span-4 md:row-span-6 rounded-md text-white">
                        <ListSaleProducts products={productsFound} handleRetireProduct={handleDeleteProduct} />
                    </div>
                    <div className="md:col-span-3 items-end row-span-2 md:row-span-6 border-[1px] flex flex-col">
                        {/* devolver dinero lugar */}
                        <div className="w-full p-2">
                            <h2 className="font-medium text-xl mb-2">Abonado</h2>
                            <input
                                className="w-full  border-2 px-4 py-1 rounded-md"
                                disabled={formState.paymentMethod !== 1 || productsFound.length === 0}
                                type="text"
                                value={formState.cash}
                                onChange={handleWriteChange}
                                autoComplete="off"
                                name="cash"
                            />
                            <h2 className="text-xl font-medium mt-3">Vuelto: <span>{formatCurrency(totalCashChange, 'ARS')}</span></h2>
                        </div>
                        <div className="w-full mt-auto">
                            <h4 className="text-center text-2xl font-medium mb-1">Total:</h4>
                            <div className="w-full min-h-[60px] max-h-[60px] flex items-center justify-center  bg-slate-200">
                                <h4 className="font-bold text-2xl">{formatCurrency(total, 'ARS')}</h4>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                   
                    <div className="mt-1 col-span-1">
                        <h3 className="font-medium text-lg mb-2">Nota:</h3>
                        <textarea onChange={onInputWrite} name="note" value={formState.note} rows={2}   className="min-w-[250px] max-w-[500px]  max border-[1px] focus:outline-none resize-none p-2 rounded-md" > hola</textarea>
                    </div>
                    <div className="col-span-1 place-self-end self-start pt-2">
                        <Button type="submit" className="rounded-md bg-green-700 hover:bg-green-800">
                            Cobrar (enter)
                        </Button>
                    </div>
                </div>

            </form>
    )
}