import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { DrawerChildrenLink } from "./DrawerChildrenLink";
import { IDrawerLink } from "../../../interfaces";
import { Button } from "../";
import { Tooltip } from "../tooltip/Tooltip";



interface DrawerLinkProps {
    link: IDrawerLink,
    className?: string;
    isDrawerOpen?: boolean;
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const DrawerLink = React.memo(({ link, className, isDrawerOpen, setIsDrawerOpen }: DrawerLinkProps) => {
    const location = useLocation();
    const isSelected = location.pathname == link.path;

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate()

    const navigateToRoute = () => {
        if (link.children && link.children.length > 0) {
            setDropdownOpen(!isDropdownOpen);
            setIsDrawerOpen(true);
            return;
        };

        navigate(link.path)
    }

    useEffect(() => {
        if (isDrawerOpen === false) setDropdownOpen(false);

    }, [isDrawerOpen]);


    return (
        <li

            className={`
                    ${isDrawerOpen ? 'w-full' : 'w-[64px] overflow-hidden'}
                text-white ${className}    
                `}
        >
            <div onClick={navigateToRoute} className={`flex py-2 px-5  max-h-12 hover:bg-[#353f96] transition-all 
                duration-150 
                cursor-pointer 
                ${isSelected
                    ? 'bg-blue-900 hover:bg-blue-950'
                    : (isDropdownOpen)
                        ? 'bg-blue-900 hover:bg-blue-950'
                        : ''} 
                `}
            >
                <div className="mr-4 ">
                    <i className={`${link.icon} text-2xl   `}></i>
                </div>
                <div className="flex items-center flex-grow">
                    <span
                        className="text-nowrap flex-grow text-justify transition-opacity duration-200 break-words"
                        style={{ opacity: (isDrawerOpen) ? 1 : 0 }}
                    >
                        {link.title}
                    </span>
                </div>
                <div className="flex items-center">
                    {
                        (link.children)
                        && (
                            <Button className=" bg-transparent hover:bg-transparent">
                                <div className={`w-full  ${isDropdownOpen ? 'rotate-180' : 'rotate-0'} transition-all duration-200`}>
                                    <i className={`bi bi-caret-up-fill`}></i>
                                </div>
                            </Button>
                        )
                    }
                </div>
            </div>
            <div className={`overflow-hidden ${isDropdownOpen ? 'h-max my-2 px-2' : 'h-0 my-0'}   transition-all duration-150`}>
                <ul className={`  divide-y divide-blue-950 `}>
                    {
                        (link.children && link.children.length >= 1)
                        && link.children.map(link => (
                            <DrawerChildrenLink
                                key={link.id}
                                link={link}
                                className=""
                                setIsDrawerOpen={setIsDrawerOpen}
                                isDrawerOpen={isDrawerOpen}
                            />
                        ))
                    }
                </ul>
            </div>
        </li>
    )
})
