import { useConfigureInterceptors } from "./hooks/useConfigureInterceptors"
import { AppRouter } from "./router/AppRouter"

export const App = () => {
  useConfigureInterceptors();
  
  return (
    <AppRouter />
  )
}
