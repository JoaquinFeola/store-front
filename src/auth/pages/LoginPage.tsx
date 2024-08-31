import { FormEvent, useContext, useState } from "react"
import { AuthContext } from "../../context";
import { FormValidation, useForm } from "../../hooks/useForm";
import { emailValidationFormat } from "../../validators/input.validators";


const loginFormInitialState = {
  email: '',
  password: '',
};

const loginFormValidations: FormValidation<typeof loginFormInitialState> = {
  email: [
    (value) => !emailValidationFormat(value),
    'El correo no tiene un formato válido'
  ],
  password: [
    (value) => value.length <= 0,
    'La contraseña no puede ser vacia'
  ]
}


export const LoginPage = () => {

  const [showPassword, setCanShowPassword] = useState(false);
  const { formState, onInputWrite,
    isEmailValid, isPasswordValid } = useForm(loginFormInitialState, loginFormValidations);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { login } = useContext(AuthContext);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState.email.length === 0 || formState.password.length === 0) return;
    setIsSubmitted(true)
    if ( isEmailValid !== null || isPasswordValid !== null ) return;
    login({ email: formState.email, password: formState.password });



  }

  return (
    <div className=" from-sky-700 to-blue-950 bg-gradient-to-br h-dvh p-4 grid place-items-center">
      <div className=" grid grid-rows px-6 py-6 bg-slate-100 w-full h-3/4 max-h-[600px] rounded-md min-h-[500px]  md:w-3/4 min-w-72  max-w-[400px] transition-all shadow-md shadow-gray-700">
        <div className="relative">
          <h3 className="font-medium text-3xl text-center ">Inicar sesión</h3>
        </div>
        <div className="row-span-9   place-content-center">
          <form onSubmit={onFormSubmit} autoComplete="off">
            <fieldset className="grid gap-8">
              <div
                data-errortext={(isEmailValid !== null && isSubmitted === true) ? isEmailValid : ''}
                className="*:w-full bi bi-envelope after:content-[attr(data-errortext)] after:text-red-700  after:absolute  after:top-full after:left-10 before:text-gray-700 before:border-r-[1px] before:border-gray-400 before:absolute before:left-0 before:text-2xl before:top-1/2 before:-translate-y-1/2 before:h-full before:grid before:place-content-center before:px-2   relative"
              >
                <input
                  required
                  name="email"
                  value={formState.email}
                  onChange={onInputWrite}
                  className={`${(isEmailValid !== null && isSubmitted) ? 'ring-red-600 ring-2' : ''} focus:ring-2 bg-slate-200 pl-12 focus:outline-none rounded-sm px-4 py-2 border-2`}
                  type="text"
                  placeholder="Correo electrónico"
                />

              </div>
              <div 
                className={` rounded-sm grid grid-cols-10  bi bi-shield-lock before:text-gray-700 before:border-r-[1px] before:border-gray-400 before:absolute before:left-0 before:text-2xl before:top-1/2 before:-translate-y-1/2 before:h-full before:grid before:place-content-center before:px-2   relative`}>
                <input
                  required
                  value={formState.password}
                  onChange={onInputWrite}
                  name="password"
                  className={`${(isPasswordValid !== null && isSubmitted) ? 'ring-red-600 ring-2 ' : ''} focus:ring-2  bg-slate-200 pl-12 col-span-9  focus:outline-none rounded-sm px-4 py-2 border-2`}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña"
                />
                <button
                  type="button"
                  onClick={() => setCanShowPassword(!showPassword)}
                  className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}  bg-slate-200 border-l-[1px] border-gray-600 before:text-xl before:text-gray-700 `}></button>
              </div>
            </fieldset>
            <button className="bg-blue-600 w-full  mt-12 text-white font-medium text-lg hover:bg-blue-700 transition-all duration-150 shadow-md hover:shadow-lg px-4 py-2 rounded-md">
              Iniciar sesión
            </button>


          </form>
        </div>
      </div>
    </div>
  )
}
