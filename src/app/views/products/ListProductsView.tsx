import { ListProducts } from "@/app/components/products/ListProducts";
import { ProductsContext } from "@/context";
import { excel } from "@/plugins/exportAsExcel.plugin";
import { formatDate } from "@/plugins/momentFormat.plugin";
import { Button, Tooltip } from "@/ui/components";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";



export const ListProductsView = () => {
    const { getAllProducts, isProductsLoading, products } = useContext(ProductsContext)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [isFiltersOpen, setFilterOpen] = useState(false);
    const handleToggleFiltersOpen = () => {
        setFilterOpen(!isFiltersOpen)
    }

    const handleExportToExcel = async () => {
        setIsLoading(true)
        const products = await getAllProducts();
        const productsMapped = products.map((product) => {
            return {
                id: product.id,
                sku: product.sku,
                descripcion: product.description,
                fechaExpiracion: formatDate(product.expirationDate!, 'DD-MM-YYYY'),
                precioCompra: product.purchasePrice,
                precioVenta: product.salePrice,
                fechaCreacion: formatDate(String(product.createdAt), 'DD-MM-YYYY hh:mm'),
                fechaActualizacion: formatDate(product.UpdatedAt ? String(product.UpdatedAt) : null, 'DD-MM-YYYY hh:mm'),
            }
        });
        await excel.exportAsExcelWithJsonData(
            productsMapped,
            'Productos'
        );
        setIsLoading(false);

    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button onClick={() => navigate('create')} className="rounded-md" >
                        Agregar producto
                    </Button>
                    <Button onClick={() => navigate('import')} className="rounded-md " >
                        Importar productos
                    </Button>
                </div>
                <div className="flex gap-2 items-center">
                    <Tooltip title={isFiltersOpen ? 'Cerrar filtros' : 'Desplegar filtros'} position={{ horizontal: 'left', vertical: 'middle' }} >
                        <Button
                            disabled={isProductsLoading === false && products.length === 0}
                            onClick={handleToggleFiltersOpen}
                            className="bg-slate-100 text-black text-2xl hover:shadow-inner  hover:bg-slate-200 rounded-full px-3"
                        >
                            <i className="bi bi-filter text-black"></i>
                        </Button>
                    </Tooltip>
                    <Tooltip title="Exportar a excel" position={{ horizontal: 'left', vertical: 'middle' }} >
                        <Button isButtonLoading={isLoading} disabled={isProductsLoading === false && products.length === 0 || isLoading} onClick={handleExportToExcel} className="disabled:bg-green-700/50 rounded-md px-3 hover:bg-green-800 bg-excelGreen">
                            <i className="bi bi-download"></i>
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <ListProducts isFiltersOpen={isFiltersOpen} />
        </div>
    )
}

