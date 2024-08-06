import { useState } from "react"
import { ProductForSale } from "../interfaces/product.interfaces"
import { httpClient } from "../api/axios-config";
import { ApiResponse } from "../interfaces";

export const useSales = () => {

    const [obtainedProducts, setObtainedProducts] = useState<ProductForSale[]>([]);



    const scanProductCodebar = (barcode: string): null | ProductForSale => {
        if (obtainedProducts.length === 0) return null;
        try {
            const foundProduct = obtainedProducts.find(product => {
                return product.barCodes.find(bc => bc.code === barcode)
            });

            if (foundProduct === undefined) return null;

            return foundProduct;
        }
        catch (error) {
            return null
        }
    };

    const getProductsForSale = async () => {
        try {
            const response: ApiResponse<ProductForSale[]> = await httpClient.get('product/for-sale');
            setObtainedProducts(response.data.data);
        }
        catch (error) {
            return error;
        }
    };

    return {
        getProductsForSale,
        scanProductCodebar,
        obtainedProducts
    }


}
