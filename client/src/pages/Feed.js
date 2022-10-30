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

  const filter = (array, parameter, value) => array.filter(el => el[parameter] = value)

  const myPoems = () => {
    setPoems(filter(poems, 'userName', props.user.userName))
  }

  return (
    <div className="app">
        {poems && poems.map((poem, i) => <Poem user={props.user} poem={poem} setPoems={setPoems} viewPoem={props.viewPoem} page={'feed'} key={i} />)}
    </div>
  )
}

export default Feed