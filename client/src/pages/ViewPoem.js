import React, {useContext} from "react";
import Poem from "../components/Poem";
import { Button } from '@mui/material'
import { Context } from "../Context";
import Comment from "../components/Comment";

const ViewPoem = (props) => {
  const [context] = useContext(Context)
  return (
    <div className='app'>
        <Poem user={props.user} poem={context.poem} page={'poem'} />
        {context.comments.map((comment, index) => <Comment comment={comment} user={props.user} key={index}/>)}
        <Button variant='contained' color='primary' onClick={() => {props.setPage('comment')}}>Create Comment</Button>
    </div>
  )
}

export default ViewPoem