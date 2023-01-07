import { Typography } from '@mui/material'
import { motion } from 'framer-motion'

const Choice = (props: any) => {
  return (
    <motion.div className="choice" initial={{ scale: 0.9 }} whileHover={{ scale: 1 }}>
      <div onClick={() => { props.add(props.poem.line, props.poem.author, props.poem.title) }}>
        <Typography>from</Typography>
        <Typography variant={'h4'}>{props.poem.title}</Typography>
        <Typography variant={'h6'}>by {props.poem.author}</Typography>
        {props.poem.prevLines.map((prevLine: string, index: number) => {
          return <Typography className="prevLine" key={index}>{prevLine}</Typography>
        })}
        <Typography>{props.poem.line}</Typography>
      </div>
    </motion.div>
  )
}

export default Choice