import React from 'react'
import {Typography} from '@mui/material'

const Choice = (props) => {
  return (
    <div className="choice" onClick={() => {props.add(props.poem.line, props.poem.author, props.poem.title)}}>
      <Typography>from</Typography>
      <Typography variant={'h4'}>{props.poem.title}</Typography>
      <Typography variant={'h6'}>by {props.poem.author}</Typography>
      {props.poem.prevLines.map((prevLine, index) => {
        return <Typography className="prevLine" key={index}>{prevLine}</Typography>
      })}
      <Typography>{props.poem.line}</Typography>
    </div>
  )
}

export default Choice