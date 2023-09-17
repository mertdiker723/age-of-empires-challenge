import _ from 'lodash';

// Material UI
import { Box, Checkbox, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Screen
import { useStateDispatch, useUnitState } from '../../../screen/Unit/unitContext';

// Assest & Styles
import { PrettoSlider } from '../../../assets/MuiStyleComponents/style';
import "./Style.scss";

const Costs = () => {
    // Context
    const dispatch = useStateDispatch();
    const stateUnit = useUnitState();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md')) as boolean;

    const debouncedUpdateState = _.debounce((nameSlider: string, newValue: number | number[]) => {
        dispatch({
            type: "SLIDER", payload: {
                ...stateUnit,
                costs: {
                    ...stateUnit.costs,
                    [nameSlider]: newValue
                }
            }
        });
    }, 300);

    const handleSliderChange = (nameSlider: string, event: Event, newValue: number | number[]) => {
        debouncedUpdateState(nameSlider, newValue);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        const payload = {
            ...stateUnit,
            checkbox: {
                ...stateUnit.checkbox,
                [name]: event.target.checked
            }
        };
        dispatch({
            type: "CHECKBOX", payload
        });
    };
    const { foodSlider, goldSlider, woodSlider } = stateUnit.costs;
    return (
        <Grid container spacing={2} mt={2} className='cost-container'>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Costs
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={12} sm={12} md={2} display="flex" alignItems="center">
                        <Checkbox
                            checked={stateUnit.checkbox?.wood}
                            onChange={handleChange}
                            name="wood"
                            color="default"
                            id='woodCheckbox'
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <label htmlFor="woodCheckbox" className='range-header'>
                            Wood
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={12} md={10} display="flex" alignItems="center">
                        <Box sx={{ width: 320 }}>
                            <PrettoSlider
                                valueLabelDisplay="auto"
                                aria-label="pretto slider"
                                onChange={(event, newValue) => handleSliderChange("woodSlider", event, newValue)}
                                name='woodSlider'
                                max={200}
                                disabled={!stateUnit.checkbox?.wood}
                                min={0}
                            />
                        </Box>
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="subtitle2" display="block" gutterBottom className='cost-count'>
                                {woodSlider} - 200
                            </Typography>
                        </Box>
                        <Box sx={{ ml: 2, display: matches ? "none" : "block" }}>
                            <div className='restricted-information'> Min: 0; Max: 200</div>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} display="flex" alignItems="center">
                        <Checkbox
                            checked={stateUnit.checkbox?.food}
                            onChange={handleChange}
                            color="default"
                            name='food'
                            id='foodCheckbox'
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <label htmlFor="foodCheckbox" className='range-header'>
                            Food
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={12} md={10} display="flex" alignItems="center">
                        <Box sx={{ width: 320 }}>
                            <PrettoSlider
                                valueLabelDisplay="auto"
                                aria-label="pretto slider"
                                name='foodSlider'
                                onChange={(event, newValue) => handleSliderChange("foodSlider", event, newValue)}
                                max={200}
                                disabled={!stateUnit.checkbox?.food}
                                min={0}

                            />
                        </Box>
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="subtitle2" display="block" gutterBottom className='cost-count'>
                                {foodSlider} - 200
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} display="flex" alignItems="center">
                        <Checkbox
                            checked={stateUnit.checkbox?.gold}
                            onChange={handleChange}
                            color="default"
                            name="gold"
                            id='goldCheckbox'
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <label htmlFor="goldCheckbox" className='range-header'>
                            Gold
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={12} md={10} display="flex" alignItems="center">
                        <Box sx={{ width: 320 }}>
                            <PrettoSlider
                                valueLabelDisplay="auto"
                                aria-label="pretto slider"
                                name='goldSlider'
                                onChange={(event, newValue) => handleSliderChange("goldSlider", event, newValue)}
                                max={200}
                                disabled={!stateUnit.checkbox?.gold}
                                min={0}
                            />
                        </Box>
                        <Box sx={{ ml: 2 }}>
                            <Typography variant="subtitle2" display="block" gutterBottom className='cost-count'>
                                {goldSlider} - 200
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Costs;