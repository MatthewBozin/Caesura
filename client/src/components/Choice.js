import React from 'react'

const Choice = (props) => {
  return (
    <div className="choice" onClick={() => {props.add(props.poem.line, props.poem.author, props.poem.title)}}>
      <h6>from</h6>
      <h3>{props.poem.title}</h3>
      <h6>{props.poem.author}</h6>
      {props.poem.prevLines.map((prevLine, index) => {
        return <div className="prevLine" key={index}>{prevLine}</div>
      })}
      <div>{props.poem.line}</div>
    </div>
  )
}

export default Choice