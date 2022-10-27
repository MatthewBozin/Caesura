import './App.css';
import React, {useState, useEffect} from "react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Create from './pages/Create.js';
import Landing from './pages/Landing.js';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Comment from './pages/Comment'
import ViewPoem from './pages/ViewPoem';
import dataService from './dataService';
import { CircularProgress } from '@mui/material';

function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [poem, setPoem] = useState(null)
  const [_id, set_Id] = useState(null)

  useEffect(() => {
    dataService.checkLogin().then((res) => {
      console.log(res.data);
      setLoading(false);
      if (res.data.message === 'Not logged in.') return;
      setUser(res.data)
    })
  }, [])

  const viewPoem = (_id) => {
    dataService.getPoem({id: _id}).then((res) => {
      setPoem(res.data.poem)
      set_Id(_id)
    })
    setPage('viewPoem')
  }

  return (
    <>
      {loading === true ? (
        <div className="loader">
          <CircularProgress/>
        </div>
      ) : (
        <div>
          <Navbar setPage={setPage} user={user} setUser={setUser}/>
          {page === 'landing' && <Landing user={user} setPage={setPage}/>}
          {page === 'feed' && <Feed user={user} viewPoem={viewPoem}/>}
          {page === 'profile' && <Profile user={user} viewPoem={viewPoem}/>}
          {page === 'viewPoem' && <ViewPoem poem={poem} setPage={setPage}/>}
          {page === 'create' && <Create setPage={setPage} user={user}/>}
          {page === 'comment' && <Comment setPage={setPage} user={user} _id={_id}/>}
          {page === 'login' && <Login setUser={setUser} setPage={setPage}/>}
          {page === 'signup' && <Signup />}
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
