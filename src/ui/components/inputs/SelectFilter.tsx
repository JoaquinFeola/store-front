import React, { ChangeEvent, useMemo, useState } from "react"
import { InputLabel } from "./InputLabel";


interface Props<T> {
  items: T[];
  ItemComponent: React.ComponentType<ItemProps<T>>;
  selectedItemId?: number;
  searchValidator: (T: T[], search: string) => T[];
}
interface ItemProps<T> {
  item: T;
  isSelected: boolean;
}


export const SelectFilter = <T extends { id: number },>({
  items,
  ItemComponent,
  selectedItemId,
  searchValidator
}: Props<T>) => {


  if (searchValidator === undefined) throw new Error("SelectFilter: search is required");
  const [search, setSearch] = useState('');

  const onInputWrite = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }
  const itemsFiltered = useMemo(() => searchValidator(items, search), [search])


  return (
    <div className=" overflow-auto max-h-[250px] bg-white shadow-md min-w-[330px] max-w-[330px]">
      <div>
        <InputLabel
          id="search_products_selectfilter"
          autoComplete="off"
          value={search}
          name="search_p_slf"
          onChange={onInputWrite}

          placeholder="Descripción, SKU, Código de barras..."
          className="py-2 w-full" />
      </div>
      <div>
        {
          itemsFiltered.length === 0
            ? <div className="p-2">No hay resultados</div>
            : itemsFiltered.map((item) => (
              <ItemComponent isSelected={item.id === selectedItemId} item={item} key={item.id} />
            ))
        }
      </div>
    </div>
  )
}

