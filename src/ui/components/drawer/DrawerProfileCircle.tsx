import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context";
import { ProfileOptions } from "../../../app/components/ProfileOptions";
import { Tooltip } from "../tooltip/Tooltip";



export const DrawerProfileCircle = () => {
    const { auth } = useContext(AuthContext);

  const [isOptionsOpen, setOptionsOpen] = useState(false);
  
  
  const handleToggleOptionsOpen = () => {
    setOptionsOpen(!isOptionsOpen)
  }


  return (
    <div className="relative " >
      <Tooltip title="Opciones de usuario" position={{ horizontal: 'left', vertical: 'middle' }}>
          <div  onClick={handleToggleOptionsOpen} data-usertxt={auth.user?.email?.charAt(0)} className="uppercase  after:content-[attr(data-usertxt)]  after:grid after:place-content-center after:h-full after:font-bold cursor-pointer shadow-md  after:rounded-full bg-slate-300 w-10 rounded-full h-10">
            
          </div>
      </Tooltip>
        {
          (isOptionsOpen) && <ProfileOptions email={auth.user?.email} name={auth.user?.name} />
        }
         
    </div>
  )
}
