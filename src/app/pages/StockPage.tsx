import { useContext, useEffect } from "react";
import { Button } from "../../ui/components"
import { Tooltip } from "../../ui/components/tooltip/Tooltip"
import { StockContext } from "../../context";
import { ListStock } from "../components/ListStock";



export const StockPage = () => {
    const { importAllProducts, isImportingProducts, hasProducts, getStockPaginated } = useContext(StockContext);

    useEffect(() => {
        getStockPaginated();
    }, [])

    return (
        <div>
            <div className="">
                <Tooltip title="Importar todos los productos" position={{ horizontal: 'right', vertical: 'middle' }} >
                    <Button onClick={importAllProducts} disabled={hasProducts} isButtonLoading={isImportingProducts} className="disabled:bg-blue-600/50 rounded-md text-xl">
                        <i className="bi  bi-arrow-bar-down"></i>
                    </Button>
                </Tooltip>
            </div>
            <ListStock isFiltersOpen={false} />

        </div>
    )
}
