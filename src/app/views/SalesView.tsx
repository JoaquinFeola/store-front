import { ChangeEvent, useEffect, useState } from "react"
import { NoRegistries, Table, TableBody, TableCell, TableHead, TableRow } from "../../ui/components"
import { InputLabel } from "../../ui/components/inputs/InputLabel"
import { useSales } from "../../hooks/useSales";
import { ProdcutInCart } from "../../interfaces/product.interfaces";
import { useForm } from "../../hooks/useForm";


const ListSaleProducts = ({ products }: { products: ProdcutInCart[] }) => {
    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
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
                                <TableRow>
                                    <TableCell>
                                        {product.description}
                                    </TableCell>
                                    <TableCell>
                                        {product.salePrice}
                                    </TableCell>
                                    <TableCell>
                                        {product.quantity}
                                    </TableCell>
                                    <TableCell>
                                        {product.salePrice * product.quantity}
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
    const { getProductsForSale, scanProductCodebar } = useSales();
    const [productsFound, setProductsFound] = useState<ProdcutInCart[]>([]);
    const { formState, onInputWrite, resetFormValues } = useForm({
        search: ''
    })


    const handleScanProduct = (e: ChangeEvent<HTMLInputElement>) => {
        onInputWrite(e)
        if (e.target.value === '') return;
        const productFound = scanProductCodebar(e.target.value.trim());
        console.log(productFound)
        if (productFound == null) return;
        const isProductExists = productsFound.findIndex((product) => product.id == productFound.id);
        if (isProductExists === -1) {
            setProductsFound([{ ...productFound, quantity: 1 }, ...productsFound]);
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
        }
        resetFormValues();
    };

    useEffect(() => {
        getProductsForSale()
    }, []);





    return (
        <>
            <div className="flex gap-2 items-end">

                <InputLabel

                    labelText="Código de barras"
                    name="search"
                    onChange={handleScanProduct}
                    value={formState.search}
                    className="min-w-[250px]"
                    placeholder="Escaneá o ingresá para buscar..."
                />

            </div>
            <div className="grid grid-cols-6 min-h-[400px] max-h-[400px] mt-4">
                <div className="bg-red-300 p-2 col-span-4 text-white">
                    <ListSaleProducts products={productsFound}/>
                </div>
                <div className="col-span-2 bg-blue-500 "></div>
            </div>

        </>
    )
}
