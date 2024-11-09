export interface IDrawerLink {
    id: number;
    path: string;
    title: string;
    icon: string;
    children?: IDrawerLink[]
}

export interface IcreatedAtrawerLink {
    path: string;
    title: string;
    icon: string;
    children?: IcreatedAtrawerLink[];
}
