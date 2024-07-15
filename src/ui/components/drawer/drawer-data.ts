import { ICreateDrawerLink, IDrawerLink } from "../../../interfaces";



const assignIdPerLink = (links: ICreateDrawerLink[]): ICreateDrawerLink[] => {
    return links.map((link, index) => {
        // Procesa los children recursivamente si existen
        const newChildren = link.children ? assignIdPerLink(link.children) : undefined;

        return {
            ...link,
            icon: 'bi bi-' + link.icon,
            id: index + 1,
            children: newChildren
        };
    });
};


class DrawerService {

    private asideLinks: IDrawerLink[] = []

    constructor(
        private leftNavbarLinks: ICreateDrawerLink[]
    ) {

        this.asideLinks = assignIdPerLink(this.leftNavbarLinks) as IDrawerLink[];



    }

    get drawerLinks() {
        return this.asideLinks
    }
}

const drawerLinks: ICreateDrawerLink[] = [
    {
        title: 'Inicio',
        icon: 'house-fill',
        path: '/',
    },
    {
        title: 'Categorías',
        icon: 'tags-fill',
        path: '/categories',
    },
    {
        title: 'Proveedores',
            icon: 'people-fill',
        path: '/suppliers',
    },
    {
        title: 'Productos',
        icon:  'handbag-fill',
        path:  '',
        children: [
            {
                title: 'Listado de productos',
                icon: 'card-list',
                path: '/products',
            },
            {
                title: 'Actualizacion por proveedor',
                icon: 'person-up',
                path: '/products/update-by-supplier',
            },
            
        ]
            
    },
    {
        title: 'Stock',
        icon: 'bar-chart-fill',
        path: '/stock',
    },
];

export const drawerService = new DrawerService(drawerLinks);





