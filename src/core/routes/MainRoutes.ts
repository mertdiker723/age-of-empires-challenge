import { lazy } from "react";
import * as routes from "./ConstantRoute";

const Home = lazy(() => import('../../screen/Home'));
const Unit = lazy(() => import('../../screen/Unit'));
const UnitDetail = lazy(() => import('../../screen/UnitDetail'));

const MainRoutes = [
    {
        id: 1,
        path: routes.HOME,
        Component: Home,
    },
    {
        id: 2,
        path: routes.UNITS,
        Component: Unit,
    },
    {
        id: 3,
        path: routes.UNIT_DETAILS,
        Component: UnitDetail,
    }
]

export default MainRoutes;