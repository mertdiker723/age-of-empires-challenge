import { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import Navbar from '../Navbar';

const NavLayout = ({ children }: PropsWithChildren) => {
    let location = useLocation();
    const routeItems: string[] = ["/", "/units", "/unitDetails"];

    return (
        <>
            {routeItems.includes(`/${location.pathname.split("/")[1]}`) && <Navbar />}
            {children}
        </>
    )
}

export default NavLayout