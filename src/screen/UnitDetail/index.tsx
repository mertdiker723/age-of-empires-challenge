import { useEffect, useReducer, useCallback, ReactNode } from 'react';
import { useParams } from 'react-router-dom';

// Material UI
import { Alert, Stack, Box, CircularProgress } from '@mui/material';
// Core
import { getSelectedUnit } from '../../db-mock/unitFetch';
import { Unit } from '../../core/types';

// Assets & Style 
import "./Style.scss";

type UnitDetailReducerProps = {
    errorMessage: string;
    selectedUnit?: Unit;
    loading: boolean;
}
const UnitDetail = () => {
    const [state, setState] = useReducer((currentState: Partial<UnitDetailReducerProps>, newState: Partial<UnitDetailReducerProps>) => ({ ...currentState, ...newState }), {
        errorMessage: "",
        selectedUnit: undefined,
        loading: false
    });
    const { errorMessage, selectedUnit, loading } = state;
    const { id } = useParams();

    const fetchData = useCallback(async () => {
        setState({
            loading: true
        })
        try {
            if (id) {
                setState({
                    selectedUnit: await getSelectedUnit(+id),
                    loading: false
                })
            }
        } catch (error) {
            if (error instanceof Error) {
                const errorMessage = error.message.toString();
                setState({
                    errorMessage,
                    loading: false
                });
            }
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const keysToExclude = [
        "attack_bonus",
        "line_of_sight",
        "movement_rate",
        "armor_bonus",
        "expansion",
        "range",
        "armor",
        "blast_radius"
    ];

    const renderUnits = selectedUnit && Object.entries(selectedUnit).filter(([key]) => !keysToExclude.includes(key));

    return (
        <>
            {
                loading && (
                    <Box display="flex" mt={5} justifyContent="center">
                        <CircularProgress />
                    </Box>
                )
            }
            {errorMessage && (
                <Stack
                    sx={{ width: '100%', mt: 2 }}
                    spacing={2}>
                    <Alert severity="error">
                        {errorMessage}
                    </Alert>
                </Stack>
            )}

            <div className='table-container'>
                {
                    renderUnits && renderUnits.map(([key, value], index) => {
                        const title = key.split('').map((char, index) => (index === 0 ? char.toUpperCase() : char.replace(/_/g, ' '))).join('');

                        return value !== null && typeof value === 'object' ? Object.entries(value).map(([costKey, costValue], indexNested) => {
                            return (
                                <div className='table-container_header' key={indexNested}>
                                    {costKey} {title}:
                                    <span className='text-item'>{costValue as ReactNode}</span>
                                </div>
                            )
                        })
                            : (
                                <div className='table-container_header' key={index}>
                                    {title}:
                                    <span className='text-item'>{value}</span>
                                </div>
                            )
                    })
                }

            </div>
        </>
    )
}

export default UnitDetail