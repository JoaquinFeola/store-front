import { ProductsContext } from "@/context";
import { AdjustmentStockContext } from "@/context/AdjustmentStockContext";
import { useForm } from "@/hooks/useForm";
import { Product } from "@/interfaces/product.interfaces";
import { LoadingInfo, SelectWithFilter, Select, InputLabel, Button } from "@/ui/components";
import { Alert } from "@/ui/components/alerts/Alert";
import { Tooltip } from "@/ui/components";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";



export const CreateAdjustmentStockView = () => {

	const { getAllProducts } = useContext(ProductsContext);
	const { createAdjustmentStock } = useContext(AdjustmentStockContext);
	const [errors, setErrors] = useState<string[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { formState, onInputWrite, assignAllNewValues, } = useForm({
		selectedProductId: 0,
		selectedAdjustmentStockTypeId: 0,
		quantity: 0,
		motive: ''
	});

	const onCreateAdjustmentStock = async () => {
		if (
			formState.motive === '' ||
			formState.quantity === 0 ||
			formState.selectedAdjustmentStockTypeId == 0 ||
			formState.selectedProductId == 0
		) return;
		setIsSubmitting(true);
		const resp = await createAdjustmentStock({
			motive: formState.motive,
			stockAdjustmentTypeId: formState.selectedAdjustmentStockTypeId,
			productId: formState.selectedProductId,
			quantity: formState.quantity
		});
		if (resp !== null) {
			setErrors(resp.response?.data.errors || ['Ocurrió un error inesperado']);
		}
		setIsSubmitting(false);

	}

	
	const selectProduct = (id: number) => {
		if (formState.selectedProductId === id) {
			assignAllNewValues({ selectedProductId: 0 });
			return;
		}
		assignAllNewValues({ selectedProductId: id })
	}
	useEffect(() => {
		const getProducts = async () => {
			setIsLoading(true)
			const response = await getAllProducts()
			setProducts(response)
			setIsLoading(false)

		}
		getProducts()
	}, [])


	if (isLoading) return <LoadingInfo />

	return (
		<div className="grid grid-cols-1 gap-2 max-w-[1180px] mx-auto">

			<div className="flex items-center mb-10">
				<Tooltip title="Volver al listado" position={{ horizontal: 'right', vertical: 'middle' }}>
					<Link to="/stock/adjustment" className=" bg-transparent hover:bg-slate-100 transition-colors duration-200 text-gray-800 text-3xl rounded-full"><i className="bi bi-arrow-left"></i></Link>
				</Tooltip>
				<h4 className="flex-grow text-center font-medium text-3xl">Crear ajuste de stock</h4>
			</div>

			<div>
				{
					(errors.length > 0)
						&& errors.map((err) => (
							<Alert
								key={err}
								message={err}
								type="error"
								deleteFunction={() => setErrors(errors.filter(err => err !== err))}
							/>
						))
				}

			</div>

			<div>
				<h3 className="font-medium text-slate-800 mb-2">Selecciona un producto</h3>

				<SelectWithFilter
					items={
						products.map((product) => ({
							id: product.id,
							title: product.sku
						}))
					}
					selectionArr={(formState.selectedProductId != 0 ? [formState.selectedProductId] : [])}
					select={selectProduct}
				/>
			</div>
			<div>
				<h3 className="font-medium text-slate-800 mb-2">Cantidad de ajuste</h3>

				<Select
					defaultSelected={{
						title: 'Selecciona un tipo de ajuste',
						value: '0'
					}}
					items={[

						{
							title: 'Positivo',
							value: '1'
						},
						{
							title: 'Negativo',
							value: '2'
						}
					]}
					onChange={(e) => {
						assignAllNewValues({ selectedAdjustmentStockTypeId: parseInt(e) })
					}}
				/>
			</div>
			<div>
				<h3 className="font-medium text-slate-800">Cantidad de ajuste</h3>
				<InputLabel
					value={formState.quantity}
					onChange={onInputWrite}
					type="number"
					name="quantity"
					min={0}
					step={0}
					placeholder="Cantidad"
				/>
			</div>
			<div>
				<h3 className="font-medium text-slate-800 mb-2">Motivo</h3>

				<textarea
					rows={5}
					name="motive"
					value={formState.motive}
					onChange={onInputWrite}
					className="focus:outline-none ring-1 focus:ring-2 p-4 resize-none shadow-md rounded w-full"

				/>
			</div>
			<Button

				disabled={isSubmitting}
				isButtonLoading={isSubmitting}
				onClick={onCreateAdjustmentStock}
				className="rounded relative"
			>
				Ajustar
			</Button>
		</div>
	)
}
