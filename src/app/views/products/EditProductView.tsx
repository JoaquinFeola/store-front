import { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { ProductsContext, CategoriesContext, SuppliersContext } from "../../../context";
import { useForm } from "../../../hooks/store/useForm";
import { Product } from "../../../interfaces/product.interfaces";
import { Button } from "../../../ui/components";
import { Alert } from "../../../ui/components/alerts/Alert";
import { Checkbox } from "../../../ui/components/inputs/Checkbox";
import { InputLabel } from "../../../ui/components/inputs/InputLabel";
import { SelectWithFilter } from "../../../ui/components/inputs/SelectWithFilter";
import { LoadingInfo } from "../../../ui/components/loadings/LoadingInfo";
import { formatCurrency } from "../../../utils/currency.util";
import { BarcodesList } from "../../components/BarcodesList";
import { ImageInput } from "../../components/ImageInput";
import { Tooltip } from "../../../ui/components/tooltip/Tooltip";


export const EditProductView = () => {
  const [formErrors, setFormErrors] = useState<string[]>([]);


  const { getProductById, updateProduct } = useContext(ProductsContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>({} as Product);
  const [isLoading, setIsLoading] = useState(false);


  

  useEffect(() => {
    const getProductOnLoad = async () => {
      setIsLoading(true)
        const productFound = await getProductById(productId!);
        
        if ( productFound.hasErrors === true ) return;
        setProduct(productFound.response as Product);
        setIsLoading(false)
    }

    getProductOnLoad();
  }, []);

  const { getAllCategories } = useContext(CategoriesContext);
  const { getAllSuppliers } = useContext(SuppliersContext);
  const [categories, setCategories] = useState<{ title: string; img?: string, id: number }[]>([]);
  const [suppliers, setSupliers] = useState<{ title: string; img?: string, id: number }[]>([]);
  const [hasExpirationDate, setHasExpirationDate] = useState(false);
  const { formState, onInputWrite, assignAllNewValues, onInputLoadFile, } = useForm({
    sku: '',
    description: '',
    productCategories: [] as number[],
    supplierId: 0,
    barCodes: [] as string[],
    purchasePrice: '0',
    percentageProfit: '0',
    salePrice: 0,
    image: '',
    inputCodeBar: '',
    expirationDate: '',
  })


  const addProductCategory = (id: number) => {

    if (formState.productCategories.indexOf(id) === -1 && formState.productCategories.length <= 4) {
      assignAllNewValues({
        productCategories: [...formState.productCategories, id]
      })
    } else {
      assignAllNewValues({
        productCategories: formState.productCategories.filter((el) => el !== id)
      })
    }

  }
  const addProductCodeBars = () => {
    if (formState.inputCodeBar === '') return;
    assignAllNewValues({
      barCodes: [...formState.barCodes, formState.inputCodeBar],
      inputCodeBar: ''
    });
  }
  const addProductSupplier = (id: number) => {

    if (formState.supplierId === id) {
      assignAllNewValues({
        supplierId: 0
      })
      return;
    }

    if (formState.supplierId !== id && formState.supplierId === 0) {
      assignAllNewValues({
        supplierId: id
      })
    } else {
      assignAllNewValues({
        supplierId: id
      })
    }

  };

  useEffect(() => {
    const mapCategories = async () => {
      const categoriesGetted = await getAllCategories();
      setCategories(
        categoriesGetted.map(category => ({
          id: category.id!,
          title: category.name!,
          img: '',
        }))

      );
    }
    const mapSuppliers = async () => {
      const suppliersGetted = await getAllSuppliers();
      setSupliers(
        suppliersGetted.map(supplier => ({
          id: supplier.id!,
          title: supplier.name!,
          img: supplier.image || '',
        }))

      );
    }
    mapSuppliers();
    mapCategories();
  }, []);

  useEffect(() => {
    const createSalePrice = () => {
      const purchasePrice: number = parseFloat(formState.purchasePrice);
      const percentageProfit: number = parseFloat(formState.percentageProfit);
      assignAllNewValues({
        salePrice: purchasePrice + ((percentageProfit * purchasePrice) / 100) || 0
      })
    }
    createSalePrice()
  }, [formState.purchasePrice, formState.percentageProfit])


  const handleDeleteProductCodeBar = (codebar: string) => {
    const codeBarToDelete = formState.barCodes.indexOf(codebar);

    if ( codeBarToDelete === -1 ) return;
    assignAllNewValues({
        barCodes: formState.barCodes.toSpliced(codeBarToDelete, 1),
    });
} 



  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true)
    const productResponse = await updateProduct({
      sku: formState.sku,
      description: formState.description,
      percentageProfit: parseFloat(formState.percentageProfit),
      purchasePrice: parseFloat(formState.purchasePrice),
      image: formState.image === '' || formState.image === null ? null : formState.image.split(',')[1],
      barCodes: formState.barCodes.length === 0 ? [] : formState.barCodes,
      expirationDate: formState.expirationDate === '' ? null : formState.expirationDate,
      categoriesIds: formState.productCategories,
      supplierId: formState.supplierId
    }, parseInt(productId!))
    
    if (productResponse !== null) {
      setFormErrors(productResponse.response?.data.errors || []);
      scrollTo({ top: 0 })
    }

    setIsSubmitting(false)


  }
 

  useEffect(() => {
    const productsCategories = product.productCategories?.map((pc) => { return pc.category.id }) as number[]
    const barcodes = product.barCodes?.map((bc) => { return bc.code }) as string[];

    assignAllNewValues({
      sku: product.sku,
      description: product.description,
      productCategories: productsCategories,
      supplierId: product.supplierId,
      barCodes: barcodes,
      purchasePrice: (product.purchasePrice !== undefined) ? product.purchasePrice.toString() : '0',
      percentageProfit: (product.percentageProfit !== undefined) ? product.percentageProfit.toString() : '0',
      salePrice: product.salePrice,
      image: product.image,
      inputCodeBar: '',
      expirationDate: (product.expirationDate === null) ? '' : product.expirationDate,
    })
    setHasExpirationDate(Boolean(product.expirationDate))

  }, [product])

  if (isLoading) return (<LoadingInfo />)
  return (
    <div className="pb-10">
      <div className="flex items-center mb-10">
        <Tooltip title="Volver a productos" position={{ horizontal: 'right', vertical: 'middle' }}>
          <Link to="/products" className=" bg-transparent hover:bg-slate-100 transition-colors duration-200 text-gray-800 text-3xl rounded-full"><i className="bi bi-arrow-left"></i></Link>
        </Tooltip>
        <h4 className="flex-grow text-center font-medium text-3xl">Editar producto</h4>
      </div>
      {
        formErrors.length > 0
        && formErrors.map((formError) => (
          <Alert message={formError} type="warning" />
        ))
      }
      <form onSubmit={handleSubmit} action="" className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 items-start ">
        <div className="grid grid-cols-1 items-start ">
          <InputLabel
            name="sku"
            required
            labelText="SKU"
            value={formState.sku ?? ''}
            onChange={(e) => onInputWrite(e, 50)}
            placeholder="SKU"

          />

          <InputLabel
            labelText="Precio de compra"
            value={formState.purchasePrice ?? ''}
            name="purchasePrice"
            onChange={onInputWrite}
            type="number"
            required
          />
          <InputLabel
            labelText="Porcentaje de ganancia (%)"
            value={formState.percentageProfit ?? ''}
            name="percentageProfit"
            onChange={onInputWrite}
            type="number"
            required
          />
          <InputLabel
            disabled
            labelText="Precio de venta"
            value={formState.salePrice === 0 ? formState.purchasePrice : formatCurrency(formState.salePrice, 'ARS')}
            name="salePrice"
            type="text"
            required
          />
          <div className="grid grid-cols-1 mt-2">

            <div className="flex gap-4 mt-3">
              <Checkbox
                onChange={() => setHasExpirationDate(!hasExpirationDate)}
                checked={hasExpirationDate ?? false}

              />
              <h4>¿Tiene vencimiento?</h4>
            </div>
            {
              (hasExpirationDate)
              &&
              <InputLabel
                value={formState.expirationDate ?? ''}
                name="expirationDate"
                onChange={onInputWrite}
                labelText="Fecha de expiración"
                type="date"
              />
            }
          </div>

          <div>
            <div className="flex gap-2 items-end codigoIput">
              <InputLabel
                labelText="Codigo de barras"
                name="inputCodeBar"
                placeholder="Código de barras"
                value={formState.inputCodeBar}
                onChange={(e) => onInputWrite(e, 20)}
                />
              <Button type="button" className="rounded-md py-[5px] " onClick={addProductCodeBars}>Agregar</Button>
            </div>
            <BarcodesList
              barcodes={formState.barCodes ?? []}
              deleteFunc={handleDeleteProductCodeBar}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 items-start">

          <InputLabel
            name="description"
            placeholder="Descripción"
            labelText="Descripción"
            value={formState.description ?? ''}
            onChange={onInputWrite}
            required
          />

          <div>
            <div className="col-span-4">
              <h3 className="font-medium text-lg mt-2 mb-2">Categorías del producto</h3>
              <SelectWithFilter
                items={categories}
                selectionArr={formState.productCategories ?? []}
                select={addProductCategory}

              />
            </div>
            <div>
              <h3 className="font-medium text-lg mt-2 mb-2 ">Proveedores del producto</h3>
              <SelectWithFilter
                items={suppliers}
                selectionArr={(formState.supplierId === 0) ? [] : [formState.supplierId]}
                select={addProductSupplier}

              />
            </div>
          </div>

          <div className="self-end mt-3 justify-self-center">
            <ImageInput
              inputName="image"
              onLoadFile={onInputLoadFile}
              src={formState.image ?? ''}
            />
          </div>


        </div>

        <Button isButtonLoading={isSubmitting} className="self-end rounded-md" type="submit">Editar producto</Button>
      </form>


    </div>
  )
}
