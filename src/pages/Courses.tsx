import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {Grid} from "@mui/material";

import ImgCard from "../components/ImgCard/ImgCard";
import { coursesActions } from '../store/courses-slice';
import {RootState} from "../store";


const Courses: React.FC = () => {
    const [value, setValue] = React.useState('all');
    let courses = useSelector((state:RootState) => state.courses);
    const dispatch = useDispatch();
    const items = courses.filtered.length > 0 ? courses.filtered : courses.all;

    const coursesList = items.map((course,index) => {
        return (
            <ImgCard imgPath={course.imgPath} type={course.type} key={index} />
        )
    })

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        dispatch(coursesActions.filterByType(newValue));
    };

    return (
        <Box sx={{ width: '100%', height: '100vh' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <h1>Courses</h1>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value="all" label="All" />
                        <Tab value="popular" label="Popular" />
                        <Tab value="favorite" label="Favorite" />
                        <Tab value="new" label="New" />
                    </Tabs>
                </Grid>
            </Grid>
            <Grid container spacing={5}>
                {coursesList}
            </Grid>
        </Box>
    );
};

export default Courses;