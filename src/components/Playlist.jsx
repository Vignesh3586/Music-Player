import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Playlist = () => {
  const [playList, setPlayList] = useState('');
  const [playListArray, setPlayListArray] = useState(()=>{
    const savedPlaylists=localStorage.getItem('playListArray')
    return (savedPlaylists)?JSON.parse(savedPlaylists):[]
  });
  const navigate = useNavigate();
  const [isPlaylist,setIsPlaylist]=useState('')

  const addPlaylist = (e) => {
    e.preventDefault();
    if (playList) {
      setPlayListArray([...playListArray, { id: playListArray.length + 1, playlistName: playList,playListSongs:[]}]);
      setPlayList('');
      setIsPlaylist(false) // Clear input field after adding
      navigate('/menulist/playlist'); // Navigate back to playlist page
    }
  };

  const cancelPlayList = (e) => {
    e.preventDefault();
    setIsPlaylist(false)
    setPlayList(''); // Clear the input field
    navigate('/menulist/playlist'); // Navigate back to playlist page
  };
  const styledLinkElement={
    color:"#FFFDFC",
    textDecoration:"none",
    margin:"10px"
  }
  useEffect(()=>{
    localStorage.setItem('playListArray',JSON.stringify(playListArray))
  },[playListArray])
  return (
    <>
      <section className="create-playlist">
        <div id="create-btn">
        <span>Create Playlist</span>
               <FontAwesomeIcon 
               id='plus-icon'
               onClick={()=>{
                setIsPlaylist(true)
               }}
               icon={faPlus} />
        </div>
       {isPlaylist&&
        <form id='create-playlist-bar'>
          <label htmlFor="playlist">Playlist Name</label>
          <input
            id="playlist"
            value={playList}
            onChange={(e) => setPlayList(e.target.value)}
          />
          <div>
          <button id="cancel-btn" onClick={cancelPlayList}>
            Cancel
          </button>
          <button id="save-btn" onClick={addPlaylist}>
            Save
          </button>
          </div>
        </form>}
      </section>

      <section className="playLists">
        <ul>
          {playListArray.map((playlist) => (
            <li key={playlist.id}>
              <Link style={styledLinkElement} to={`${playlist.id}`}>{playlist.playlistName}</Link>
              <Link style={styledLinkElement}  to='addsongs'>
                <FontAwesomeIcon icon={faPlus} />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Playlist;
