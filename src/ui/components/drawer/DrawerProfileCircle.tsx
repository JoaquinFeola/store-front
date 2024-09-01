import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../../context";
import { ProfileOptions } from "../../../app/components/ProfileOptions";
import { Tooltip } from "../tooltip/Tooltip";



export const DrawerProfileCircle = () => {
  const { auth } = useContext(AuthContext);

  const [isOptionsOpen, setOptionsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleToggleOptionsOpen = () => {
    setOptionsOpen(prevState => !prevState);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOptionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="relative " >
      <Tooltip title="Opciones de usuario" position={{ horizontal: 'left', vertical: 'middle' }}>
        <div ref={buttonRef} onClick={(e) => { e.stopPropagation(); handleToggleOptionsOpen() }} data-usertxt={auth.user?.email?.charAt(0)} className="uppercase  after:content-[attr(data-usertxt)]  after:grid after:place-content-center after:h-full after:font-bold cursor-pointer shadow-md  after:rounded-full bg-slate-300 w-10 rounded-full h-10">

        </div>
      </Tooltip>
      {
        (isOptionsOpen) && <ProfileOptions ref={selectRef} email={auth.user?.email} name={auth.user?.name} />
      }

    </div>
  )
}
