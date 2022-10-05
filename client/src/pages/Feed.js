import React, {useState, useEffect} from "react";
import dataService from '../dataService';
import Poem from "../components/Poem";

const Feed = () => {

  const [feed, setFeed] = useState(null);

  useEffect(() => {
    dataService.getFeed().then((res) => {
      setFeed(res.data.poems)
    })
  }, [])

  return (
    <div className="app">
        {feed && feed.map((poem, i) => <Poem poem={poem} page={'feed'} key={i} />)}
    </div>
  )
}

export default Feed