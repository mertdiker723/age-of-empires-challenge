// Material UI
import { Grid, Typography } from "@mui/material"

// Components
import AgesTabs from "./AgesTabs"

// Assets
import "./Style.scss";

const Ages = () => {
    return (
        <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Ages
                </Typography>
                <AgesTabs />
            </Grid>
        </Grid>
    )
}

export default Ages