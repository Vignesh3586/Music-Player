
import './App.css'
import Layout from './components/Layout'
import { Routes,Route } from 'react-router-dom'
import Songs from './components/Songs'
import Albums from './components/Albums'
import Artists from './components/Artists'
import Playlist from './components/Playlist'
import Favourites from './components/Favourites'
import Menulist from './components/Menulist'
import { Outlet } from 'react-router-dom'
import AddSongsToPlaylist from './components/AddSongsToPlaylist'
import PlayListSongs from './components/PlayListSongs'
import { useContext, useEffect } from 'react'
import dataContext from './context/dataContext'
import { useLocation } from 'react-router-dom'

function MainLayout(){
  return(
    <>
    <div className='layout-container'>
      <Layout/>
    </div>
    <div className='menulist-container'>
      <Menulist />
      </div>
    </>
  )
}


function App() {
  const {isWideScreen,setIsWideScreen}=useContext(dataContext)
  
  useEffect(()=>{
    const handleResize=()=>{
      setIsWideScreen(window.innerWidth>768)
    }
    handleResize()
    window.addEventListener('resize',handleResize)
    return ()=>{
      window.removeEventListener('resize',handleResize)
    }
  },[])


 
  return (
    <>
        <div className="app-container">

    {isWideScreen?(
      <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Songs/>} />
          <Route path="albums" element={<Albums />} />
          <Route path="artists" element={<Artists />} />
          <Route path="playlist" element={<Playlist />}/>
          <Route path="playlist/:playlistid" element={<PlayListSongs />} />
          <Route path="playlist/addsongs" element={<AddSongsToPlaylist />}/>
          <Route path="favourites" element={<Favourites />} />
        </Route>
          </Routes>
        
    ):(
      <>
      
      <Routes>
      <Route path="/" element={<Layout/>}/>
      <Route  path="/menulist" element={<Menulist />}>
          <Route index element={<Songs/>} />
          <Route path="albums" element={<Albums />} />
          <Route path="artists" element={<Artists />} />
          <Route path="playlist" element={<Playlist />}/>
          <Route path="playlist/:playlistid" element={<PlayListSongs />} />
          <Route path="playlist/addsongs" element={<AddSongsToPlaylist />}/>
          <Route path="favourites" element={<Favourites />} />
       </Route>
         </Routes>
         </>
    )}
  </div>
  <Outlet/>   
    </>
  )
}

export default App
