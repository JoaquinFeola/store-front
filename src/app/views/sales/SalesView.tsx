import { AdvancedSearchSales } from "@/app/components/sales/AdvancedSearchSales";
import { ListSaleProducts } from "@/app/components/sales/ListSaleProducts";
import { useSale } from "@/hooks/sales/useSale";
import { Button, InputLabel } from "@/ui/components";
import { formatCurrency } from "@/utils/currency.util";



export const SalesView = () => {

    const {
        aumentOrDecrementProductQuantity,
        formRef,
        formState,
        handleAddProduct,
        handleDeleteProduct,
        handleScanProduct,
        handleSelectPaymentMethod,
        handleWriteChange,
        inputCashRef,
        isProductFound,
        onFormSubmit,
        onInputWrite,
        paidMethods,
        total,
        totalCashChange,
        productsFound
    } = useSale();





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
                    <ListSaleProducts
                        aumentOrDecrementProductQuantity={aumentOrDecrementProductQuantity}
                        products={productsFound}
                        handleRetireProduct={handleDeleteProduct}
                    />
                </div>
                <div className="border-[1px] flex-wrap flex  col-span-3 ">
                    <div className="w-full p-2">
                        <h2 className="font-medium text-xl mb-2">Abonado</h2>
                        {/* <input
                            className="w-full  border-2 px-4 py-1 rounded-md"
                            disabled={formState.paymentMethod !== 1 || productsFound.length === 0}
                            type="text"
                            value={formState.cash}
                            onChange={handleWriteChange}
                            autoComplete="off"
                            name="cash"
                            ref={inputCashRef}
                        /> */}
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
}