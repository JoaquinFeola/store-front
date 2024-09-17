import React, { FormEvent, useContext } from "react"
import { Category } from "../../interfaces"
import { Button, TableCell, TableRow } from "../../ui/components"
import { AlertsContext, CategoriesContext, ModalsContext } from "../../context"

interface CategoriesTableItemProps {
    category: Category
}


const UpdateCategoriesForm = ({defaultInputValue}: {defaultInputValue: string}) => {


    return (
      <div  className="flex flex-col gap-4">
        <input
          className={`bg-slate-100  focus:outline-none rounded-sm px-4 py-2`}
          type="text"
          required
          defaultValue={defaultInputValue}
          autoComplete="off"
          minLength={2}
          maxLength={100}
          name="category_name"
          placeholder="Editar categoría"
        />
      </div>
    )
  
  
  };


export const CategoriesTableItem = React.memo(({ category } : CategoriesTableItemProps) => {

    const { updateCategory, deleteCategory }  = useContext(CategoriesContext);
    const { newModal } = useContext(ModalsContext);
    const {  addAlert} = useContext(AlertsContext);

    const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        const categoryNameValue = formData.get('category_name')?.toString();
        if ( categoryNameValue === category.name ) {
            addAlert({
                duration: 4000,
                message: 'El texto ingresado es igual al actual. No se realizaron cambios',
                type: 'info',
            });
            return;
        };
        if  ( categoryNameValue!.length <= 0 || categoryNameValue === undefined ) return;
        updateCategory(categoryNameValue, category.id!);
      }
    

    const openUpdateModal = () => {
        newModal({
            submitFunc: onFormSubmit,
            confirmLabel: 'Guardar',
            content:  <UpdateCategoriesForm defaultInputValue={category.name!} />,
            title: `Editar "${category.name}"`
        })
    }
    const openDeleteModal = () => {
        newModal({
            submitFunc: () => deleteCategory(category.id!) ,
            confirmLabel: 'Eliminar',
            title: `¿Estás seguro que desesas eliminar la categoría  "${category.name}"?`
        })
    }

    return (
        <TableRow className="border-b-[1px] last:border-b-transparent">
            <TableCell className="font-medium" align="left">{ category?.id }</TableCell>
            <TableCell align="center">{ category?.name }</TableCell>
            <TableCell align="right" style={{width: 0}}>
                <Button className="rounded-sm shadow-md" onClick={openUpdateModal}>
                    <i className="bi bi-pencil-square"></i>
                </Button>
                <Button onClick={openDeleteModal} className="ml-3 rounded-sm hover:bg-red-600 bg-red-500 shadow-md ">
                    <i className="bi bi-trash3"></i>
                </Button>
            </TableCell>
            <TableCell align="center" >
                <span className={`${category.isActive ? 'text-green-600' : 'text-red-600'}`}>{category.isActive ? 'Activo' : 'Inactivo'}</span>
                {/* <div className={`${category.isActive ? 'bg-green-400' : 'bg-red-400'} w-[15px] shadow-md h-[15px] rounded-full `}></div> */}
            </TableCell>
        </TableRow>
    )
})
