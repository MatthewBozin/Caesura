import React, {useState, useEffect} from "react";
import dataService from '../dataService';
import Poem from "../components/Poem";

const Feed = (props) => {

  const [poems, setPoems] = useState(null);

  useEffect(() => {
    dataService.getFeed().then((res) => {
      setPoems(res.data.poems)
    })
  }, [])

  return (
    <div className="app">
        {poems && poems.map((poem, i) => <Poem user={props.user} poem={poem} setPoems={setPoems} page={'feed'} key={i} />)}
    </div>
  )
}

export default Feed