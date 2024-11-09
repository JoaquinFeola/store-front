import { useConfigureInterceptors } from "./hooks/store/useConfigureInterceptors";
import { AppRouter } from "./router/AppRouter";


export const App = () => {
  useConfigureInterceptors();
  
  return (
    <AppRouter />
  )
}
