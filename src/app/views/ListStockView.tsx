import { useContext, useState } from "react";
import { Button } from "../../ui/components"
import { Tooltip } from "../../ui/components/tooltip/Tooltip"
import { StockContext } from "../../context";
import { ListStock } from "../components/ListStock";

export const ListStockView = () => {

    const [isFiltersOpen, setFilterState ] = useState(false);

    const { stockList, isStockLoading } = useContext(StockContext);
    
    const handleToggleFiltersOpen = () => {
        setFilterState(!isFiltersOpen);
    };

    return (
        <div>

            <div className="flex items-center justify-end">
                <Tooltip title={isFiltersOpen ? 'Cerrar filtros' : 'Desplegar filtros'} position={{ horizontal: 'left', vertical: 'middle' }} >
                    <Button
                        disabled={isStockLoading === false && stockList.length === 0}
                        onClick={handleToggleFiltersOpen}
                        className="bg-slate-100 text-black text-2xl hover:shadow-inner  hover:bg-slate-200 rounded-full px-3"
                    >
                        <i className="bi bi-filter text-black"></i>
                    </Button>
                </Tooltip>
            </div>
            <ListStock isFiltersOpen={isFiltersOpen} />

        </div>
    )
}
