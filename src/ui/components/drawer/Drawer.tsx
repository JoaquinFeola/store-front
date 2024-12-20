import React, { ReactNode, useState } from "react"
import { drawerService } from "./drawer-data";
import { DrawerLink } from "./DrawerLink";
import { DrawerProfileCircle } from "./DrawerProfileCircle";
import { drawer_title, app_version } from '../../../page.data.json'







interface DrawerProps {
    children: ReactNode;


}


export const Drawer = React.memo(({ children }: DrawerProps) => {
    const { drawerLinks } = drawerService;
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawerOpen = () => {
        setDrawerOpen(!isDrawerOpen);
    }

    return (
        <div className="flex ">
            <header className="w-full h-14 fixed top-0 left-0 bg-blue-500  z-[400] shadow-sm" >
                <nav className="w-full  h-full relative flex justify-between px-3 items-center" >
                    <div className="flex items-center gap-4">
                        <button name="navbarbtn" className=" *:min-w-2 *:w-6 *:transition-all *:duration-100 *:ease-in-out *:max-w-8  *:h-[3px] overflow-hidden *:bg-white *:rounded-lg h-10 w-10 flex flex-col gap-[5px] items-center justify-center" onClick={toggleDrawerOpen}>
                            <div className={`${isDrawerOpen ? '-rotate-45 translate-y-2' : ''} `}></div>
                            <div className={`${isDrawerOpen ? '-translate-x-[150%]' : ''} `}></div>
                            <div className={`${isDrawerOpen ? 'rotate-45 w-7 -translate-y-2' : ''}`}></div>
                        </button>
                        <h4 className="text-white font-medium text-xl">{drawer_title} <span className="text-[12px] mx-1 bg-white text-black rounded-md p-1">{app_version}</span></h4>
                    </div>

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
})
