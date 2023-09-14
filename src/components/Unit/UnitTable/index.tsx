import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux"

// Material UI
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, CircularProgress } from '@mui/material';

// Screen
import { useStateString } from "../../../screen/Unit/unitContext";

// Core
import { Types } from '../../../core/redux/action/actionTypes';
import { loadUnits } from '../../../core/redux/action/unitAction';
import { RootState } from '../../../core/redux/reducer';
import { Cost } from "../../../core/types";

const UnitTable = () => {
    const counter = useSelector((state: RootState) => state.unitReducer)
    const dispatch: (action: any) => Promise<void> = useDispatch()

    const stateString = useStateString();

    console.log(stateString);
    
    useEffect(() => {
        dispatch(loadUnits(Types.UNIT_READ_SUCCESS))
    }, [dispatch])
    const filteredUnits = useMemo(() => () => {
        if (stateString.age === "All") {
            return counter;
        }
        return counter.filter(item => item.age === stateString.age);
    }, [stateString, counter]);

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

    return (
        <>
            {
                counter.length === 0 ? (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                ) : <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">id</TableCell>
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