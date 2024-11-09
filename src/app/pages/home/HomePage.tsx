import { IncommingMoneyGraphics } from "@/app/components/home/IncommingMoneyGraphics"
import { SalesGraphics } from "@/app/components/home/SalesGraphics"



export const HomePage = () => {





  return (
    <div className=" flex justify-center">
      <div className="max-w-[1200px] w-full">
        <SalesGraphics />
        <IncommingMoneyGraphics />      
      </div>

    </div>
  )
}
