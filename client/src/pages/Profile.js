import React, {useState, useEffect} from "react";
import dataService from '../dataService';
import Poem from "../components/Poem";

const Profile = () => {
  const [poems, setPoems] = useState(null);

  useEffect(() => {
    dataService.getPoems().then((res) => {
      setPoems(res.data.poems)
    })
  }, [])

  return (
    <div className="app">
        <h1>Your Poems</h1>
        {poems && poems.map((poem, i) => <Poem poem={poem} setPoems={setPoems} page='profile' key={i} />)}
    </div>
  )
}

export default Profile