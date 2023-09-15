import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

// Material UI
import { Box } from '@mui/material';

// Screen
import { useStateString } from "../../../screen/Unit/unitContext";

// Common
import FacebookCircularProgress from "../../../common/Loader/facebookCircularProgress";

// Core
import { Types } from '../../../core/redux/action/actionTypes';
import { loadUnits } from '../../../core/redux/action/unitAction';
import { RootState } from '../../../core/redux/reducer';
import { Cost } from "../../../core/types";

// Assets & Styles
import "./Style.scss";

const UnitTable = () => {
    const counter = useSelector((state: RootState) => state.unitReducer)
    const dispatch: (action: any) => Promise<void> = useDispatch()

    const { age, checkbox, costs } = useStateString();
    const { food, wood, gold } = checkbox;

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadUnits(Types.UNIT_READ_SUCCESS))
    }, [dispatch]);

    const filteredUnits = useMemo(() => {
        return counter.filter((item) => {
            return (
                (age === "All" || item.age === age) &&
                (!food || (item.cost?.Food || 0) <= costs.foodSlider) &&
                (!wood || (item.cost?.Wood || 0) <= costs.woodSlider) &&
                (!gold || (item.cost?.Gold || 0) <= costs.goldSlider)
            );
        });
    }, [age, counter, costs, food, wood, gold]);

    const costRenderer = (item: Cost | undefined) => {
        if (!item) {
            return "-"
        }
        const parts = [];
        if (item.Wood) {
            parts.push(`Wood: ${item.Wood}`);
        }

        if (item.Food) {
            parts.push(`Food: ${item.Food}`);
        }

        if (item.Gold) {
            parts.push(`Gold: ${item.Gold}`);
        }
        switch (parts.length) {
            case 0:
                return '-';
            case 1:
                return parts[0];
            default:
                return parts.join(',');
        }
    }

    const linkUnitDetails = (id: number) => {
        navigate(`/unitDetails/${id}`)
    }
    return (
        <div className="unit-table-container">
            <div className="total-count">Unit Count: ({filteredUnits.length})</div>
            {
                counter.length === 0 ? (
                    <Box display="flex" justifyContent="center">
                        <FacebookCircularProgress />
                    </Box>
                ) : (
                    <div className="unit-table-container">
                        <table className="table">
                            <thead>
                                <tr className="unit-table-header-row">
                                    <th className="unit-table-header-row_item" scope="col">id</th>
                                    <th className="unit-table-header-row_item" scope="col">name</th>
                                    <th className="unit-table-header-row_item" scope="col">age</th>
                                    <th className="unit-table-header-row_item" scope="col">costs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUnits.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="unit-table-body-row"
                                        onClick={() => linkUnitDetails(row.id)}
                                    >
                                        <td className="unit-table-body-row_item" align="left">{row.id}</td>
                                        <td className="unit-table-body-row_item" align="center">{row.name}</td>
                                        <td className="unit-table-body-row_item" align="center">{row.age}</td>
                                        <td className="unit-table-body-row_item" align="center">{costRenderer(row.cost)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>

    );
}
export default UnitTable;