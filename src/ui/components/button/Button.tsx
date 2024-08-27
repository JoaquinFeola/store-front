import React, { ButtonHTMLAttributes } from "react"


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isButtonLoading?: boolean;
}

export const Button = React.forwardRef(({ className, isButtonLoading, ...btnAttributtes }: ButtonProps, ref) => {

  return (
    <button
      {...ref && ref}
      {
      ...isButtonLoading ? { disabled: true } : { disabled: false }
      }
      className={`${className ? `${className}  text-white  min-w-max relative active:outline-none focus:outline-none overflow-hidden px-2  py-2 bg-blue-500 hover:bg-blue-600 transition-all duration-150  ` : 'active:outline-none focus:outline-none px-2 py-2 bg-blue-500 hover:bg-blue-600 transition-all duration-150 text-white  '}  `} {...btnAttributtes}
    >

      <>
        {btnAttributtes.children}
        {
          (isButtonLoading)
          && <div className="flex items-center justify-center absolute w-full h-full bg-black/50 z-10 top-0 left-0">
            <div className="w-6 h-6 border-[3px] animate-spin border-white border-b-transparent rounded-full"></div>
          </div>

        }
      </>
    </button>

  )
})