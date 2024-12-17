import { Route, Routes, useNavigate } from "react-router-dom"
import { privateRoutes, publicRoutes } from "./routesList"
import { FC, useEffect } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

interface RouteProps {
  title: string;
  path: string;
  element: JSX.Element;
}

const AppRouter: FC = () => {
  let isAuth =  useSelector((state: RootState) => state.user.isAuth);;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/registration");
    }
  }, [isAuth]);

  const renderRoutes = (routes: RouteProps[]) =>
    routes.map((route) => (
      <Route key={route.title}
        path={route.path}
        element={route.element}
    />
    ));

  return (
    <Routes>
      {isAuth && renderRoutes(privateRoutes)}
      {renderRoutes(publicRoutes)}
    </Routes>
  )
}

export default AppRouter