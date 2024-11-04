import { TwoDaySalesGraphic } from "./TwoDaySalesGraphic"

export const SalesGraphics = () => {

  return (
    <div className="flex flex-col items-center ">
        <h4 className="font-medium text-4xl mb-5">Ventas</h4>
        
        <TwoDaySalesGraphic />
      </div>
  )
}
