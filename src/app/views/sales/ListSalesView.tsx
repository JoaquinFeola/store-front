import { ListSales } from "@/app/components/sales/ListSales";
import { SalesContext } from "@/context/SalesContext";
import { useContext, useEffect } from "react";




export const ListSalesView = () => {
    const {getSalesPaginated, sales,} = useContext(SalesContext);


    useEffect(() => {
        getSalesPaginated()
    }, [])
    return (
        <div>


            <ListSales sales={sales}  />
        </div>
    )
}


