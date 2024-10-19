import { useContext, useEffect, useRef, useState } from "react";
import { SelectWithFilter } from "../../ui/components/inputs/SelectWithFilter"
import { Button } from "../../ui/components";
import { SalesContext } from "../../context/SalesContext";



export const AdvancedSearchSales = () => {
    const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { obtainedProducts } = useContext(SalesContext)    

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

    



    return (
        <>
            <Button ref={buttonRef} onClick={() => setIsAdvancedSearchOpen(true)} className="rounded-md ">Búsqueda avanzada</Button>
            {
                isAdvancedSearchOpen
                && (
                    <div ref={selectRef} className="animate__animated animate__bounceIn  absolute bg-white   shadow-sm mt-1 z-[400]">
                        <SelectWithFilter

                            items={obtainedProducts.map(pr => ({
                                id: pr.id,
                                title: pr.sku,
                                image: pr.image
                            }))}
                            select={() => { }}
                            selectionArr={[]}
                        >

                        </SelectWithFilter>
                    </div>

                )
            }
        </>
    )
}


