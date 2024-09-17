import React, { InputHTMLAttributes } from "react"

interface InputLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
};


export const InputLabel = React.memo(({ labelText, className, ...attr }: InputLabelProps) => {
  return (
    <label htmlFor={attr.name || ''} className={`grid gap-2 mt-3`}>
      <span className={`font-medium text-lg ${attr.required == true ? "after:content-['*'] after:text-red-500 after:ml-1" : ""}`}>{labelText}</span>
      <input
        type={attr.type || 'text'}
        id={attr.name || ''}
        {...attr}
        className={`focus:ring-2 focus:ring-blue-400 focus:outline-none px-3 py-1 rounded-sm border disabled:cursor-not-allowed disabled:bg-slate-200 ${className}`} 
      />
    </label>
  )
})
