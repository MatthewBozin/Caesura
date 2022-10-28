import React, {useState} from "react";
import { Button, CircularProgress } from '@mui/material'
import DataService from "../dataService";
import Choice from "../components/Choice"

const Create = (props) => {

  const [poems, setPoems] = useState({
    all: [],
    choices: [],
    poem: {authors: [], lines: [], title: ''}
  });

  const [step, setStep] = useState('poem')

  const [allTitles, setAllTitles] = useState([])

  const [activeTitles, setActiveTitles] = useState([])

  const [loading, setLoading] = useState(poems.all.length === 0)

  const handleSubmit = async e => {
      e.preventDefault();
      setLoading(true)
      setStep('poem')
      let msg = poems.poem;
      msg.userName = props.user.userName;
      msg.authors = [...new Set(msg.authors)];
      setPoems({
        all: [],
        choices: [],
        titles: [],
        poem: {authors: [], lines: [], title: ''}
      })
      await DataService.createPoem(msg);
      props.setPage('feed')
  }

  const select = (from, to, times) => {
    for (let i = 0; i < times; i++) {
      if (from.length === 0) continue;
      to.push(from.splice(Math.floor(Math.random() * from.length), 1)[0]);
    }
  }

  const selectPoems = () => {
    //splices three randomly selected poems from poems.all and pushes them into choices
    select(poems.all, poems.choices, 3)
    //for each poem in choices
    poems.choices.map((choice) => {
      //select a random index from poem.lines.length
      let num = Math.floor(Math.random() * choice.lines.length);
      //get the line at index
      choice.line = choice.lines[num];
      //add break symbol if line is space
      if (choice.line === "") choice.line = "[-]"
      choice.index = num;
      choice.prevLines = [];
      //if a line exists i lines before index,
      //add it to choice.prevLines
      //do this 5 times
      for (let i = 1; i < 5; i++) {
        if (choice.lines[num - i]) choice.prevLines.unshift(choice.lines[num - i]);
      }
      return {...choice}
    })
    setPoems(JSON.parse(JSON.stringify({...poems})))
  }

  const getPoems = async () => {
    const res = await DataService.getPoemData();
    const data = await res.data.poemData;
    poems.all = data;
    setPoems({...poems});
    setLoading(false);
    selectPoems();
  }

  const add = async (line, author, title) => {
    if (poems.all.length <= 3) {
      await getPoems();
    }
    poems.poem.lines.push(line);
    poems.poem.authors.push(author);
    let cleanTitle = title.split(' ').filter((word) => word !== 'Rape')
    setAllTitles([...allTitles, ...cleanTitle])
    poems.choices = [];
    selectPoems();
  }

  const resetTitles = () => {
    let newTitles = []
    select(allTitles, newTitles, 5)
    setAllTitles([...allTitles])
    setActiveTitles([...newTitles])
  }

  const addToTitle = (word) => {
    poems.poem.title += word + ' '
    setPoems({...poems})
    resetTitles()
  }

  if (poems.all.length === 0) {
    getPoems();
  }

  return (
    <>
      {loading === true ? (
        <div className="loader">
          <CircularProgress/>
        </div>
      ) : (
        <div className="app">
          <h2>Build Your {step === 'poem' && <span>Poem</span>}{step === 'title' && <span>Title</span>}</h2>
            <div>
              {step === 'poem' && (
                <section className="container">
                  {poems.choices.map((poem, index) => {
                    return <Choice poem={poem} add={add} key={index}/>
                  })}
                </section>
              )}
              {step === 'title' && (
                <section className="container">
                  {activeTitles.map((word, index) => {
                    return <button className='title' onClick={() => {addToTitle(word)}} key={index} type='submit'>{word}</button>
                  })}
                </section>
              )}
            </div>
          {poems.all.length !== 0 && 
            <h3>Your Poem</h3>
          }
          {step === 'title' && (
            <h3>{poems.poem.title}</h3>
          )}
          <section className="container final">
            {poems.poem.lines.map((line, index) => {
              return <div key={index}>{line}</div>
            })}
          </section>
          {step === 'poem' && 
            <Button onClick={() => {resetTitles();setStep('title')}} type='submit' variant='contained' color='primary'>Build Title</Button>
          }
          {step === 'title' && 
            <Button onClick={handleSubmit} type='submit' variant='contained' color='primary'>Create</Button>
          }
        </div>
      )}
    </>
  )
}

export default Create