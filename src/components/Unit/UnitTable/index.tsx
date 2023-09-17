import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Material UI
import { Box } from '@mui/material';

// Screen
import { useUnitState } from "../../../screen/Unit/unitContext";

// Common
import FacebookCircularProgress from "../../../common/Loader/facebookCircularProgress";

// Core
import { Types } from '../../../core/redux/action/actionTypes';
import { loadUnits } from '../../../core/redux/action/unitAction';
import { RootState } from '../../../core/redux/reducer';
import { Cost, Unit } from "../../../core/types";

// Assets & Styles
import "./Style.scss";

const UnitTable = () => {
    const counter = useSelector((state: RootState) => state.unitReducer);
    const dispatch: (action: any) => Promise<void> = useDispatch();

    const { age, checkbox, costs } = useUnitState();
    const { food, wood, gold } = checkbox;

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadUnits(Types.UNIT_READ_SUCCESS));
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
            return "-";
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
    };

    const linkUnitDetails = (id: number) => {
        navigate(`/unitDetails/${id}`);
    };
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
                            <UnitTableHead
                                headItems={["id", "name", "age", "costs"]}
                                rowClassName="unit-table-header-row_item"
                            />
                            <UnitTableBody
                                filteredUnits={filteredUnits}
                                linkUnitDetails={linkUnitDetails}
                                costRenderer={costRenderer}
                                rowClassName="unit-table-body-row_item"
                            />
                        </table>
                    </div>
                )
            }
        </div>

    );
};

type UnitTableHead = {
    headItems: string[],
    rowClassName: string;
}

const UnitTableHead = ({ headItems, rowClassName }: UnitTableHead) => {
    return (
        <thead>
            <tr className="unit-table-header-row">
                {
                    headItems.map((item, index) => {
                        return (
                            <th key={index} className={rowClassName} scope="col">{item}</th>
                        );
                    })
                }
            </tr>
        </thead>
    );
};

type UnitTableBody = {
    filteredUnits: Unit[],
    linkUnitDetails: (id: number) => void;
    costRenderer: (item: Cost | undefined) => string;
    rowClassName: string;
}

const UnitTableBody = ({ filteredUnits, linkUnitDetails, costRenderer, rowClassName }: UnitTableBody) => {
    return (
        <tbody>
            {filteredUnits.map((row) => (
                <tr
                    key={row.id}
                    className="unit-table-body-row"
                    onClick={() => linkUnitDetails(row.id)}
                >
                    <td className={rowClassName} align="center">{row.id}</td>
                    <td className={rowClassName} align="center">{row.name}</td>
                    <td className={rowClassName} align="center">{row.age}</td>
                    <td className={rowClassName} align="center">{costRenderer(row.cost)}</td>
                </tr>
            ))}
        </tbody>
    );
};

export default UnitTable;