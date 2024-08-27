import { useContext, useEffect } from "react";
import { ListSales } from "../components/ListSales"
import { SalesContext } from "../../context/SalesContext";




export const ListSalesView = () => {
    const {getSalesPaginated, sales,} = useContext(SalesContext);


    useEffect(() => {
        getSalesPaginated()
    }, [])
    return (
        <div>


            <ListSales sales={sales} ></ListSales>
        </div>
    )
}
