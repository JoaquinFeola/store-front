
import { IncommingMoneyGraphics } from "../components/home/IncommingMoneyGraphics";
import { SalesGraphics } from "../components/home/SalesGraphics";



const HomePage = () => {





  return (
    <div className=" flex justify-center">
      <div className="max-w-[1200px] w-full">
        <SalesGraphics />
        <IncommingMoneyGraphics />      
      </div>

    </div>
  )
}

export default HomePage