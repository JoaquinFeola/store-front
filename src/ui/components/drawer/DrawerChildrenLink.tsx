import { useLocation, useNavigate } from "react-router-dom";
import { IDrawerLink } from "../../../interfaces";


interface DrawerChildrenLinkProps {
    link: IDrawerLink,
    className?: string;
    isDrawerOpen?: boolean;
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}


export const DrawerChildrenLink = ({ link, className, isDrawerOpen, setIsDrawerOpen }: DrawerChildrenLinkProps) => {

    const location = useLocation();
    const isSelected = location.pathname == link.path
    const navigate = useNavigate()

    const navigateToRoute = () => {
        if (link.children && link.children.length > 0) { };
        setIsDrawerOpen(true)
        navigate(link.path)
    }

    return (
        <li
            onClick={navigateToRoute}
            className={`min-h-12 ${isSelected ? ' hover:bg-blue-900 bg-blue-700' : ''} text-white ${className}    py-2 px-5 hover:bg-blue-600  transition-all duration-150 cursor-pointer`}
        >
            <div className="flex    ">
                <div className="mr-4 ">
                    <i className={`${link.icon} text-xl   `}></i>
                </div>
                <div className="flex items-center flex-grow">
                    <span
                        className="  flex-grow text-left transition-opacity duration-200 break-words"
                        style={{ opacity: (isDrawerOpen) ? 1 : 0 }}
                    >
                        {link.title}
                    </span>
                </div>
            </div>
            <ul className="">
                {
                    (link.children && link.children.length >= 1)
                    && link.children.map(link => (
                        <DrawerChildrenLink
                            setIsDrawerOpen={setIsDrawerOpen}
                            key={link.id}
                            link={link}
                            className="hover:bg-blue-900"
                            isDrawerOpen={isDrawerOpen}
                        />
                    ))
                }
            </ul>

        </li>
    )
}
