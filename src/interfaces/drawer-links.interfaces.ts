export interface IDrawerLink {
    id: number;
    path: string;
    title: string;
    icon: string;
    children?: IDrawerLink[]
}

export interface ICreatedAtrawerLink {
    path: string;
    title: string;
    icon: string;
    children?: ICreatedAtrawerLink[];
}
