import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useContext } from 'react';
import dataContext from '../context/dataContext';

const Favourites = () => {
  // State to hold favourites
  const [savedFavourites, setSavedFavourites] = useState([]);
  const {songName,handleSong}=useContext(dataContext)

  // Fetch favourites from localStorage on component mount
  useEffect(() => {
    const existingFavourites = localStorage.getItem('favourites');
    const favourites = existingFavourites ? JSON.parse(existingFavourites) : [];
    setSavedFavourites(favourites);
  }, []); // Empty dependency array to run only on component mount

  // Helper function to extract song name from URL
 
   


  // Delete a favourite by id
  const handleDelete = (id) => {
    const updatedFavourites = savedFavourites.filter((fav) => fav.id !== id);
    setSavedFavourites(updatedFavourites); // Update state
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites)); // Update localStorage
  };

  return (
    <>
      <section id='favourite-songs'>
        <ul>
          {savedFavourites.length > 0 ? (
            savedFavourites.map((favourite) => (
              <li key={favourite.id}>
                <div><button className='play-song-btn' onClick={()=>handleSong(favourite.song)}> {songName(favourite.song)}</button></div>
                <button
                  className='delete-btn'
                  onClick={() => {
                    handleDelete(favourite.id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))
          ) : (
            <div id='no-songs'>No Favourites</div>
          )}
        </ul>
      </section>
    </>
  );
};

export default Favourites;
