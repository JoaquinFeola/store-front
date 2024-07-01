import { ButtonHTMLAttributes } from "react"


interface ButtonProps extends  ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ className, ...btnAttributtes }: ButtonProps) => {
  return (
    <button className={`${className ? `${className} text-white   active:outline-none focus:outline-none px-2 py-2 bg-blue-500 hover:bg-blue-600 transition-all duration-150  ` : 'active:outline-none focus:outline-none px-2 py-2 bg-blue-500 hover:bg-blue-600 transition-all duration-150 text-white  '}  `} {...btnAttributtes} />

  )
}
