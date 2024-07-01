import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/components";
import { excel } from "../../plugins/exportAsExcel.plugin";
import { useContext } from "react";
import { ProductsContext } from "../../context";
import { formatDate } from "../../plugins/momentFormat.plugin";
import { Tooltip } from "../../ui/components/tooltip/Tooltip";
import { ListProducts } from "../components/ListProducts";

export const ListProductsView = () => {
    const { getAllProducts, isProductsLoading, products } = useContext(ProductsContext)
    const navigate = useNavigate();


    const handleExportToExcel = async () => {
        const products = await getAllProducts();
        const productsMapped = products.map((product) => {
            return {
                id: product.id,
                sku: product.sku,
                descripcion: product.description,
                fechaExpiracion: formatDate(new Date(product.expirationDate as string), 'DD-MM-YYYY'),
                precioCompra: product.purchasePrice,
                precioVenta: product.salePrice,
                fechaCreacion: formatDate(product.created, 'DD-MM-YYYY hh:mm'),
                fechaActualizacion: formatDate(product.updated!, 'DD-MM-YYYY hh:mm'),
            } 
        });
        excel.exportAsExcelWithJsonData(
            productsMapped,
            'Productos'
        )
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <Button onClick={() => navigate('create')} className="rounded-md" >
                    Agregar producto
                </Button>
                <Tooltip title="Exportar a excel" position={{horizontal: 'left', vertical: 'middle'}} >
                    <Button disabled={isProductsLoading === false && products.length === 0} onClick={handleExportToExcel} className="disabled:bg-green-700/50 rounded-md px-3 hover:bg-green-800 bg-excelGreen">
                        <i className="bi bi-download"></i>
                    </Button>
                </Tooltip>
            </div>
            <ListProducts />
        </div>
    )
}
