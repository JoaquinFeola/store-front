export interface IDrawerLink {
    id: number;
    path: string;
    title: string;
    icon: string;
    children?: IDrawerLink[]
}

export interface ICreateDrawerLink {
    path: string;
    title: string;
    icon: string;
    children?: ICreateDrawerLink[];
}
