


export interface Supplier {
    id?: number;
    name: string;
    busisnessName?: string | null;
    telephone?: string | null;
    email?: string | null;
    image?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    isDeleted?: boolean;
}