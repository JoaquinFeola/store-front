import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/components";
import { ListSuppliers } from "../components/ListSuppliers";
import { excel } from "../../plugins/exportAsExcel.plugin";
import { useContext, useState } from "react";
import { SuppliersContext } from "../../context";
import { formatDate } from "../../plugins/momentFormat.plugin";
import { Tooltip } from "../../ui/components/tooltip/Tooltip";

export const ListSuppliersView = () => {
    const { getAllSuppliers, suppliers, isSuppliersLoading } = useContext(SuppliersContext)
    const navigate = useNavigate();
    const [isLoading, setIsLoading ] = useState(false);


    const handleExportToExcel = async () => {
        setIsLoading(true);
        const suppliers = await getAllSuppliers();
        const suppliersMapped = suppliers.map((supplier) => {
            return {
                id: supplier.id,
                proveedor: supplier.name,
                nombreEmpresa: supplier.bussinessName,
                telefono: supplier.telephone,
                email: supplier.email,
                fechaCreacion: formatDate(supplier.created!, 'DD-MM-YYYY HH:mm'),
                fechaActualizacion: formatDate(supplier.updated!, 'DD-MM-YYYY HH:mm')
            }
        });
        await excel.exportAsExcelWithJsonData(
            suppliersMapped,
            'Proveedores'
        );

        setIsLoading(false);
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <Button onClick={() => navigate('create')} className="rounded-md" >
                    Agregar proveedor
                </Button>
                <Tooltip title="Exportar a excel" position={{horizontal: "left", vertical: 'middle'}}>
                    <Button isButtonLoading={isLoading} disabled={isSuppliersLoading === false && suppliers.length === 0 || isLoading} onClick={handleExportToExcel} className="disabled:bg-green-700/50 rounded-md px-3 hover:bg-green-800 bg-excelGreen">
                        <i className="bi bi-download"></i>
                    </Button>
                </Tooltip>
            </div>
            <ListSuppliers />
        </div>
    )
}
