import * as React from 'react';

import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {Grid} from "@mui/material";

import Course from "../../models/course";

// @ts-ignore
import classes from "./ImgCard.module.css"

const ImgCard: React.FC<Course> = (props) => {
    return (
        <Grid item xs={4} >
            <Card sx={{ display: 'flex' }} className={classes[props.type]}>
                <CardMedia
                    component="img"
                    sx={{ height: 250 }}
                    image={props.imgPath}
                    alt="Live from space album cover"
                />
                <Box sx={{ margin: 1 }}>
                    <CardContent>
                        <Typography component="div" variant="h5">
                            134 min
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            20 lessons
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </Grid>
    )
}

export default ImgCard;