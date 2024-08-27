import { ReactNode, useState } from "react"
import { drawerService } from "./drawer-data";
import { DrawerLink } from "./DrawerLink";
import { DrawerProfileCircle } from "./DrawerProfileCircle";
import { Tooltip } from "../tooltip/Tooltip";








interface DrawerProps {
    children: ReactNode;


}


export const Drawer = ({ children }: DrawerProps) => {
    const { drawerLinks } = drawerService;
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawerOpen = () => {
        setDrawerOpen(!isDrawerOpen);
    }

    return (
        <div className="flex ">
            <header className="w-full h-14 fixed top-0 left-0 bg-blue-500  z-[400] shadow-sm" >
                <nav className="w-full  h-full relative flex justify-between px-3 items-center" >
                    <button name="navbarbtn" className=" *:min-w-2 *:w-6 *:transition-all *:duration-100 *:ease-in-out *:max-w-8  *:h-[3px] overflow-hidden *:bg-white *:rounded-lg h-10 w-10 flex flex-col gap-[5px] items-center justify-center" onClick={toggleDrawerOpen}>
                        <div className={`${isDrawerOpen ? '-rotate-45 translate-y-2' : ''} `}></div>
                        <div className={`${isDrawerOpen ? '-translate-x-[150%]' : ''} `}></div>
                        <div className={`${isDrawerOpen ? 'rotate-45 w-7 -translate-y-2' : ''}`}></div>
                    </button>
                    <DrawerProfileCircle />
                </nav>
            </header>
            <div
                style={{
                    width: isDrawerOpen ? 240 : ''
                }}
                className="w-16 h-dvh sticky flex-shrink-0 left-0 top-0 transition-all overflow-auto "
            >
                <aside className="w-full h-full flex flex-col bg-blue-600 pt-16 pb-2 gap-4 " >
                    <ul className="*:list-none bg-blue-800   ">
                        {
                            drawerLinks.map((link) => (
                                    <DrawerLink
                                        isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setDrawerOpen} key={link.id} link={link} />
                            ))
                        }
                    </ul>
                </aside>
            </div>
            <div className="pt-20 pb-2 px-8 block overflow-auto flex-grow "  >
                <main className="block " >
                    {children}
                </main>
            </div>
        </div>
    )
}
