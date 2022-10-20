import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { PATHS } from '../helpers/constants';

export const PublicRoutes = () => {
  const { user } = useAuth();

  // if (user) {
  //   return <Navigate to={`/${PATHS.ROOT}`} />
  // }

  return (
    <div>
      <Outlet />
    </div>
  )
};