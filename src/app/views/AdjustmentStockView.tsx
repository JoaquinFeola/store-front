import { ChangeEvent, useContext, useRef, useState } from "react";
import { BulkCreateStock, StockImportTemplate } from "../../interfaces/stock.interfaces";
import { excel } from "../../plugins/exportAsExcel.plugin";
import { Button } from "../../ui/components";
import { Tooltip } from "../../ui/components/tooltip/Tooltip";
import { StockContext } from "../../context";
import { ListAdjustment } from "../components/ListAdjustment";

export const AdjustmentStockView = () => {
  const { bulkCreateStock } = useContext(StockContext)
  const [stockExcelImported, setStockExcelImported] = useState<BulkCreateStock[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [errorslist, setErrorsList] = useState<string[]>([])
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const handleDownloadStockTemplate = () => {
    excel.exportAsExcelWithJsonData<StockImportTemplate>([{ cantidad: '', idStock: '' }], "Plantilla para ajustar stock")
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
          quantity: parseFloat(stockToMap.cantidad),
          stockId: parseFloat(stockToMap.idStock!)
        } as BulkCreateStock
      })
      setStockExcelImported(mapToStock);
      inputFileRef.current!.value = ''
    }

    reader.readAsArrayBuffer(file);
  };
  const onImportStock = async () => {
    setIsFormSubmitting(true);
    if (stockExcelImported.length === 0) return setIsFormSubmitting(false);
    await bulkCreateStock(
      stockExcelImported,
      (errl) => {
        if (errl.length === 0) {
          setStockExcelImported([])
        }
        setErrorsList(errl)
      })
    scrollTo({ top: 0 })
    setIsFormSubmitting(false);
  }

  return (
    <div>
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

      <ListAdjustment setErrorsList={setErrorsList} setStockExcelImported={setStockExcelImported} stockImported={stockExcelImported} errorsList={errorslist} />
      <Button
        isButtonLoading={isFormSubmitting}
        onClick={onImportStock}
        disabled={stockExcelImported.length === 0}
        className="rounded-md mt-8 disabled:bg-blue-500/70">Ajustar stock</Button>

    </div>
  )
}
