import { FormEvent, useContext, useState } from "react"
import { Button } from "../../ui/components"
import { ListCategories } from "../components/ListCategories"
import { CategoriesContext, ModalsContext } from "../../context"
import { excel } from "../../plugins/exportAsExcel.plugin";
import { Tooltip } from "../../ui/components/tooltip/Tooltip";
import { formatDate } from "../../plugins/momentFormat.plugin";


const CreateCategoriesForm = () => {


  return (
    <div className="flex flex-col gap-4">
      <input
        className={`bg-slate-100  focus:outline-none rounded-sm px-4 py-2`}
        type="text"
        required
        autoComplete="off"
        minLength={2}
        maxLength={100}
        name="category_name"
        placeholder="Nueva categoría"
      />
    </div>
  )


};



export const CategoriesPage = () => {
  const { newModal } = useContext(ModalsContext);
  const { createCategory, getAllCategories, categories, isCategoriesLoading } = useContext(CategoriesContext);
  const [isLoading, setIsLoading ] = useState(false);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const categoryNameValue = formData.get('category_name')?.toString();
    if (categoryNameValue!.length <= 0 || categoryNameValue === undefined) return;
    createCategory(categoryNameValue)
  };

  const handleOpenCreateCategory = () => {
    newModal({
      title: 'Crear categoría',
      content: <CreateCategoriesForm />,
      submitFunc: onFormSubmit,
      confirmLabel: 'Agregar categoría'
    })
  };

  const handleExportAsExcel = async () => {
    setIsLoading(true);
    const allCategories = await getAllCategories();
    const categoriesMapped = allCategories.map((category) => {
      return {
        id: category.id,
        nombre: category.name,
        fechaCreacion: formatDate(category.created , 'DD-MM-YYYY HH:mm'),
        fechaModificacion: (category.updated === null)
          ? 'Sin modificación'
          : formatDate(category.updated!, 'DD-MM-YYYY HH:mm')
      }
    });

    await excel.exportAsExcelWithJsonData(categoriesMapped, 'Categorias');
    setIsLoading(false);
  };


  return (
    <div>

      <div>
        <div className="mb-4 flex justify-between items-center">
            <Button className="rounded-md " onClick={handleOpenCreateCategory}>Agregar categoría</Button>

          {/* botón de excel tooltip Exportar a excel */}
          <Tooltip title="Exportar a excel" position={{horizontal: 'left', vertical: 'middle'}}>
            <Button
              isButtonLoading={isLoading}
              onClick={handleExportAsExcel}
              disabled={isCategoriesLoading === false && categories.length === 0 || isLoading}
              className="rounded-md ml-3 px-3 disabled:bg-green-700/50 bg-green-700 hover:bg-excelGreen ">
              <i className="bi bi-download"></i>
            </Button>

          </Tooltip>
        </div>
        <ListCategories />
      </div>
    </div>
  )
}
