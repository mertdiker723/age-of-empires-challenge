import { useEffect, useReducer, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';

// Material UI
import { Alert, Stack, Box } from '@mui/material';

// Components
import UnitDetailTable from '../../components/UnitDetail';

// Common
import FacebookCircularProgress from '../../common/Loader/facebookCircularProgress';

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
        });
        try {
            if (id) {
                setState({
                    selectedUnit: await getSelectedUnit(+id),
                    loading: false
                });
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

    const filteredUnits = useMemo(() => () => {
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
        const renderUnits: [string, Unit][] | undefined = selectedUnit && Object.entries(selectedUnit).filter(([key]) => !keysToExclude.includes(key));
        return renderUnits;
    }, [selectedUnit]);

    return (
        <>
            {
                loading && (
                    <Box display="flex" mt={5} justifyContent="center">
                        <FacebookCircularProgress />
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
            <UnitDetailTable renderUnits={filteredUnits()} />
        </>
    );
};

export default UnitDetail;