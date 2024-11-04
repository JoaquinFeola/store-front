import { Button, Tooltip } from "@/ui/components";


interface BarcodesListProps {
    barcodes: string[];
    deleteFunc: (barcode: string) => void;

}

export const BarcodesList = ({ barcodes, deleteFunc }: BarcodesListProps) => {
    return (
        <ul className="mt-1   flex flex-col gap-2 *:border-2 *:rounded-md *:px-2 ">
            {
                ( barcodes.length > 0 )
                     && barcodes.map((barcode, index) => (
                        <li className="list-none flex items-center justify-between" key={barcode + index}>
                            <span> {barcode} </span>
                            <Tooltip title="Eliminar código de barra">
                                <Button 
                                type="button" onClick={() => deleteFunc(barcode)} 
                                className=" hover:bg-slate-100 rounded-full  ml-4 bg-transparent hover:text-black *:text-black text-2xl h-max w-max"><i className="bi bi-x"></i></Button>
                            </Tooltip>
                        </li>
                    ))
            }
        </ul>
    )
}
