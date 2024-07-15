import { ReactNode, useState } from "react"



type HorizontalPosition = 'left' | 'right' | 'center';
type VerticalPosition = 'top' | 'bottom' | 'middle';
interface TooltipProps {
    title: string;
    children: ReactNode;
    position?: {
        horizontal?: HorizontalPosition,
        vertical?: VerticalPosition
    }
};


const getPositionClasses = (horizontalPositon: HorizontalPosition, verticalPostion: VerticalPosition): string => {

    const getHorizontal = (): string => {
        switch (horizontalPositon) {
            case 'center':
                return 'after:left-[50%] after:-translate-x-[50%]';

            case 'left':
                return 'after:right-[110%]';

            case 'right':
                return 'after:left-[110%]';

            default:
                return 'after:left-[50%] after:-translate-x-[50%]';
        }
    };

    const getVertical = () => {
        switch (verticalPostion) {
            case 'top':
                return 'after:bottom-[110%]';

            case 'bottom':
                return 'after:top-[110%]'

            case 'middle':
                return 'after:top-[50%] after:-translate-y-[50%]'

            default:
                return 'after:bottom-[110%] ';
        }
    }

    return `${getVertical()} ${getHorizontal()}`


}

export const Tooltip = ({ children, title, position }: TooltipProps) => {
    const [tooltipActive, setTooltipActive] = useState(false);


    const onBlurTooltip = () => {
        setTooltipActive(false)
    };
    const onHoverTooltip = () => {
        setTooltipActive(true)
    };

    return (
        <div
            onMouseEnter={onHoverTooltip}
            onMouseLeave={onBlurTooltip}
            className="w-max relative "

        >

            <div data-titletooltip={title} className={`after:z-[100] pointer-events-none   ${getPositionClasses(position?.horizontal!, position?.vertical!)}  ${tooltipActive ? ' after:scale-100 after:delay-100' : 'after:scale-0 after:delay-100'} after:transition-all after:duration-200  after:w-max after:absolute   after:bg-black/70 after:rounded-md after:content-[attr(data-titletooltip)] after:px-2 after:py-1  text-white `}>

            </div>
            {children}

        </div>

    )
}
