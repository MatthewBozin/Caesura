import './App.css';
import { useState, useEffect } from "react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreatePoem from './pages/CreatePoem';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feed from './pages/Feed';
import CreateComment from './pages/CreateComment'
import ViewPoem from './pages/ViewPoem';
import dataService from './dataService'
import { Context } from './Context';
import { CircularProgress } from '@mui/material';

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [context, setContext] = useState({ page: 'landing', poem: {}, id: '', comments: [] })
  const setPage = (page: string) => {
    context.page = page
    setContext({ ...context })
  }

  useEffect(() => {
    dataService.checkLogin().then((res) => {
      setLoading(false);
      if (res.data.message === 'Not logged in.') return;
      setUser(res.data)
    })
  }, [])

  return (
    <>
      <Context.Provider value={[context, setContext]}>
        {loading === true ? (
          <div className="loader">
            <CircularProgress />
          </div>
        ) : (
          <div className='screen'>
            <Navbar setPage={setPage} user={user} setUser={setUser} />
            {context.page === 'landing' && <Landing user={user} setPage={setPage} />}
            {context.page === 'feed' && <Feed user={user} />}
            {context.page === 'viewPoem' && <ViewPoem setPage={setPage} user={user} />}
            {context.page === 'create' && <CreatePoem setPage={setPage} user={user} />}
            {context.page === 'comment' && <CreateComment setPage={setPage} user={user} />}
            {context.page === 'login' && <Login setUser={setUser} setPage={setPage} />}
            {context.page === 'signup' && <Signup setPage={setPage} />}
            <Footer />
          </div>
        )}
      </Context.Provider>
    </>
  );
}

export default App;
