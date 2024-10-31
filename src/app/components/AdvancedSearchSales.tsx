import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../../ui/components";
import { SalesContext } from "../../context/SalesContext";
import { SelectFilter } from "../../ui/components/inputs/SelectFilter";
import { Checkbox } from "../../ui/components/inputs/Checkbox";


interface Props {
    handleAddProduct: (id: number) => void;
}

export const AdvancedSearchSales = ({ handleAddProduct }: Props) => {
    const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { obtainedProducts } = useContext(SalesContext)
    const [selectedProductToAdd, setSelectedProductToAdd] = useState(0);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {


            if (
                selectRef.current
                && !selectRef.current.contains(event.target as Node)
                && buttonRef.current
                && !buttonRef.current.contains(event.target as Node)
            ) {
                setIsAdvancedSearchOpen(false);
            }
        };


        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleResetSearch = () => {
        setIsAdvancedSearchOpen(false);
        setSelectedProductToAdd(0)
        
    }


    return (
        <>
            <Button ref={buttonRef} type="button" onClick={() => setIsAdvancedSearchOpen(true)} className="rounded-md ">Búsqueda avanzada</Button>
            {
                isAdvancedSearchOpen
                && (
                    <div ref={selectRef} className="animate__animated animate__bounceIn  absolute  bg-white w-full  shadow-sm  z-[400]">
                        <SelectFilter
                            searchValidator={
                                (items, search) => {
                                    return items.filter((item) => {
                                        const forSku = item.sku.toLowerCase()
                                            .startsWith(search.toLowerCase());
                                        const forDescription = item.description.toLowerCase()
                                            .startsWith(search.toLowerCase());
                                        const forCodebar = item.barCodes[0].code.startsWith(search.toLowerCase())




                                        return forSku || forCodebar || forDescription;
                                    })
                                }

                            }
                            items={obtainedProducts}
                            ItemComponent={({ item, isSelected }) => (
                                <div
                                    onClick={() => setSelectedProductToAdd((prev) => prev === item.id ? 0 : item.id)}
                                    className={`flex cursor-pointer items-center justify-between p-4 border-b border-gray-200  ${isSelected ? 'bg-slate-200 hover:bg-slate-300' : 'hover:bg-gray-100'}`}>
                                    <div className="flex items-center ">
                                        <div className="mr-4">
                                            <Checkbox onChange={() => { }} checked={isSelected} />
                                        </div>
                                        <img src={item.image} alt="" className="w-8 h-8 rounded-full" />
                                        <div className="ml-4 flex-1">
                                            <p className="text-sm font-medium text-gray-900">{item.description}</p>
                                            <p className="text-sm font-medium text-gray-900">{item.sku}</p>
                                            <p className="text-sm font-medium text-gray-900">{item.barCodes[0].code || 'Sin código de barras'}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            selectedItemId={selectedProductToAdd}

                        >

                        </SelectFilter>
                        <div className="bg-white min-w-[330px] max-w-[330px] shadow-md p-2">
                            <Button
                                type="button"
                                onClick={() => {
                                    if ( selectedProductToAdd === 0 ) return;
                                    handleAddProduct(selectedProductToAdd);
                                    handleResetSearch()
                                }}
                                className="rounded">
                                Añadir
                            </Button>
                        </div>
                    </div >

                )
            }
        </>
    )
}


