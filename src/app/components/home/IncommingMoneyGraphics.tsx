import { YearSalesGraphic } from "./YearSalesGraphic"

export const IncommingMoneyGraphics = () => {
    return (
        <div className="mt-4 ">
            <h4 className="text-center font-medium text-4xl mb-5">Ganancias en el año</h4>
            <div className="min-h-[500px]  ">
                <YearSalesGraphic />
            </div>

        </div>
    )
}
