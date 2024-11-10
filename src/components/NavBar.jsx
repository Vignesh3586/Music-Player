import React from 'react'
import { Link } from 'react-router-dom'
import { faChevronLeft,faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Outlet } from 'react-router-dom'
import '../index.css';
import { useContext } from 'react'
import dataContext from '../context/dataContext'

const NavBar = () => {
  const {styledLinkElement,isWideScreen}=useContext(dataContext)
  return (
    <>
    
      {isWideScreen ? (
       <nav className='nav-container'>
             <Link style={styledLinkElement} to="/" >Songs</Link>
               <Link style={styledLinkElement} to="/albums">Albums</Link>
               <Link style={styledLinkElement} to="/artists">Artists</Link>
               <Link style={styledLinkElement} to="/playlist">Playlist</Link>
               <Link style={styledLinkElement} to="/favourites">Favourites</Link>
               </nav>
      ):(
          <nav className='nav-container'>
        <Link style={styledLinkElement} to="/" ><FontAwesomeIcon icon={faChevronLeft} /></Link>
        <Link style={styledLinkElement} to="/menulist">Songs</Link>
          <Link style={styledLinkElement} to="albums">Albums</Link>
          <Link style={styledLinkElement} to="artists">Artists</Link>
          <Link style={styledLinkElement} to="playlist">Playlist</Link>
          <Link style={styledLinkElement} to="favourites">Favourites</Link>
          </nav>
    
      )}
     <Outlet />
      </>
  )
}

export default NavBar