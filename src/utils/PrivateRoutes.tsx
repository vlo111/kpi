import { Outlet, Navigate, useOutlet } from 'react-router-dom'
import { PATHS } from '../helpers/constants';

const PrivateRoutes = () => {
    const token = localStorage.getItem('token');

    return (
        token ? <Outlet /> : <Navigate to={`/${PATHS.SIGNIN}`} />
    )
}

export default PrivateRoutes