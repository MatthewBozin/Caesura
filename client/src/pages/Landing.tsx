import { Button } from '@mui/material'

const Landing = (props: any) => {
  return (
    <div className="app">
      <h1>CAESURA</h1>
      <span>(cae·su·ra, sēˈzyo͝orə): a break or pause in the middle of a verse</span>
      <h2>Poetry, remixed.</h2>
      {props.user ? (
        <Button type='submit' variant='contained' color='primary'
          onClick={() => { props.setPage("create") }}>Create</Button>
      ) :
        <>
          <Button type='submit' variant='contained' color='primary'
            onClick={() => { props.setPage("login") }}>Log In</Button>
          <Button type='submit' variant='contained' color='primary'
            onClick={() => { props.setPage("signup") }}>Sign Up</Button>
        </>
      }
    </div>
  )
}

export default Landing