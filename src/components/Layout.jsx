import React, { useEffect, useState ,useContext,useRef, useCallback} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faEllipsisV, faPlay, faShuffle, faForward, faBars, faVolumeLow, faPause, faVolumeHigh, faChevronLeft, faHeart } from '@fortawesome/free-solid-svg-icons';  
import '../App.css';
import { Link} from 'react-router-dom';
import dataContext from '../context/dataContext';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';



const Layout = () => {
  const infoRef=useRef(null)
  const favouriteRef=useRef(null) 
  const [option,setOption]=useState(false)


 
  

  const {
    formatTime,
    audios,
    styledLinkElement,
    num, 
    images,
    isPlaying,
    audioRef,
    handleNextSong,
    handlePlayPause,
    handlePrevSong,
    handleProgressInput,
    handleVolumeChange,
    imageRef,
    toggleShuffle,currentTime,maxDuration,progressRef}=useContext(dataContext)
    
    const [favourites, setFavourites] = useState([]);
  

    
  // Load favourites from localStorage when the component mounts
  useEffect(() => {
    const existingFavourites = localStorage.getItem('favourites');
    if (existingFavourites) {
      setFavourites(JSON.parse(existingFavourites));
    }
  }, []);
  
  

   
  

useEffect(() => {
  const toggleOption = () => {
    setOption((prevOption) => {
      const newOption = !prevOption; // Toggle the value
      if (newOption) {
        favouriteRef.current?.classList.remove('hidden');
        favouriteRef.current?.classList.add('show');
      } else {
        favouriteRef.current?.classList.remove('show');
        favouriteRef.current?.classList.add('hidden');
      }
      return newOption;
    });
  };

  const addToFavourites = () => {
    const existingFavourites = localStorage.getItem('favourites');
    const savedFavourites = existingFavourites ? JSON.parse(existingFavourites) : [];
  
    // Check if the audio file's src is already in favourites by comparing the 'song' property
    const isAlreadyFavourite = savedFavourites.some(fav => fav.song === audios[num].src);
  
    if (!isAlreadyFavourite) {
      // Add the new favourite as an object with 'id' and 'song'
      savedFavourites.push({ id: num, song: audios[num].src });
  
      // Save the updated favourites back to localStorage
      localStorage.setItem('favourites', JSON.stringify(savedFavourites));
    }else{
       const indexOfSong= savedFavourites.findIndex(fav=>fav.id==audios[num].src)
       savedFavourites.splice(indexOfSong,1)
       localStorage.setItem('favourites', JSON.stringify(savedFavourites));
    }
    toggleOption()
  };

  infoRef.current?.addEventListener("click", toggleOption);
  favouriteRef.current?.addEventListener("click",addToFavourites)
  return ()=>{
  infoRef.current?.removeEventListener("click", toggleOption);
  favouriteRef.current?.removeEventListener("click",addToFavourites)
  }
},[num,audios]);


 


// Check if a song is already marked as favourite
const isFavouriteOrNot = (index) => {
  return favourites.some(fav => fav.song === audios[index].src) ? (
    <>
      <span>Remove from Favourites</span>
      <FontAwesomeIcon icon={faHeartSolid} style={{ color: "#f31212" }} />
    </>
  ) : (
    <>
      <span>Add To Favourites</span>
      <FontAwesomeIcon icon={faHeartSolid} style={{ color: "#f31212" }} />
    </>
  );
};

const handleBack=()=>{
  if(window.close){
    window.close()
  }else{
    window.location.href='about:blank'
  }
  
}
 const formatSeconds=(time)=>{
  const [minutes,seconds]=time.split(":").map(Number)
  return (minutes*seconds)+seconds
 }
 
  return (
    <>
      <div className="Player-container">
        <div className="header-container">
          <button id="back" className="action-btn header-btn" onClick={()=>handleBack()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <h1 className="heading">Music Player</h1>
          <button id="list" className="action-btn header-btn">
            <Link to='/menulist' style={{color:"white", textDecoration:"none"}} >
              <FontAwesomeIcon icon={faBars} />
            </Link>
          </button>
         
        </div>

        <div className="img-container">
          <img ref={imageRef} />
        </div>
        <div className='options'>
        <div className="control">
          <button className="shuffle-btn action-btn" onClick={toggleShuffle}>
            <FontAwesomeIcon icon={faShuffle} />
          </button>
          <button className="info-btn action-btn" ref={infoRef}>
           <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </div>
        <div className="option-container">
        <button className="favourite-btn " ref={favouriteRef}>
                {isFavouriteOrNot(num)}
        </button>
       </div>
       </div>
        <div className="progress-container">
          <section>
          <span className="current-time">{currentTime}</span>
          <span className="max-duration">{maxDuration}</span>
          </section>
          <div id='progress-bar'>
          <input
            type="range"
            id="progress"
            ref={progressRef}
            min="0"
            step="0.1"
            value={formatSeconds(currentTime)}
            max={formatSeconds(maxDuration)}
            onInput={(e)=>handleProgressInput(e)}
          />
          </div>
        </div>

        <div className="music-info">
          <p>{`audio${num + 1}.mp3`}</p>
        </div>

        <div className="control-container">
          <button className="volumelow action-btn" onClick={() => handleVolumeChange(-0.1)}>
            <FontAwesomeIcon icon={faVolumeLow} />
          </button>
          <button className="prev action-btn" onClick={()=>handlePrevSong()}>
            <FontAwesomeIcon icon={faBackward} />
          </button>
          <section className="play-pause action-btn">
            <button onClick={()=>handlePlayPause()}>
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
          </section>
          <button className="next action-btn" onClick={()=>handleNextSong()}>
            <FontAwesomeIcon icon={faForward} />
          </button>
          <button className="volumehigh action-btn" onClick={() => handleVolumeChange(0.1)}>
            <FontAwesomeIcon icon={faVolumeHigh} />
          </button>
        </div>
      </div>
      
    </>
  );
};

export default React.memo(Layout);
