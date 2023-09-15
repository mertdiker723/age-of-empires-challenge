import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

// Material UI
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, CircularProgress } from '@mui/material';

// Screen
import { useStateString } from "../../../screen/Unit/unitContext";

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

    const filteredUnits = useMemo(() => () => {
        if (age === "All") {
            if (food || wood || gold) {
                return counter.filter(item => {
                    return (food ? (item.cost?.Food || 0) <= costs.foodSlider : true) &&
                        (wood ? (item.cost?.Wood || 0) <= costs.woodSlider : true) &&
                        (gold ? (item.cost?.Gold || 0) <= costs.goldSlider : true)
                });
            }
            return counter;
        }
        return counter.filter(item => item.age === age).filter(item => {
            return (food ? (item.cost?.Food || 0) <= costs.foodSlider : true) &&
                (wood ? (item.cost?.Wood || 0) <= costs.woodSlider : true) &&
                (gold ? (item.cost?.Gold || 0) <= costs.goldSlider : true)
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
        <>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>({filteredUnits().length})</div>
            {
                counter.length === 0 ? (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                ) : <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table aria-label="caption table" sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">#id</TableCell>
                                <TableCell align="center">name</TableCell>
                                <TableCell align="center">age</TableCell>
                                <TableCell align="center">costs</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUnits().map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    className="unit-table-row"
                                    hover
                                    onClick={() => linkUnitDetails(row.id)}
                                >
                                    <TableCell align="left">{row.id}</TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.age}</TableCell>
                                    <TableCell align="center">{costRenderer(row.cost)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>

    );
}
export default UnitTable;