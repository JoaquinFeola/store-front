// export interface Sale

import { Product } from "./product.interfaces";


export interface SaleRequest {
    paymentTypeId: number;
    amountPaid: number;
    changeReturned: number;
    note: string;
    salesDetail: SaleDetail[]
}



export interface SaleForHomeYear {
    salesMonth: [number, number, number, number, number, number, number, number, number, number, number, number]
}

export interface SaleForHome {
    salesFromYesterday: SaleFromHomeDetail
    salesFromToday: SaleFromHomeDetail
}

interface SaleFromHomeDetail {
    totalSales: number;
    totalAmount: number;
}

export interface Sale {
    id: number;
    paymentTypeId: number;
    paymentType: PaymentType,
    total: number;
    amountPaid: 0,
    changeReturned: 0,
    note: "",
    created: string;
    isActive?: boolean;
    salesDetail: SaleInSaleDetail[];
}

export interface SaleInSaleDetail {
    id: number;
    saleMasterId: number;
    productId: number;
    product: Product,
    quantity: number;
    salePrice: number;
    totalPerLine: number;
    created: string
}

export interface SalesParamsRequest {
    pageSize: number;
    pageIndex: number;
}

export interface PaymentType {
    id: number;
    name: string;
}

export interface SaleDetail {
    productId: number;
    quantity: number;
    salePrice: number
}