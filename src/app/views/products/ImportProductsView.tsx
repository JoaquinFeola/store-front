import { Link } from "react-router-dom"
import { Tooltip } from "../../../ui/components/tooltip/Tooltip"
import { useContext, useState, useRef, ChangeEvent } from "react"
import { ProductsContext } from "../../../context"
import { ProductToImport, ImportProductTemplate } from "../../../interfaces/product.interfaces"
import { excel } from "../../../plugins/exportAsExcel.plugin"
import { Button } from "../../../ui/components"
import { ListImportedProducts } from "../../components/ListImportedProducts"

export const ImportProductsView = () => {
    const { bulkCreateProducts } = useContext(ProductsContext)
    const [productsImported, setProductsImported] = useState<ProductToImport[]>([])
    const [errorslist, setErrorsList] = useState<string[]>([])
    const [ isFormSubmitting, setIsFormSubmitting] = useState(false);


    const inputFileRef = useRef<HTMLInputElement>(null);
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
                    categoriaId: "",
                    proveedorId: "",
                }
            ], "Plantilla para importar productos")
    };


    const readFileOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length === 0) return;

        const file = e.target.files![0];
        const reader = new FileReader();
        reader.onload = async function (event) {

            const data = new Uint8Array(event.target?.result as ArrayBuffer)

            const respJson = await excel.readExcel(data) as ImportProductTemplate[]
            const mapToProducts = respJson.map((productsToMap) => {
                return {
                    barCode: productsToMap.codigoDeBarras.toString(),
                    categoryId: parseInt(productsToMap.categoriaId),
                    description: productsToMap.descripcion.toString(),
                    expirationDate: productsToMap.fechaExpiracion || null,
                    percentageProfit: parseFloat(productsToMap.porcentajeGanancia),
                    supplierId: parseInt(productsToMap.proveedorId),
                    purchasePrice: parseFloat(productsToMap.precioCompra),
                    sku: productsToMap.sku.toString()
                } as ProductToImport
            })
            setProductsImported(mapToProducts);
            inputFileRef.current!.value = ''
        }

        reader.readAsArrayBuffer(file);
    };


    const onImportProducts = async () => {
        setIsFormSubmitting(true)
        if (productsImported.length === 0) return setIsFormSubmitting(false);
        const response =   await bulkCreateProducts(productsImported)
        
        scrollTo({ top: 0 })
        if ( response.hasError ) {
            setErrorsList(response.errors!);
        }
        setIsFormSubmitting(false)
    }
    return (
        <div>
            {/* {
                errorslist.map(err => (
                    <span className="bg-red-400 text-white">{err}</span>
                ))
            } */}
            <div className="flex items-center mb-10">
                <Tooltip title="Volver a productos" position={{ horizontal: 'right', vertical: 'middle' }}>
                    <Link to="/products" className=" bg-transparent hover:bg-slate-100 transition-colors duration-200 text-gray-800 text-3xl rounded-full"><i className="bi bi-arrow-left"></i></Link>
                </Tooltip>
                <h4 className="flex-grow text-center font-medium text-3xl">Importar productos</h4>
            </div>
            <div className="flex items-center gap-4 ">
                <Tooltip title="Descargar plantilla" position={{ horizontal: 'right', vertical: 'middle' }}>
                    <Button className="rounded-md px-3" onClick={handleDownloadProductTemplate} >
                        <i className="bi bi-download text-lg"></i>
                    </Button>
                </Tooltip>
                <Tooltip title="Subir excel" position={{ horizontal: 'right', vertical: 'middle' }}>
                    <Button className="rounded-md px-3" onClick={() => inputFileRef.current?.click()} >
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
            <ListImportedProducts setErrorsList={setErrorsList} setProductsExcelImported={setProductsImported} errorsList={errorslist} productsImported={productsImported} />
            <Button isButtonLoading={isFormSubmitting} className="rounded-md mt-5 disabled:bg-blue-500/50"  disabled={productsImported.length === 0} onClick={onImportProducts}>Importar</Button>
        </div>
    )
}
