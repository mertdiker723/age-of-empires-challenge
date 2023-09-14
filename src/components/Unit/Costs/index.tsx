import { useState } from 'react';
// Material UI
import { Box, Checkbox, Grid, Typography, debounce } from '@mui/material';

// Screen
import { useStateDispatch, useStateString } from '../../../screen/Unit/unitContext';

// Assest & Styles
import { PrettoSlider } from '../../../assets/MuiStyleComponents/style';
import "./Style.scss";

const Costs = () => {
    // Context
    const dispatch = useStateDispatch();
    const stateString = useStateString();


    const debouncedUpdateState = debounce((nameSlider: string, newValue: number | number[]) => {
        dispatch({
            type: "SLIDER", payload: {
                costs: {
                    ...stateString.costs,
                    [nameSlider]: newValue
                }
            }
        })
    }, 300);

    const handleSliderChange = (nameSlider: string, event: Event, newValue: number | number[]) => {
        debouncedUpdateState(nameSlider, newValue)
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        const payload = {
            checkbox: {
                ...stateString.checkbox,
                [name]: event.target.checked
            }
        }
        dispatch({
            type: "CHECKBOX", payload
        })
    };

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
                            checked={stateString.checkbox?.wood}
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
                    <Grid item xs={12} sm={12} md={10}>
                        <Box sx={{ width: 320 }}>
                            <PrettoSlider
                                valueLabelDisplay="auto"
                                aria-label="pretto slider"
                                onChange={(event, newValue) => handleSliderChange("woodSlider", event, newValue)}
                                name='woodSlider'
                                max={200}
                                disabled={!stateString.checkbox?.wood}
                                min={0}

                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} display="flex" alignItems="center">
                        <Checkbox
                            checked={stateString.checkbox?.food}
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
                    <Grid item xs={12} sm={12} md={10}>
                        <Box sx={{ width: 320 }}>
                            <PrettoSlider
                                valueLabelDisplay="auto"
                                aria-label="pretto slider"
                                name='foodSlider'
                                onChange={(event, newValue) => handleSliderChange("foodSlider", event, newValue)}
                                max={200}
                                disabled={!stateString.checkbox?.food}
                                min={0}

                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} display="flex" alignItems="center">
                        <Checkbox
                            checked={stateString.checkbox?.gold}
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
                    <Grid item xs={12} sm={12} md={10}>
                        <Box sx={{ width: 320 }}>
                            <PrettoSlider
                                valueLabelDisplay="auto"
                                aria-label="pretto slider"
                                name='goldSlider'
                                onChange={(event, newValue) => handleSliderChange("goldSlider", event, newValue)}
                                max={200}
                                disabled={!stateString.checkbox?.gold}
                                min={0}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Costs