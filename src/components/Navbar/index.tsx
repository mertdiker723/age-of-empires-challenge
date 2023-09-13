import { Link } from "react-router-dom";
import * as routes from "../../core/routes/ConstantRoute";
const Navbar = () => {
    return (
        <div>
            <Link to={routes.HOME}>Home</Link>
            <Link to={routes.UNITS}>Units</Link>
        </div>
    )
}

export default Navbar