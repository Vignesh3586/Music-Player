import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState ,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import dataContext from '../context/dataContext';

const AddSongsToPlaylist = () => {
  const {audios,isWideScreen}=useContext(dataContext)
  const savedListArray = localStorage.getItem('playListArray');
  const playListArray = savedListArray ? JSON.parse(savedListArray) : [];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const navigate = useNavigate();

  const songName = (audio) => {
    const songURL = audio.src;
    if (!songURL) return 'Unknown Song';
    const nameOfSong = songURL.slice(songURL.lastIndexOf('/') + 1, songURL.lastIndexOf('.'));
    return nameOfSong;
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions(prevSelectedOptions => 
      checked ? [...prevSelectedOptions, value] : prevSelectedOptions.filter(option => option !== value)
    );
  };
  const handleBack = () => {
    if(isWideScreen){
      navigate('/playlist')
    }else{
      navigate('/menulist/playlist');
    }
  };

  const handleClick = () => {
    const updatedPlayListArray = playListArray.map((playlist, index) => {
      if (index === 0) {
        return { ...playlist, playListSongs: [...(playlist.playListSongs || []), ...selectedOptions] };
      }
      return playlist;
    });

    localStorage.setItem('playListArray', JSON.stringify(updatedPlayListArray));
    alert('Songs added to playlist successfully!');
   handleBack();
  };



  return (
    <>
      <div>
        <div className="add-song">
          <button onClick={handleBack}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span>Add songs</span>
          <button className="add-song-btn" onClick={handleClick}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        {audios.length > 0 ? (
          <form id="select-music">
            <ul>
              {audios.map(audio => (
                <li key={songName(audio)}>
                  <label htmlFor='input-checkbox'>
                    {songName(audio)} </label>
                    <input id='input-checkbox' type="checkbox" name="songOptions" value={audio.src} onChange={handleCheckboxChange} />
                
                </li>
              ))}
            </ul>
          </form>
        ) : (
          <p>No audio files available to add to the playlist.</p>
        )}
      </div>
    </>
  );
};

export default AddSongsToPlaylist;
