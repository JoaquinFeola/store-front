import { useContext } from "react";
import { AuthContext, ModalsContext } from "../../context";



interface ProfileOptionsProps {
  name?: string;
  email?: string;
}

export const ProfileOptions = ({ email, name }: ProfileOptionsProps) => {

  const { newModal } = useContext(ModalsContext)
  const { logout } = useContext(AuthContext);

  const handleOpenLogoutModal = () => {
    
    newModal({
      submitFunc: logout,
      confirmLabel: '¡Sí, estoy seguro!',
      content: '¿Está seguro que desea cerrar sesión? 🤔',
      title: 'Usted está por cerrar sesión'
    })
  }
  return (
    <div className="absolute w-max right-0  top-[180%] before:content-[''] scale-up-before  before:absolute before:w-6 before:h-6 before:bg-[#2747a4] before:-top-7 before:right-3 before:rounded-full">
      <div className="w-full  px-4 bg-[#2747a4] opacity-0 rounded-md min-h-24 py-2 shadow-md scale-up">
        <div className="text-white">
          <h4 className="text-xl text-center tracking-wide">¡Hola <span className="font-bold ">{name}!</span></h4>
          <div className="flex  gap-3 items-center">
            <div data-usertxt={email?.charAt(0)} className="uppercase flex-shrink-0  after:content-[attr(data-usertxt)] after:text-black  after:grid after:place-content-center after:h-full after:font-bold cursor-pointer shadow-md  after:rounded-full bg-slate-300 w-10 rounded-full h-10"></div>
            <h4 className="break-words">{email}</h4>
          </div>
          <ul className="mt-4 *:px-3 *:py-2 flex flex-col gap-2 *:transition-colors *:duration-200">
            <li className="bg-blue-900 flex gap-4 items-center justify-center hover:bg-[#0c297c] rounded-sm cursor-pointer">
              Configuración
              <i className="bi bi-gear-fill text-xl"></i>
            </li>
            <li onClick={handleOpenLogoutModal} className="bg-blue-900 hover:bg-[#0c297c] rounded-sm cursor-pointer flex  gap-4 items-center justify-center">
              Cerrar sesión
              <i className="bi bi-box-arrow-right text-xl"></i>
            </li>
          </ul>
        </div>
      </div>

    </div>
  )
}
