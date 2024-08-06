import { Link } from "react-router-dom"
import { Tooltip } from "../../ui/components/tooltip/Tooltip"
import { Button } from "../../ui/components"
import { ImportProductTemplate } from "../../interfaces/product.interfaces";
import { excel } from "../../plugins/exportAsExcel.plugin";

export const ImportProductsView = () => {

    const handleDownloadProductTemplate = () => {
        excel.exportAsExcelWithJsonData<ImportProductTemplate>(
            [
                { 
                    sku: "",
                    descripcion: "",
                    fechaExpiracion: "",
                    codigoDeBarras: "",
                    porcentajeGanancia: "",
                    precioCompra: "",
                    productoId: "",
                    categoriaId: "",
                    proveedorId: "",
                }
            ], "Plantilla para importar stock")
      };
    return (
        <div>
            <div className="flex items-center mb-10">
                <Tooltip title="Volver a productos" position={{ horizontal: 'right', vertical: 'middle' }}>
                    <Link to="/products" className=" bg-transparent hover:bg-slate-100 transition-colors duration-200 text-gray-800 text-3xl rounded-full"><i className="bi bi-arrow-left"></i></Link>
                </Tooltip>
                <h4 className="flex-grow text-center font-medium text-3xl">Importar productos</h4>
            </div>
            <div className="flex items-center gap-4 ">
                <Tooltip title="Descargar plantilla"  position={{ horizontal: 'right', vertical: 'middle' }}>
                    <Button className="rounded-md px-3" onClick={handleDownloadProductTemplate} >
                        <i className="bi bi-download text-lg"></i>
                    </Button>
                </Tooltip>
                <Tooltip title="Subir excel" position={{ horizontal: 'right', vertical: 'middle' }}>
                    <Button className="rounded-md px-3" >
                        <i className="bi bi-file-earmark-arrow-down text-lg"></i>
                    </Button>
                </Tooltip>
            </div>
        </div>
    )
}
