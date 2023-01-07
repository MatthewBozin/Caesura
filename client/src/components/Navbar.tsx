import { AppBar, Toolbar, Typography, Stack, Button } from '@mui/material'
import dataService from '../dataService'

const Navbar = (props: any) => {
  return (
    <AppBar position='static' color='primary'>
      <Toolbar>
        <Typography className='logo' onClick={() => { props.setPage('landing') }} variant='h6' component='div' sx={{ flexGrow: 1 }}>
          CAESURA
        </Typography>
        <Stack direction='row' spacing='2'>
          {props.user ? (
            <>
              <Button onClick={() => { props.setPage('create') }} color='inherit'>Create</Button>
              <Button onClick={() => { props.setPage('feed') }} color='inherit'>Feed</Button>
              <Button onClick={() => {
                props.setUser(null)
                props.setPage('landing')
                dataService.logout()
              }} color='inherit'>Logout</Button>
            </>
          ) : (
            <>
              <Button onClick={() => { props.setPage('login') }} color='inherit'>Login</Button>
              <Button onClick={() => { props.setPage('signup') }} color='inherit'>Signup</Button>
            </>
          )}

        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar