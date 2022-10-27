import React, {useState} from "react";
import Poem from "../components/Poem";
import dataService from "../dataService";
import { Button } from '@mui/material'

const ViewPoem = (props) => {
    //const [comments, setComments] = useState([])
    //if (!comments) {
    //     let data = dataService.getComments(props.id)
    //     setComments(data)
    // }
  return (
    <div>
        <Poem user={props.user} poem={props.poem} page={'poem'} />
        <Button onClick={props.setPage('comment')}>Create Comment</Button>
    </div>
  )
}

export default ViewPoem