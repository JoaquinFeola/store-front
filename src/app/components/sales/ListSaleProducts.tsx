import { ProductInCart } from "@/interfaces";
import { Table, TableHead, TableRow, TableCell, TableBody, NoRegistries } from "@/ui/components";
import { ProductSaleTableItem } from "./ProductSaleTableItem";


export const ListSaleProducts = ({ products, handleRetireProduct, aumentOrDecrementProductQuantity }: { products: ProductInCart[]; aumentOrDecrementProductQuantity: (id: number, isDecrementing?: boolean) => void; handleRetireProduct: (id: number) => void }) => {

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
                        : products.map((product, i) => (
                            <ProductSaleTableItem
                                key={i}
                                aumentOrDecrementProductQuantity={aumentOrDecrementProductQuantity}
                                handleRetireProduct={handleRetireProduct}
                                product={product}
                            />
                        ))
                }
            </TableBody>
        </Table>
    )
}