import { InputHTMLAttributes } from "react"


interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {

}

export const Checkbox = ({className, ...props }: CheckboxProps) => {
    return (
        <input
            className={`${className} w-6 h-6 shadow-msm relative hover:cursor-pointer after:absolute after:rounded-md border-gray-500 checked:after:bg-blue-500 after:w-full after:text-center checked:border-0 transition-all duration-150 after:transition-all after:duration-200 after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:content-['✓'] after:content-[''] after:text-white rounded-md border-2 appearance-none`}
            {...props}
            type="checkbox"
        />
    )
}
