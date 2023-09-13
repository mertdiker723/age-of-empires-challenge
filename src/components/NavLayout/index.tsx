import { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import * as routes from "../../core/routes/ConstantRoute";

// Components
import Navbar from '../Navbar';

const NavLayout = ({ children }: PropsWithChildren) => {
    let location = useLocation();
    const routeItems: string[] = [routes.HOME, routes.UNITS, routes.UNIT_DETAILS];

    return (
        <div>
            {routeItems.includes(location.pathname) && <Navbar />}
            {children}
        </div>
    )
}

export default NavLayout