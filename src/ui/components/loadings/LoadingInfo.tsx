
export const LoadingInfo = () => {
  return (
    <div className="w-full h-full pointer-events-none select-none grid place-content-center ">
      <div className="animate-spin  mx-auto w-12 h-12 rounded-full border-b-transparent border-[6px] border-gray-800">
        
      </div>
      <h3 className="tex-center  font-medium text-xl">
        Cargando...
      </h3>

    </div>
  )
}
