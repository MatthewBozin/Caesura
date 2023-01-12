import { useState } from 'react'
import { Typography, Card, CardContent, Grid, TextField, Button } from '@mui/material'
import DataService from "../dataService";

const Login = (props: any) => {
    const defaultValues = {
        email: "",
        password: "",
    };

    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const response = await DataService.login(formValues);
        props.setUser(response.data);
        props.setPage('landing');
        console.log(response.data);
    }

    return (
        <div className="app">
            <Card>
                <CardContent>
                    <Typography gutterBottom variant='h5'>Log In</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                                <TextField name='email' value={formValues.email} onChange={handleInputChange} type='email' label='Email' placeholder='Enter Email' variant='outlined' fullWidth required></TextField>
                            </Grid>
                            <Grid xs={12} sm={6} item>
                                <TextField name='password' type='password' value={formValues.password} onChange={handleInputChange} label='Password' placeholder='Enter Password' variant='outlined' fullWidth required></TextField>
                            </Grid>
                            <Grid xs={12} item>
                                <Button type='submit' variant='contained' color='primary' fullWidth>Submit</Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Login