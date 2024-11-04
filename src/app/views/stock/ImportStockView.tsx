import { ListImportedStock } from "@/app/components/stock/ListImportedStock";
import { StockContext } from "@/context";
import { BulkCreateStock, StockImportTemplate } from "@/interfaces/stock.interfaces";
import { excel } from "@/plugins/exportAsExcel.plugin";
import { Button, Tooltip } from "@/ui/components";
import { Alert } from "@/ui/components/alerts/Alert";
import { useContext, useState, useRef, ChangeEvent } from "react";





export const ImportStockView = () => {

  const { bulkCreateStock } = useContext(StockContext)
  const [stockExcelImported, setStockExcelImported] = useState<BulkCreateStock[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [errorslist, setErrorsList] = useState<string[]>([])
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const handleDownloadStockTemplate = () => {
    excel.exportAsExcelWithJsonData<StockImportTemplate>([{ cantidad: '', productoId: '' }], "Plantilla para importar stock")
  };

  const readFileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 0) return;

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
      setErrorsList([]);
      setStockExcelImported(mapToStock);
      inputFileRef.current!.value = ''
    }

    reader.readAsArrayBuffer(file);
  };


  const onImportStock = async () => {
    setIsFormSubmitting(true)
    if (stockExcelImported.length === 0) return setIsFormSubmitting(false);
    await bulkCreateStock(
      stockExcelImported,
      (errl) => {
        if (errl.length === 0) return setStockExcelImported([]);
        setErrorsList(errl)
      })


    scrollTo({ top: 0 })

    setIsFormSubmitting(false);
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

      <ListImportedStock
        setStockExcelImported={setStockExcelImported}
        errorsList={errorslist}
        setErrorsList={setErrorsList}
        stockImported={stockExcelImported}
      />
      <Button
        isButtonLoading={isFormSubmitting}
        onClick={onImportStock}
        disabled={stockExcelImported.length === 0}
        className="rounded-md mt-8 disabled:bg-blue-500/70">Importar stock</Button>

    </div>
  )
}