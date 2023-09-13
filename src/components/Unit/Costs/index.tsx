import { useState } from 'react';

// Material UI
import { Box, Checkbox, Grid, Typography } from '@mui/material';

// Assest & Styles
import { PrettoSlider } from '../../../assets/MuiStyleComponents/style';
import "./Style.scss";

const Costs = () => {
    const [checked, setChecked] = useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
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
                            checked={checked}
                            onChange={handleChange}
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
                                max={200}
                                min={0}

                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} display="flex" alignItems="center">
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            color="default"
                            id='woodCheckbox'
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <label htmlFor="woodCheckbox" className='range-header'>
                            Food
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={12} md={10}>
                        <Box sx={{ width: 320 }}>
                            <PrettoSlider
                                valueLabelDisplay="auto"
                                aria-label="pretto slider"
                                max={200}
                                min={0}

                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} display="flex" alignItems="center">
                        <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            color="default"
                            id='woodCheckbox'
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <label htmlFor="woodCheckbox" className='range-header'>
                            Gold
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={12} md={10}>
                        <Box sx={{ width: 320 }}>
                            <PrettoSlider
                                valueLabelDisplay="auto"
                                aria-label="pretto slider"
                                max={200}
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