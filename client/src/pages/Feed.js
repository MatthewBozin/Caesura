import React, {useState, useEffect} from "react";
import dataService from '../dataService';
import Poem from "../components/Poem";
import { Button } from "@mui/material";

const Feed = (props) => {

  const [poems, setPoems] = useState(null)
  const [filters, setFilters] = useState([])
  const [sort, setSort] = useState(null)

  useEffect(() => {
    dataService.getFeed().then((res) => {
      setPoems(res.data.poems)
    })
  }, [])

  const sortPoems = (array) => {
    if (!sort) return array
    if (sort === 'snaps') return array.sort((a, b) => b.snaps.length - a.snaps.length)
    return array.sort((a, b) => b[sort] - a[sort])
  }

  const applyFilters = () => {
    let filteredPoems = [...poems]
    for (let filter of filters) {
      //filter[0] is the parameter, filter[1] is the desired value to filter for
      filteredPoems = filteredPoems.filter((poem) => poem[filter[0]] === filter[1])
    }
    return filteredPoems
  }

  const addSort = (sort) => {
    setSort(sort)
    setPoems([...poems])
  }

  const addFilter = (filter) => {
    setFilters([...filters, filter])
    setPoems([...poems])
  }

  return (
    <div className="app">
      <div className='by'>
        <Button variant='contained' color={filters.length !== 0 ? 'secondary' : 'primary'} onClick={() => {addFilter(['userName', props.user.userName])}}>My Poems</Button>
        <Button variant='contained' color={sort === 'snaps' ? 'secondary' : 'primary'} onClick={() => {addSort('snaps')}}>Most Snaps</Button>
        <Button variant='contained' color={sort === 'comment' ? 'secondary' : 'primary'} onClick={() => {addSort('comments')}}>Most Comments</Button>
        <Button variant='contained' color='primary' onClick={() => {setFilters([]);setSort(null)}}>Clear Filters</Button>
      </div>
      {poems && sortPoems(applyFilters(poems)).map((poem, i) => <Poem user={props.user} poem={poem} setPoems={setPoems} viewPoem={props.viewPoem} page={'feed'} key={i} />)}
    </div>
  )
}

export default Feed