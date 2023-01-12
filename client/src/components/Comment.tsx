import { useContext, useState } from 'react'
import { Typography, Card, CardContent } from '@mui/material'
import DataService from "../dataService";
import { Context } from '../Context';

interface Props {
  comment: any,
  user: any
}

const Comment = (props: Props) => {
  const [context, setContext] = useContext<any>(Context)
  const [expanded, setExpanded] = useState(false)
  return (
    <Card style={{ border: "none", boxShadow: "none" }}>
      <CardContent className="poem">
        {props.comment.lines.map((line: string, i: number) => {
          return <Typography align='center' key={i}>{line}</Typography>
        })}
        <hr></hr>
        <div className="by">
          <Typography align='center' gutterBottom>By {props.comment.userName}</Typography>
          <button className='button' onClick={() => { setExpanded(!expanded) }}>+</button>
        </div>
        {expanded && <div>
          <Typography align='center'>With some help from:</Typography>
          <Typography align='center'>
            {props.comment.authors.map((author: string, i: number) => {
              return <span key={i}>{i !== 0 && <span>, </span>}{author}</span>
            })}
          </Typography>
        </div>}
        <hr></hr>
        <Typography align='center'>{props.comment.date}</Typography>
        <div>
          {props.user && <button className='button' color='primary' onClick={() => {
            DataService.snapComment({ _id: props.comment._id }).then(() => {
              DataService.getComments({ _id: context.id }).then((res) => {
                context.comments = res.data.comments
                setContext({ ...context })
              })
            })
          }}>Snaps: {props.comment.snaps.length}</button>}
          {props.user.userName === props.comment.userName && <button className='button' color='primary' onClick={() => {
            DataService.deleteComment({ _id: props.comment._id, poem: context.id }).then(() => {
              DataService.getComments({ _id: context.id }).then((res) => {
                context.comments = res.data.comments
                setContext({ ...context })
              })
            })
          }}>Delete</button>}
        </div>
      </CardContent>
    </Card>
  )
}

export default Comment