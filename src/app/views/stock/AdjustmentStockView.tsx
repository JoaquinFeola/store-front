import { ListAdjustment } from "@/app/components/stock/ListAdjustment";
import { Button } from "@/ui/components";
import { useNavigate } from "react-router-dom";



export interface CreateAdjustmentStockForm {
	selectedAdjustmentStockType: number | null;
	selectedProductId: number;
	quantity: number;
	motive: string;
}


export const AdjustmentStockView = () => {

	const navigate = useNavigate();
	return (
		<div>
			<div className="flex items-center gap-4 ">
				<Button onClick={() => navigate('create')} className="rounded">
					Ajustar stock
				</Button>
			</div>

			<ListAdjustment />

		</div>
	)
}
