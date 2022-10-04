import React from 'react'
import { Button, Typography, Card, CardContent } from '@mui/material'
import DataService from "../dataService";

const Poem = (props) => {
  return (
    <Card className="app poem" style={{ border: "none", boxShadow: "none" }}>
        <CardContent className="app">
            {props.poem.title && <Typography align='center' gutterBottom variant='h4'>{props.poem.title}</Typography>}
            {props.page === 'feed' && <Typography align='center' gutterBottom variant='h5'>By {props.poem.userName}</Typography>}
            {props.poem.lines.map((line, i) => {
                return <Typography align='center' key={i}>{line}</Typography>
            })}
            <hr></hr>
            <Typography align='center'>With some help from:</Typography>
            <Typography align='center'>
              {props.poem.authors.map((author, i) => {
                  return <span key={i}>{i !== 0 && <span>, </span>}{author}</span>
              })}
            </Typography>
            <hr></hr>
            <Typography align='center'>On {props.poem.date}</Typography>
            {props.page === 'profile' && <Button variant='contained' color='primary' onClick={() => {
              DataService.deletePoem({_id: props.poem._id}).then(() => {
                DataService.getPoems().then((res) => {
                  props.setPoems(res.data.poems)
                })
              })
              props.setPoems(null)
            }}>Delete</Button>}
        </CardContent>
    </Card>
  )
}

export default Poem