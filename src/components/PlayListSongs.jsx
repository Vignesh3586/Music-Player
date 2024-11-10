import React from  'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft,faPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import dataContext from '../context/dataContext';



const PlayListSongs = () => {
  const {songName,handleSong,isWideScreen}=useContext(dataContext)
  const {playlistid}=useParams()
  const navigate=useNavigate()
  const saveListArray=localStorage.getItem('playListArray')
  const playListArray=(saveListArray)?JSON.parse(saveListArray):[]
 
  const playlist= playListArray.find(playlist=>playlist.id == playlistid)
  const handleback=()=>{
    if(isWideScreen){
      navigate('/playlist')
    }else{
      navigate('/menulist/playlist');
    }
  }
  
  
  return (
    <>
      <div className="add-song">
            <button onClick={handleback}><FontAwesomeIcon icon={faChevronLeft}/></button>
            <span>Playlist Songs</span>
            <button className="add-song-btn" >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
      <section className="playlist-songs">
        {(playlist.playListSongs.length)>0 ? (
          <ul>
            {playlist.playListSongs.map((song, index) => (
              <li className="playlist-songs-li" key={index}><button className='play-song-btn' onClick={()=>handleSong(song)}>{
                songName(song)}</button></li>
            ))}
          </ul>
        ) :
        <div id="no-songs">No Songs </div>}
      </section>
    </>
  );
};

export default PlayListSongs;
