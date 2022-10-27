import React, {useContext} from 'react'
import { Button, Typography, Card, CardContent } from '@mui/material'
import DataService from "../dataService";
import { Context } from '../Context';

const Comment = (props) => {
    console.log(props.user)
  const [context, setContext] = useContext(Context)
  return (
    <Card className="app poem" style={{ border: "none", boxShadow: "none" }}>
        <CardContent className="app">
            <Typography align='center' gutterBottom variant='h5'>By {props.comment.userName}</Typography>
            {props.comment.lines.map((line, i) => {
                return <Typography align='center' key={i}>{line}</Typography>
            })}
            <hr></hr>
            <Typography align='center'>With some help from:</Typography>
            <Typography align='center'>
              {props.comment.authors.map((author, i) => {
                  return <span key={i}>{i !== 0 && <span>, </span>}{author}</span>
              })}
            </Typography>
            <hr></hr>
            <Typography align='center'>On {props.comment.date}</Typography>
            <div>   
              {props.user && <Button variant='contained' color='primary' onClick={() => {
                DataService.snapComment({_id: props.comment._id}).then(() => {
                  DataService.getComments({_id: context.id}).then((res) => {
                    context.comments = res.data.comments
                    setContext({...context})
                  })
                })
              }}>Snaps: {props.comment.snaps.length}</Button>}    
              {props.user.userName === props.comment.userName && <Button variant='contained' color='primary' onClick={() => {
                DataService.deleteComment({_id: props.comment._id, poem: context.id}).then(() => {
                  DataService.getComments({_id: context.id}).then((res) => {
                    context.comments = res.data.comments
                    setContext({...context})
                  })
                })
              }}>Delete</Button>}
            </div>
        </CardContent>
    </Card>
  )
}

export default Comment