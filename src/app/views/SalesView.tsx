import React, { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react"
import { Button, NoRegistries, Table, TableBody, TableCell, TableHead, TableRow } from "../../ui/components"
import { InputLabel } from "../../ui/components/inputs/InputLabel"
import { ProductInCart } from "../../interfaces/product.interfaces";
import { useForm } from "../../hooks/useForm";
import { httpClient } from "../../api/axios-config";
import { ApiResponseBody, SaleDetail } from "../../interfaces";
import { ModalsContext } from "../../context";
import { formatCurrency, formatToDecimal, parseFormattedValue } from "../../utils/currency.util";
import { SalesContext } from "../../context/SalesContext";
import { AdvancedSearchSales } from "../components/AdvancedSearchSales";

const ListSaleProducts = ({ products, handleRetireProduct, aumentOrDecrementProductQuantity }: { products: ProductInCart[]; aumentOrDecrementProductQuantity: (id: number, isDecrementing?: boolean) => void; handleRetireProduct: (id: number) => void }) => {

    return (


        <Table className=" text-black overflow-auto h-[500px]" autoHeight={false}>
            <TableHead >
                <TableRow >
                    <TableCell>SKU</TableCell>
                    <TableCell>Imagen</TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Total</TableCell>
                </TableRow>
            </TableHead>
            <TableBody className="">
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
                                <TableCell className="">
                                    <Button onClick={() => aumentOrDecrementProductQuantity(product.id, true)} type="button" className="bg-transparent hover:bg-slate-100 rounded-full mr-1 " style={{ color: 'black' }}>-</Button>
                                    {product.quantity}
                                    <Button onClick={() => aumentOrDecrementProductQuantity(product.id)} style={{ color: 'black' }} type="button" className="ml-1 rounded-full hover:bg-slate-100 bg-transparent">+</Button>
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
    )
}

const SalesView = React.memo(() => {


    const { getProductsForSale, scanProductCodebar, createSale, getProductForSaleById } = useContext(SalesContext);
    const [isProductFound, setIsProductFound] = useState(false);
    const { newModal } = useContext(ModalsContext)
    const [paidMethods, setPaidMethods] = useState<{ title: string, img?: string; id: number; }[]>([]);
    const inputCashRef = useRef<HTMLInputElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productsFound, setProductsFound] = useState<ProductInCart[]>([]);


    const formRef = useRef<HTMLFormElement>(null);

    const { formState, onInputWrite, resetFormValues, assignAllNewValues } = useForm({
        search: '',
        note: '',
        paymentMethod: 1,
        cash: '0',
        cashToPost: 0
    });

    const handleWriteChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const cursorPosition = e.target.selectionStart;
        const formatted = formatToDecimal(value);
        const numeric = parseFormattedValue(formatted);
        if (value === '') return;

        assignAllNewValues({
            cash: formatted,
            cashToPost: numeric!
        })

        if (inputCashRef.current && cursorPosition !== null) {
            setTimeout(() => {
                const position = Math.min(cursorPosition, formatted.length);
                inputCashRef.current?.setSelectionRange(position, position);
            }, 0);
        }

    }

    const aumentOrDecrementProductQuantity = (id: number, isDecrementing: boolean = false) => {
        const productFound = productsFound.findIndex(product => product.id === id);

        if (productsFound[productFound].quantity <= 1 && isDecrementing) return;

        (isDecrementing)
            ? setProductsFound(
                productsFound.map((product) => {
                    return {
                        ...product,
                        quantity: product.quantity - 1
                    }
                })
            )
            : setProductsFound(
                productsFound.map((product) => {
                    return {
                        ...product,
                        quantity: product.quantity + 1
                    }
                })
            )
    }

    const handleSelectPaymentMethod = (e: ChangeEvent<HTMLSelectElement>) => {
        if (parseInt(e.target.value) != 1) {
            assignAllNewValues({ cash: '0', paymentMethod: parseInt(e.target.value) })
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

    const handleAddProduct = (id: number) => {
        const productFound = getProductForSaleById(id);
        if (productsFound === null) return;
        if (productsFound.findIndex(product => product.id === id) !== -1) {
            setProductsFound((prev) => prev.map((product) => {
                if (product.id !== id) return product;

                return {
                    ...product,
                    quantity: product.quantity + 1
                };
            }));

        }
        else {

            setProductsFound([...productsFound, { ...productFound, quantity: 1 } as ProductInCart]);
        }


    }

    const handleScanProduct = (e: ChangeEvent<HTMLInputElement>) => {
        const newEventValues = e
        newEventValues.target.value = e.target.value.trim()
        onInputWrite(newEventValues);


        if (e.target.value === '') return;
        const productFound = scanProductCodebar(e.target.value.trim());
        if (productFound == null) {
            setIsProductFound(false)
            return;
        }



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
        assignAllNewValues({ search: '' });
    };

    const calculateTotal = (products: ProductInCart[]) => {
        return products.reduce((prev, current) => {
            return current.salePrice * current.quantity + prev
        }, 0);
    };

    const total = calculateTotal(productsFound);


    const calculateTotalCashChange = () => {
        const change = formState.cashToPost - total;

        return (formState.cashToPost == 0) ? 0 : change
    };

    const totalCashChange = calculateTotalCashChange()

    const fetchPaidMethods = async () => {
        try {
            const { data } = await httpClient.get<ApiResponseBody<{ name: string, id: number; }[]>>('payment-type/all');



            const mappedPaymentMethods: { title: string, img?: string; id: number; }[] = [];
            for (const paymentMethod of data.data) {
                mappedPaymentMethods.push({ id: paymentMethod.id, title: paymentMethod.name })
            }

            setPaidMethods(mappedPaymentMethods);
        }
        catch (error) {
            setPaidMethods([]);
        }
    }
    useEffect(() => {

        const fetchData = async () => {
            await Promise.all([
                getProductsForSale(),
                fetchPaidMethods(),

            ])
        }
        fetchData();
    }, []);


    const buildSaleTemplate = async () => {
        const salesDetail: SaleDetail[] = [];


        for (const product of productsFound) {
            salesDetail.push({
                productId: product.id,
                quantity: product.quantity,
                salePrice: product.salePrice
            })
        }



        return await createSale({
            amountPaid: (formState.paymentMethod === 1) ? formState.cashToPost : total,
            changeReturned: (formState.paymentMethod === 1) ? formState.cashToPost : 0,
            note: formState.note,
            paymentTypeId: formState.paymentMethod,
            salesDetail: salesDetail
        })

    }

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (productsFound.length === 0) return;
        setIsModalOpen(true)
        newModal({
            submitFunc: async (ev) => {
                await buildSaleTemplate();
                ev.preventDefault()
                handleResetForm()

                setIsModalOpen(false);
            },
            cancelFunc: () => {
                setIsModalOpen(false)
            },
            title: '¿Confirmar Venta?',
            confirmLabel: 'Confirmar',
        });
    }



    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                event.preventDefault(); // Previene el comportamiento por defecto
                if (formRef.current !== null && !isModalOpen) {
                    formRef.current.requestSubmit(); // Envía el formulario si el modal no está abierto
                }
            }
        };

        // Adjunta el evento de teclado
        document.addEventListener("keydown", handleKeyPress);

        // Limpia el evento cuando el componente se desmonta
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [isModalOpen]);




    return (
        <form ref={formRef} onSubmit={onFormSubmit} className="">

            <div className="flex  gap-x-2 items-end flex-wrap ">
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
                        placeholder="Búsqueda por Código de Barra o SKU"
                    />
                    {
                        (!isProductFound && formState.search !== '')
                        && (
                            <span className="text-red-600 absolute -bottom-5 text-sm leading-none text-nowrap seect-none pointer-events-none">
                                Producto no encontrado con ese codigo de barras o SKU
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
                        value={formState.paymentMethod.toString()}
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
                <div className="relative">
                    <AdvancedSearchSales handleAddProduct={handleAddProduct} />
                </div>
            </div>

            <div className=" mt-6 grid grid-cols-1 md:grid-cols-12 ">
                <div className="border-[1px] col-span-9 rounded-md text-white ">
                    <ListSaleProducts aumentOrDecrementProductQuantity={aumentOrDecrementProductQuantity} products={productsFound} handleRetireProduct={handleDeleteProduct} />
                </div>
                <div className="border-[1px] flex-wrap flex  col-span-3 ">
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
                            ref={inputCashRef}
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
            <div className="flex justify-between flex-wrap">

                <div className="mt-1 ">
                    <h3 className="font-medium text-lg mb-2">Nota:</h3>
                    <textarea onChange={onInputWrite} name="note" value={formState.note} rows={2} className="min-w-[250px] max-w-[500px]  max border-[1px] focus:outline-none resize-none p-2 rounded-md" > hola</textarea>
                </div>
                <div className="  pt-2">
                    <Button type="submit" className="rounded-md bg-green-700 hover:bg-green-800">
                        Guardar venta
                    </Button>
                </div>
            </div>

        </form>
    )
})

export default SalesView