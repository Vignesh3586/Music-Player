import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { useState ,useEffect} from 'react';
import dataContext from '../context/dataContext';

const Songs = () => {
  const {audios,handleChangeSong}=useContext(dataContext)
  const [favourites, setFavourites] = useState([]);



  

  // Load favourites from localStorage when the component mounts
  useEffect(() => {
    const existingFavourites = localStorage.getItem('favourites');
    if (existingFavourites) {
      setFavourites(JSON.parse(existingFavourites));
    }
  }, []);

  // Check if a song is already marked as favourite
  const isFavouriteOrNot = (index) => {
    return favourites.some(fav => fav.song === audios[index].src) ? (
      <FontAwesomeIcon icon={faHeartSolid} style={{ color: "#f31212" }} />
    ) : (
      <FontAwesomeIcon icon={faHeartRegular} style={{ color: "#f31212" }} />
    );
  };

  // Add or remove song from favourites
  const toggleFavourite = (index) => {
    const updatedFavourites = [...favourites];
    const songSrc = audios[index].src;

    const existingIndex = updatedFavourites.findIndex(fav => fav.song === songSrc);
    if (existingIndex !== -1) {
      // Remove from favourites if already present
      updatedFavourites.splice(existingIndex, 1);
    } else {
      // Add to favourites if not present
      updatedFavourites.push({ id: updatedFavourites.length + 1, song: songSrc });
    }

    // Update state and localStorage
    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };
 
  // Extract song name from the URL
  const songName = (index) => {
    const songURL = audios[index].src;
    if (!songURL) return 'Unknown Song'; // Handle undefined songURL
    const nameOfSong = songURL.slice(songURL.lastIndexOf('/') + 1, songURL.lastIndexOf('.'));
    return nameOfSong;
  };
  // Mapping through songs array
 


  return (
    <>
      <ul className="music-list">
        {audios.map((song, index) => (
      <li key={index} >
        <div  className="music-list-li" >
        <img src={`/src/assets/images/image${index + 1}.jpg`} alt={`Song ${index + 1}`} />
        <button id="change-btn" onClick={() => handleChangeSong(index)}>
          <h1>{songName(index)}</h1>
        </button>
        <div className='fav-container'>
          <button className="fav-info-btn action-btn" onClick={()=>{
            toggleFavourite(index)}}>
                   {isFavouriteOrNot(index)}
          </button>
          </div>
          </div> 
      </li>
      ))}
      </ul>
     
    </>
  );
};

export default Songs;
