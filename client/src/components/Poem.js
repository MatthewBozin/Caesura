import React, {useContext, useState} from 'react'
import { Typography, Card, CardContent } from '@mui/material'
import DataService from "../dataService";
import { Context } from '../Context';

const Poem = (props) => {
  const [context, setContext] = useContext(Context)
  const [expanded, setExpanded] = useState(false)
  return (
    <Card style={{ border: "none", boxShadow: "none" }}>
        <CardContent className='bg-slate-500'>
            {props.poem.title && <Typography align='center' gutterBottom variant='h4'>{props.poem.title}</Typography>}
            {props.poem.lines.map((line, i) => {
                return <Typography align='center' key={i}>{line}</Typography>
            })}
            <hr></hr>
            {props.page !== 'profile' && <div className="by">
              <Typography align='center' gutterBottom>By {props.poem.userName}</Typography>
              <button className='button' onClick={() => {setExpanded(!expanded)}}>+</button>
            </div>}
            {expanded && <div>
              <Typography align='center'>With some help from:</Typography>
              <Typography align='center'>
                {props.poem.authors.map((author, i) => {
                    return <span key={i}>{i !== 0 && <span>, </span>}{author}</span>
                })}
              </Typography>
            </div>}
            <hr></hr>
            <Typography align='center'>{props.poem.date}</Typography>
            <div>  
              {props.user && <button className='button' variant='contained' color='primary' onClick={() => {
                DataService.snap({_id: props.poem._id}).then(() => {
                  DataService.getFeed().then((res) => {
                    props.setPoems(res.data.poems)
                  })
                })
                props.setPoems(null)
              }}>Snaps: {props.poem.snaps.length}</button>}   
              {props.page !== 'poem' && <button className='button' variant='contained' color='primary' onClick={async () => {
                context.id = props.poem._id
                context.poem = props.poem
                context.page = 'viewPoem'
                const res = await DataService.getComments({_id: context.id})
                console.log(res.data.comments)
                context.comments = res.data.comments
                setContext({...context})
              }}>Comments: {props.poem.comments}</button>} 
              {props.user.userName === props.poem.userName && <button className='button' variant='contained' color='primary' onClick={() => {
                DataService.deletePoem({_id: props.poem._id}).then(() => {
                  DataService.getFeed().then((res) => {
                    props.setPoems(res.data.poems)
                  })
                })
                props.setPoems(null)
              }}>Delete</button>}
            </div>
        </CardContent>
    </Card>
  )
}

export default Poem