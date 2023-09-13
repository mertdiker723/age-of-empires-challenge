import { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import * as routes from "../../core/routes/ConstantRoute";

// Components
import Navbar from '../Navbar';

const NavLayout = ({ children }: PropsWithChildren) => {
    let location = useLocation();
    const routeItems: string[] = ["/", "/units", "/unitDetails"];

    return (
        <div>
            {routeItems.includes(`/${location.pathname.split("/")[1]}`) && <Navbar />}
            {children}
        </div>
    )
}

export default NavLayout