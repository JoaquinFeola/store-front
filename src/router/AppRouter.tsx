import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { AppRoutes } from "../app/routes/AppRoutes"
import { PrivateRoutes } from "./PrivateRoutes"
import { PublicRoutes } from "./PublicRoutes"

export const AppRouter = () => {

  return (
    <>

      <Routes>
        <Route
  
          path="/auth/*"
          element={
            <PublicRoutes>
              <AuthRoutes />
            </PublicRoutes>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoutes>
              <AppRoutes />
            </PrivateRoutes>
          }
        />
      </Routes>
    </>
  )
}
