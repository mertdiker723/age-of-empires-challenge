import { Link, useLocation } from "react-router-dom";

// Material UI
import { Grid } from "@mui/material";

// Core
import * as routes from "../../core/routes/ConstantRoute";

// Assets
import "./Style.scss";

const Navbar = () => {
    let location = useLocation();
    const routeLabel = routes.routeObject.find(item => item.name === `/${location.pathname.split("/")[1]}`);

    return (
        <Grid container spacing={2} mt={2}>
            <Grid item xs={4} />
            <Grid item xs={4} sx={{ '&.MuiGrid-item ': { p: 0 } }}><div className="header-navbar">{routeLabel?.label}</div></Grid>
            <Grid item xs={4} sx={{ '&.MuiGrid-item ': { p: 0 } }} className="routing-container">
                <div className="navbar">
                    <Link className="navbar_sub-item" to={routes.HOME}>Home</Link>
                    <Link className="navbar_sub-item" to={routes.UNITS}>Units</Link>
                </div>
            </Grid>
        </Grid>
    );
};

export default Navbar;