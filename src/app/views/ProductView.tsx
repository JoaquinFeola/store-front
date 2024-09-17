import { useContext, useEffect, useState } from "react"
import { ProductsContext } from "../../context";
import { Product } from "../../interfaces/product.interfaces";
import { Link, useParams } from "react-router-dom";
import { LoadingInfo } from "../../ui/components/loadings/LoadingInfo";
import { Alert } from "../../ui/components/alerts/Alert";
import { NotFound } from "../../ui/components/NotFound";
import { Tooltip } from "../../ui/components/tooltip/Tooltip";
import { formatCurrency } from "../../utils/currency.util";
import { TextBadge } from "../../ui/components/alerts/TextBadge";




const ProductErrorHandler = ({ errors, statusCode }: { errors: string[], statusCode: number }) => {
    return (
        <div>
            <div className="flex items-center mb-5">
                <Tooltip title="Volver a proveedores" position={{ horizontal: 'right', vertical: 'middle' }}>
                    <Link to="/products" className=" bg-transparent hover:bg-slate-100 transition-colors duration-200 text-gray-800 text-3xl rounded-full"><i className="bi bi-arrow-left"></i></Link>
                </Tooltip>
                <h4 className="flex-grow font-medium text-center text-3xl mb-4 ">{statusCode} Páginano encontrada</h4>
            </div>
            {
                errors.map(err => (
                    <Alert key={err} type="warning" message={err} />
                ))
            }

            <NotFound />

        </div>
    )
}

export const ProductView = () => {
    const { getProductById } = useContext(ProductsContext);
    const [isLoading, setIsLoading] = useState(true);
    const { productId } = useParams();
    const [product, setProduct] = useState({} as Product);
    const [error, setError] = useState<{ errors: string[], statusCode: number }>({
        errors: [],
        statusCode: 200
    });


    useEffect(() => {
        const getProduct = async () => {
            setIsLoading(true)


            const response = await getProductById(productId || 0);

            if (response.hasErrors === true) {
                const errorsRes = response.response as {
                    errors: string[];
                    errCode: number;
                };
                setError({
                    errors: errorsRes.errors,
                    statusCode: errorsRes.errCode
                });
                setIsLoading(false);
                return;
            };

            const prd = response.response as Product;

            setProduct(prd);
            setIsLoading(false);

        };
        getProduct();
    }, []);

    if (error.statusCode === 404) return <ProductErrorHandler errors={error.errors} statusCode={error.statusCode} />
    if (isLoading) return <LoadingInfo />;





    return (
        <div className={`animate__animated animate__fadeIn`}>
            <div className="flex items-center">
                <Tooltip title="Volver a productos" position={{ horizontal: 'right', vertical: 'middle' }}>
                    <Link to="/products" className=" bg-transparent hover:bg-slate-100 transition-colors duration-200 text-gray-800 text-3xl rounded-full"><i className="bi bi-arrow-left"></i></Link>
                </Tooltip>
                <h4 className="font-medium text-4xl flex-grow text-center mb-2">Información del producto</h4>
            </div>
            <hr />
            <div className="grid grid-cols-1 md:grid-cols-2 mt-10   ">
                <div>
                    {
                        product.image
                            ? (
                                <img src={product.image} alt="" />
                            )
                            : <h4 className="font-medium text-xl">Sin imagen</h4>
                    }
                </div>
                <div className="grid grid-cols-1 place-content-start gap-y-4">
                    <h4 className="font-medium text-xl">Proveedor: <span className="font-normal">{product.provider?.name}</span></h4>
                    <h4 className="font-medium text-xl">SKU: <span className="font-normal">{product.sku}</span></h4>
                    <h4 className="font-medium text-xl">
                        Descripción: <span className=" font-normal">{product.description}</span>
                    </h4>
                    <h4 className="font-medium text-xl">Precio de venta: <span className="font-normal">{formatCurrency(product.salePrice, 'ARS')}</span></h4>
                    <h4 className="font-medium text-xl">Precio de compra: <span className="font-normal">{formatCurrency(product.purchasePrice, 'ARS')}</span></h4>
                    <h4 className="font-medium text-xl">Ganancia: <span className="font-normal">{formatCurrency(product.salePrice - product.purchasePrice, 'ARS')}</span></h4>
                    <h4 className="font-medium text-xl">Fecha de caducidad: <span className="font-normal">{product.expirationDate || 'Sin fecha de caducidad'}</span></h4>
                    <div>
                        <h4 className="font-medium text-2xl">Códigos de barras</h4>
                        <div className="flex flex-wrap gap-4 mt-4">
                            {
                                product.barCodes?.map((bc, i) => (
                                    <TextBadge text={bc.code} key={bc.code + i.toString()} />
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <h4 className="font-medium text-2xl">Categorías</h4>
                        <div className="flex flex-wrap gap-4 mt-4">
                            {
                                product.productCategories?.map((pc, i) => (
                                    <TextBadge text={pc.category.name!} key={pc.category.name + i.toString()} />
                                ))
                            }

                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}
