import { useState, useEffect } from "react";
import dataService from '../dataService';
import Poem from "../components/Poem";

const Feed = (props: any) => {

  const [poems, setPoems] = useState(null)
  const [filters, setFilters] = useState([])
  const [sort, setSort] = useState(null)

  useEffect(() => {
    dataService.getFeed().then((res) => {
      setPoems(res.data.poems)
    })
  }, [])

  const sortPoems = (array: Array<any>) => {
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

  const addSort = (sort: string) => {
    setSort(sort)
    setPoems([...poems])
  }

  const addFilter = (filter: Array<any>) => {
    setFilters([...filters, filter])
    setPoems([...poems])
  }

  return (
    <div className="app">
      <div className='by'>
        <button className={filters.length !== 0 ? 'button active' : 'button'} onClick={() => { addFilter(['userName', props.user.userName]) }}>My Poems</button>
        <button className={sort === 'snaps' ? 'button active' : 'button'} onClick={() => { addSort('snaps') }}>Most Snaps</button>
        <button className={sort === 'comment' ? 'button active' : 'button'} onClick={() => { addSort('comments') }}>Most Comments</button>
        <button className='button' onClick={() => { setFilters([]); setSort(null) }}>Clear Filters</button>
      </div>
      {poems && sortPoems(applyFilters()).map((poem, i) => <Poem user={props.user} poem={poem} setPoems={setPoems} viewPoem={props.viewPoem} page={'feed'} key={i} />)}
    </div>
  )
}

export default Feed