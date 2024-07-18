import { excel } from "../../plugins/exportAsExcel.plugin"
import { Button } from "../../ui/components"
import { Tooltip } from "../../ui/components/tooltip/Tooltip"


export interface StockImportTemplate {
  idStock: string;
  productoId: string;
  cantidad: string;
}


export const ImportStockView = () => {



  const handleDownloadStockTemplate = () => {
    excel.exportAsExcelWithJsonData<StockImportTemplate>([{ cantidad: '', idStock: '', productoId: '' }], "Plantilla para importar stock")

  }


  return (
    <div>
      <div>
        <Tooltip title="Descargar plantilla" position={{ horizontal: 'right', vertical: 'middle' }}>
          <Button className="rounded-md px-3" onClick={handleDownloadStockTemplate}>
            <i className="bi bi-download "></i>
          </Button>
        </Tooltip>
      </div>

    </div>
  )
}
