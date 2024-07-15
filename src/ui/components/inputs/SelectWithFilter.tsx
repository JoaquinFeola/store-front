import { useEffect, useRef, useState } from "react"
import { Checkbox } from "./Checkbox";
import { useForm } from "../../../hooks/useForm";


interface SelectWithFilterProps {
  items: { title: string, img?: string; id: number; }[];
  selectionArr?: number[],
  select: (id: number) => void;
  labelText?: string;
}

export const SelectWithFilter = ({ items, select, selectionArr, labelText }: SelectWithFilterProps) => {

  const selectRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { formState, onInputWrite } = useForm({ search: '' });



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, []);

  return (
    <div ref={selectRef} className="min-w-52 max-w-full relative">
      {labelText ? labelText : ''}
      <div
        onClick={() => setIsOpen(true)}
        className={`${(isOpen) ? 'bi bi-caret-up-fill' : 'bi-caret-down-fill '} h-10 border-2 bi before:absolute before:top-1/2 before:-translate-y-1/2 relative before:right-2 before:text-gray-700`}>
        {
          (isOpen)
            ? (
              <input
                autoComplete="off"
                type="text"
                autoFocus={isOpen}
                className="h-full w-full px-4 focus:outline-none"
                placeholder="Filtrar busqueda"
                value={formState.search}
                onChange={onInputWrite}
                name="search"
              />
            )
            : (
              <div
                className="h-full px-4 focus:outline-none flex items-center"

              >
                {
                  (selectionArr?.length == 0)
                    ? 'Sin elementos'
                    : items.filter(item => item.id == selectionArr?.find(el => el == item.id))
                      .map(item => item.title)
                      .join(', ')
                }
              </div>
            )
        }
        
      </div>
      <ul className={`bg-slate-100 py-2 px-2 z-[200] absolute w-full   max-h-36 overflow-auto scale-0 ${isOpen ? 'scale-100' : 'scale-0'} transition-all duration-150`}>
        {
          (items.length == 0)
            ? 'Esta vacío'
            : items
              .filter((item) => item.title.toLowerCase()
                .startsWith(formState.search.toLowerCase()))
              .map((item) => (
                <li onClick={() => select(item.id)} key={item.id.toString()} className="hover:bg-slate-200 px-4 py-2 cursor-pointer">
                  <div className="flex items-ceter gap-4">
                    <Checkbox
                      onChange={() => { }}
                      checked={
                        selectionArr?.indexOf(item.id) !== -1 ? true : false
                      }
                    />
                    {item.title}
                  </div>
                </li>
              ))
        }
      </ul>
    </div>
  )
}
