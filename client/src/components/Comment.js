import React, {useContext, useState} from 'react'
import { Typography, Card, CardContent } from '@mui/material'
import DataService from "../dataService";
import { Context } from '../Context';

const Comment = (props) => {
  const [context, setContext] = useContext(Context)
  const [expanded, setExpanded] = useState(false)
  return (
    <Card style={{ border: "none", boxShadow: "none" }}>
        <CardContent className="poem">
            {props.comment.lines.map((line, i) => {
                return <Typography align='center' key={i}>{line}</Typography>
            })}
            <hr></hr>
            <div className="by">
                <Typography align='center' gutterBottom>By {props.comment.userName}</Typography>
                <button className='button' onClick={() => {setExpanded(!expanded)}}>+</button>
            </div>
            {expanded && <div>
                <Typography align='center'>With some help from:</Typography>
                <Typography align='center'>
                  {props.comment.authors.map((author, i) => {
                      return <span key={i}>{i !== 0 && <span>, </span>}{author}</span>
                  })}
                </Typography>
            </div>}
            <hr></hr>
            <Typography align='center'>{props.comment.date}</Typography>
            <div>   
              {props.user && <button className='button' variant='contained' color='primary' onClick={() => {
                DataService.snapComment({_id: props.comment._id}).then(() => {
                  DataService.getComments({_id: context.id}).then((res) => {
                    context.comments = res.data.comments
                    setContext({...context})
                  })
                })
              }}>Snaps: {props.comment.snaps.length}</button>}    
              {props.user.userName === props.comment.userName && <button className='button' variant='contained' color='primary' onClick={() => {
                DataService.deleteComment({_id: props.comment._id, poem: context.id}).then(() => {
                  DataService.getComments({_id: context.id}).then((res) => {
                    context.comments = res.data.comments
                    setContext({...context})
                  })
                })
              }}>Delete</button>}
            </div>
        </CardContent>
    </Card>
  )
}

export default Comment