import React from 'react'
import { Typography, Box } from '@mui/material'

const Footer = () => {
  return (
    <Box component="footer" className='footer'>
        <Typography
          variant="subtitle1"
          align="center"
          color="white"
          component="p"
        >
          View <a href='https://github.com/MatthewBozin/Caesura'>Repo</a>
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="white"
          component="p"
        >
          Copyright © <a href='https://matthewbozin.netlify.app/'>Matthew Bozin</a> 2022
        </Typography>
    </Box>
  )
}

export default Footer