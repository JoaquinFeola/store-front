import { httpClient } from "@/api/axios-config";
import { ModalsContext, SalesContext } from "@/context";
import { ProductInCart, ApiResponseBody, SaleDetail } from "@/interfaces";
import { ChangeEvent, FormEvent, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "../store/useForm";
import { formatToInteger, parseFormattedValue } from "@/utils/currency.util";

export const useSale = () => {
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


    // cash input

    const handleWriteChange = (e: ChangeEvent<HTMLInputElement>) => {

        const inputValue = e.target.value;
        const formattedValue = formatToInteger(inputValue);
        const numericValue = parseFormattedValue(formattedValue);

        assignAllNewValues({
            cash: formattedValue,
            cashToPost: numericValue || 0
        });
    }

    const aumentOrDecrementProductQuantity = useCallback((id: number, isDecrementing: boolean = false) => {
        const productFound = productsFound.findIndex(product => product.id === id);

        if (productsFound[productFound].quantity <= 1 && isDecrementing) return;

        (isDecrementing)
            ? setProductsFound(
                productsFound.map((product) => {
                    if (product.id !== id) return product;
                    return {
                        ...product,
                        quantity: product.quantity - 1
                    }
                })
            )
            : setProductsFound(
                productsFound.map((product) => {
                    if (product.id !== id) return product;
                    return {
                        ...product,
                        quantity: product.quantity + 1
                    }
                })
            )
    }, [productsFound])

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
    const handleDeleteProduct = useCallback((id: number) => {
        setProductsFound(productsFound.filter(product => product.id !== id))
    }, [productsFound]);

    const handleAddProduct = useCallback((id: number) => {
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


    }, [productsFound, getProductForSaleById])

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


    return {
        handleSelectPaymentMethod,
        formState,
        totalCashChange,
        handleScanProduct,
        formRef,
        onFormSubmit,
        isProductFound,
        paidMethods,
        handleAddProduct,
        aumentOrDecrementProductQuantity,
        handleWriteChange,
        inputCashRef,
        total,
        onInputWrite,
        handleDeleteProduct,
        productsFound
    }

}

