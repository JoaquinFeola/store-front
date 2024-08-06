import { ChangeEvent, useContext, useRef, useState } from "react";
import { excel } from "../../plugins/exportAsExcel.plugin"
import { Button } from "../../ui/components"
import { Tooltip } from "../../ui/components/tooltip/Tooltip"
import { BulkCreateStock, StockImportTemplate } from "../../interfaces/stock.interfaces";
import { ListImportedStock } from "../components/ListImportedStock";
import { StockContext } from "../../context";
import { Alert } from "../../ui/components/alerts/Alert";





export const ImportStockView = () => {

  const { bulkCreateStock } = useContext(StockContext)
  const [stockExcelImported, setStockExcelImported] = useState<BulkCreateStock[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [errorslist, setErrorsList] = useState<string[]>([])

  const handleDownloadStockTemplate = () => {
    excel.exportAsExcelWithJsonData<StockImportTemplate>([{ cantidad: '', productoId: '' }], "Plantilla para importar stock")
  };

  const readFileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 0) return console.log('File doesnt exists');

    const file = e.target.files![0];
    const reader = new FileReader();
    reader.onload = async function (event) {

      const data = new Uint8Array(event.target?.result as ArrayBuffer)

      const respJson = await excel.readExcel(data) as StockImportTemplate[]
      const mapToStock = respJson.map((stockToMap) => {
        return {
          productId: parseFloat(stockToMap.productoId!),
          quantity: parseFloat(stockToMap.cantidad),
        } as BulkCreateStock
      })
      setStockExcelImported(mapToStock);
      inputFileRef.current!.value = ''
    }

    reader.readAsArrayBuffer(file);
  };


  const onImportStock = async () => {
    if (stockExcelImported.length === 0) return;
    await bulkCreateStock(stockExcelImported, (errl) => setErrorsList(errl))
    scrollTo({ top: 0 })
  }

  return (
    <div>
      <div className="flex flex-col mb-4">
        {
          errorslist.map((message) => (
            <Alert message={message} type="error" />
          ))
        }

      </div>
      <div className="flex items-center gap-4 ">
        <Tooltip title="Descargar plantilla" position={{ horizontal: 'right', vertical: 'middle' }}>
          <Button className="rounded-md px-3" onClick={handleDownloadStockTemplate}>
            <i className="bi bi-download text-lg"></i>
          </Button>
        </Tooltip>
        <Tooltip title="Subir excel" position={{ horizontal: 'right', vertical: 'middle' }}>
          <Button className="rounded-md px-3" onClick={() => inputFileRef.current?.click()}>
            <i className="bi bi-file-earmark-arrow-down text-lg"></i>
          </Button>
        </Tooltip>
      </div>
      <input
        ref={inputFileRef}
        type="file"
        hidden
        onChange={readFileOnChange}
        accept=".xls,.xlsx,.xlsm,.xlsb,.xlt,.xltx,.xltm,.csv,.xml,.xlam"
        className=" hidden opacity-0 "
      />

      <ListImportedStock errorsList={errorslist} stockImported={stockExcelImported} />
      <Button
        onClick={onImportStock}
        disabled={stockExcelImported.length === 0}
        className="rounded-md mt-8 disabled:bg-blue-500/70">Importar stock</Button>

    </div>
  )
}