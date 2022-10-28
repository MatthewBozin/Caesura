import React, {useState} from 'react'
import { Typography, Card, CardContent, Grid, TextField, Button } from '@mui/material'
import DataService from "../dataService";

const Signup = () => {

    const defaultValues = {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };

    const handleSubmit = e => {
        e.preventDefault();
        DataService.signup(formValues);
        console.log(formValues);
    }

    return (
      <div className="app">
          <Card className='signup'>
              <CardContent>
                  <Typography gutterBottom variant='h5'>Sign Up</Typography>
                  <form onSubmit={handleSubmit}>
                      <Grid container spacing={1}>
                          <Grid xs={12} sm={6} item>
                              <TextField name='userName' value={formValues.userName} onChange={handleInputChange} label='Username' placeholder='Enter Username' variant='outlined' fullWidth required></TextField>
                          </Grid>
                          <Grid xs={12} sm={6} item>
                              <TextField name='email' value={formValues.email} onChange={handleInputChange} type='email' label='Email' placeholder='Enter Email' variant='outlined' fullWidth required></TextField>
                          </Grid>
                          <Grid xs={12} sm={6} item>
                              <TextField name='password' value={formValues.password} onChange={handleInputChange} label='Password' placeholder='Enter Password' variant='outlined' fullWidth required></TextField>
                          </Grid>
                          <Grid xs={12} sm={6} item>
                              <TextField name='confirmPassword' value={formValues.confirmPassword} onChange={handleInputChange} label='Confirm Password' placeholder='Confirm Password' variant='outlined' fullWidth required></TextField>
                          </Grid>
                          <Grid xs={12}item>
                              <Button type='submit' variant='contained' color='primary' fullWidth>Submit</Button>
                          </Grid>
                      </Grid>
                  </form>
              </CardContent>
          </Card>
      </div>
    )
}

export default Signup